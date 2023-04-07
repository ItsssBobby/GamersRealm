import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query GetGames($search: String!, $sort: String!) {
    games(search: $search, sort: $sort) {
      id
      name
      background_image
      rating
      released
    }
  }
`;

export const GET_GAME_DETAILS = gql`
query Game($gameId: ID!) {
  game(id: $gameId) {
    id
    name
    released
    background_image
    rating
    website
    description
    userReviews {
      _id
      title
    }
    platforms {
      platform {
        id
        name
      }
    }
    publishers {
      id
      name
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
        name
      }
      comments {
        id
        text
        user {
          id
          name
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
  query getUserReviews($userId: ID!) {
    userReviews(userId: $userId) {
      _id
      title
      body
      rating
      createdAt
      game {
        _id
        name
        background_image
        released
        rating
        website
        description
        platforms {
          platform {
            name
          }
        }
        publishers {
          name
        }
      }
      comments {
        _id
        body
        createdAt
        user {
          name
        }
      }
      user {
        name
      }
    }
  }
`;