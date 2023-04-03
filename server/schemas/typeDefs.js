const { gql } = require("apollo-server-express");

const typeDefs = gql`
  scalar Date

  type Query {
    games(search: String, sort: String): [GameResult]
    game(id: ID!): Game
    userReviews(userId: ID!): [Review]
    reviews: [Review]
    review(id: ID!): Review
    rawgApi(game: String!): ApiResult
  }

  type Mutation {
    addReview(title: String!, body: String!, rating: Int!, gameId: ID!): Review
    addComment(body: String!, reviewId: ID!): Comment
    signup(username: String!, email: String!, password: String!): AuthPayload
    login(email: String!, password: String!): AuthPayload
  }

  type Game {
    _id: ID!
    reviews: [Review]
  }

  type GameResult {
    id: ID!
    name: String!
    released: String!
    background_image: String
    rating: Float!
  }

  type ApiResult {
    results: [GameResult]
    count: Int!
  }

  type Review {
    _id: ID!
    title: String!
    body: String!
    rating: Int!
    user: User!
    game: Game!
    comments: [Comment]
    createdAt: Date!
    updatedAt: Date!
  }

  type Comment {
    _id: ID!
    body: String!
    user: User!
    review: Review!
    createdAt: Date!
    updatedAt: Date!
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    reviews: [Review]
    createdAt: Date!
    updatedAt: Date!
  }

  type AuthPayload {
    token: String!
    user: User!
  }
`;

module.exports = typeDefs;
