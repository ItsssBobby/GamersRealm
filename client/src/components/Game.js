import React from "react";
import { Link } from "react-router-dom";

function Game({ game }) {
  return (
    <div className="game">
      <Link to={`/game/${game.id}`}>
        <h2>{game.name}</h2>
      </Link>
      <img src={game.background_image} alt={game.name} width={300} height="auto" />
      <p>{game.released}</p>
      <p>Rating: {game.rating}</p>
      <p>Release Date: {game.released}</p>
      <p>Metacritic Score: {game.metacritic || "N/A"}</p>
    </div>
  );
}

export default <Game />;
