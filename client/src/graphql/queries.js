import { gql } from '@apollo/client';

export const GET_GAMES = gql`
  query GetGames($search: String, $sort: String) {
    games(search: $search, sort: $sort) {
      id
      name
      backgroundImage
      rating
    }
  }
`;

export const GET_GAME_DETAILS = gql`
  query GetGameDetails($id: ID!) {
    game(id: $id) {
      id
      name
      backgroundImage
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
    }
  }
`;

export const GET_REVIEWS = gql`
  query GetReviews($gameId: ID!) {
    reviews(gameId: $gameId) {
      id
      title
      body
      rating
      author {
        id
        username
      }
      comments {
        id
        body
        author {
          id
          username
        }
      }
    }
  }
`;