import React from 'react';

function Game({ game }) {
  return (
    <div className="game">
      <h2>{game.name}</h2>
      <p>{game.released}</p>
      <p>{game.rating} / 5</p>
      {game.genres && (
        <ul>
          {game.genres.map((genre) => (
            <li key={genre.id}>{genre.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Game;