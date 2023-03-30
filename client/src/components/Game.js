import React from 'react';

function Game({ game }) {
  return (
    <div className="game">
      <h2>{game.name}</h2>
      <img src={game.background_image} alt={game.name} />
      <p>{game.released}</p>
      <p>Rating: {game.rating}</p>
      <p>Metacritic Score: {game.metacritic || 'N/A'}</p>
      <a href={game.website}>Visit Website</a>
    </div>
  );
}

export default Game;