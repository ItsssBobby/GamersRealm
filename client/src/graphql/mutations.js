import { gql } from '@apollo/client';

export const ADD_REVIEW = gql`
  mutation AddReview($title: String!, $body: String!, $rating: Int!, $gameId: ID!) {
    addReview(title: $title, body: $body, rating: $rating, gameId: $gameId) {
      id
      title
      body
      rating
      game {
        id
        name
      }
    }
  }
`;

export const ADD_COMMENT = gql`
  mutation AddComment($body: String!, $reviewId: ID!) {
    addComment(body: $body, reviewId: $reviewId) {
      id
      body
      review {
        id
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!, $password: String!) {
    addUser(name: $name, email: $email, password: $password) {
      token
      user {
        name
        email
      }
    }
  }
`;