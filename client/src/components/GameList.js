import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_GAMES } from '../graphql/queries';
import Game from './Game';

function GameList({ search, sort }) {
  const { loading, error, data } = useQuery(GET_GAMES, {
    variables: { search, sort },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const games = data?.games || [];

  return (
    <div className="game-list">
      {games.map((game) => (
        <Game key={game.id} game={game} />
      ))}
    </div>
  );
}

export default <GameList />;