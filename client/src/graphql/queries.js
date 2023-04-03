import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query GetGames($search: String, $sort: String) {
    games(search: $search, sort: $sort) {
      id
      name
      background_image
      rating
    }
  }
`;

export const GET_GAME_DETAILS = gql`
  query GetGameDetails($id: ID!) {
    game(id: $id) {
      id
      name
      background_image
      rating
      released
      website
      description
      genres {
        id
        name
      }
      platforms {
        id
        name
      }
      developers {
        id
        name
      }
      publishers {
        id
        name
      }
      user_reviews_info {
        user {
          id
        }
      }
    }
  }
`;

export const GET_REVIEWS = gql`
  query GetReviews($gameId: ID!) {
    reviews(gameId: $gameId) {
      id
      title
      text
      score
      user {
        id
        username
      }
      comments {
        id
        text
        user {
          id
          username
        }
      }
    }
  }
`;


export const GET_GAME_SCREENSHOT = gql`
  query GetGameScreenshot($id: ID!) {
    game(id: $id) {
      id
      name
      screenshots {
        results {
          id
          image
        }
      }
    }
  }
`;

export const GET_USER_REVIEWS = gql`
  query GetUserReviews($userId: ID!) {
    userReviews(userId: $userId) {
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