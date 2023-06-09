const { GraphQLScalarType } = require("graphql");
const { Kind } = require("graphql/language");
const bcrypt = require("bcrypt");
const { signToken } = require('../utils/auth');
const { User, Review, Comment } = require("../models");
const axios = require("axios");
require("dotenv").config();

const RAWG_API_BASE_URL = "https://api.rawg.io/api";

const resolvers = {
  Query: {
    async games(_, { search, sort }) {
      const response = await axios.get(
        `${RAWG_API_BASE_URL}/games?search="${search}"&ordering=-${sort}&key=${process.env.RAWG_API_KEY}`
      );
      return response.data.results;
    },

    async game(_, { id }) {
      const response = await axios.get(
        `${RAWG_API_BASE_URL}/games/${id}?key=${process.env.RAWG_API_KEY}`
      );

      const userReviews = await Review.find({gameId: id})
      return {
        ...response.data,
        userReviews
      }
    },

    async userReviews(_, { userId }) {
      const response = await axios.get(
        `${RAWG_API_BASE_URL}/users/${userId}/reviews?key=${process.env.RAWG_API_KEY}`
      );
      return response.data.results;
    },

    async reviews() {
      return Review.find();
    },

    async review(_, { id }) {
      return Review.findById(id);
    },

    async rawgApi(_, { game }) {
      const response = await axios.get(
        `${RAWG_API_BASE_URL}/games?search=${game}&key=${process.env.RAWG_API_KEY}`
      );
      return { results: response.data.results, count: response.data.count };
    },
  },

  Mutation: {
    async addReview(_, { title, body, rating, gameId }, { currentUser }) {
      if (!currentUser) {
        throw new Error("Unauthorized");
      }

      const review = await Review.create({
        title,
        body,
        rating,
        user: currentUser._id,
        gameId: gameId,
      });

      await User.findByIdAndUpdate(currentUser._id, {
        $addToSet: { reviews: review._id },
      });

      return review.populate("user").execPopulate();
    },

    async addComment(_, { body, reviewId }, { currentUser }) {
      if (!currentUser) {
        throw new Error("Unauthorized");
      }

      const comment = await Comment.create({
        body,
        user: currentUser._id,
        review: reviewId,
      });

      await Review.findByIdAndUpdate(reviewId, {
        $addToSet: { comments: comment._id },
      });

      return comment.populate("user").populate("review").execPopulate();
    },

    async addUser(_, { name, email, password }) {
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        throw new Error("User already exists");
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await User.create({
        name,
        email,
        password: hashedPassword,
      });

      const token = signToken({ userId: user._id });

      return { user, token };
    },

    async login(_, { email, password }) {
      const user = await User.findOne({ email });
      if (!user) {
        throw new Error("Invalid credentials");
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      if (!isValidPassword) {
        throw new Error("Invalid credentials");
      }

      const token = signToken({ userId: user._id });

      return { user, token };
    },
  },

  Game: {
    reviews(game) {
      return Review.find({ gameId: game._id })
        .populate("user")
        .populate("comments");
    },
  },

  Review: {
    user(review) {
      return User.findById(review.user);
    },

    game(review) {
      return Game.findById(review.game);
    },

    comments(review) {
      return Comment.find({ review: review._id }).populate("user");
    },

    createdAt(review) {
      return review.createdAt.getTime();
    },

    updatedAt(review) {
      return review.updatedAt.getTime();
    },
  },

  Comment: {
    user(comment) {
      return User.findById(comment.user);
    },

    review(comment) {
      return Review.findById(comment.review);
    },

    createdAt(comment) {
      return comment.createdAt.getTime();
    },

    updatedAt(comment) {
      return comment.updatedAt.getTime();
    },
  },

  User: {
    reviews(user) {
      return Review.find({ user: user._id });
    },

    createdAt(user) {
      return user.createdAt.getTime();
    },

    updatedAt(user) {
      return user.updatedAt.getTime();
    },
  },

  Date: new GraphQLScalarType({
    name: "Date",
    description: "Date custom scalar type",
    serialize(value) {
      return value.getTime();
    },
    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(parseInt(ast.value, 10));
      }
      return null;
    },
  }),

  GameResult: {
    id(game) {
      return game.id.toString();
    },
  },

  ApiResult: {
    count(result) {
      return result.count;
    },

    results(result) {
      return result.results;
    },
  },
};

module.exports = resolvers;
