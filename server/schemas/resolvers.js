const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { User, Game, Review, Comment } = require('../models');

const resolvers = {
  Query: {
    async games(_, { search, sort }, { dataSources }) {
      return dataSources.rawgApi.getGames(search, sort);
    },

    async game(_, { id }, { dataSources }) {
      return dataSources.rawgApi.getGameDetails(id);
    },

    async userReviews(_, { userId }, { dataSources }) {
      return dataSources.rawgApi.getUserReviews(userId);
    },

    async reviews() {
      return Review.find().populate('game');
    },

    async review(_, { id }) {
      return Review.findById(id).populate('game');
    },
  },

  Mutation: {
    async addReview(_, { title, body, rating, gameId }, { currentUser }) {
      if (!currentUser) {
        throw new Error('Authentication required');
      }

      const review = new Review({
        title,
        body,
        rating,
        user: currentUser._id,
        game: gameId,
      });

      await review.save();

      return Review.populate(review, 'game');
    },

    async addComment(_, { body, reviewId }, { currentUser }) {
      if (!currentUser) {
        throw new Error('Authentication required');
      }

      const comment = new Comment({
        body,
        user: currentUser._id,
        review: reviewId,
      });

      await comment.save();

      return Comment.populate(comment, 'user');
    },

    async signup(_, { username, email, password }) {
      const hashedPassword = await bcrypt.hash(password, 10);

      const user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      return { token, user };
    },

    async login(_, { email, password }) {
      const user = await User.findOne({ email });

      if (!user) {
        throw new Error('Invalid email or password');
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        throw new Error('Invalid email or password');
      }

      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

      return { token, user };
    },
  },

  Review: {
    user(review) {
      return User.findById(review.user);
    },

    async comments(review) {
      const comments = await Comment.find({ review: review._id });
      return comments.map((comment) => Comment.populate(comment, 'user'));
    },
  },

  Comment: {
    user(comment) {
      return User.findById(comment.user);
    },
  },

  Game: {
    async reviews(game) {
      const reviews = await Review.find({ game: game._id });
      return reviews.map((review) => Review.populate(review, 'user'));
    },
  },

  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Custom scalar type for date',
    parseValue(value) {
      return new Date(value);
    },
    serialize(value) {
      return value.getTime();
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10);
      }
      return null;
    },
  }),
};

module.exports = resolvers;