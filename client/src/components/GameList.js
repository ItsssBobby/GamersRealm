import React from 'react';
import Game from './Game';

function GameList({ games }) {
  return (
    <div className="game-list">
      {games.map((game) => (
        <Game key={game.id} game={game} />
      ))}
    </div>
  );
}

export default GameList;