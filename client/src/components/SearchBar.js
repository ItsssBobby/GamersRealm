import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { Link, Route } from "react-router-dom";
import GameDetails from "./GameDetails";
import { GET_GAMES, GET_GAME_DETAILS } from "../graphql/queries";

function SearchBar({ search, setSearch, sort, setSort }) {
  // const [searchData, setSearchData] = useState({
  //   searchValue: "",
  //   sortBy: "rating",
  // });
  const [games, setGames] = useState([]);
  const [searchGames, { data: gamesData }] = useLazyQuery(GET_GAMES);
  const [getGame, { data: gameData }] = useLazyQuery(GET_GAME_DETAILS);


  useEffect(() => {
    if (gamesData && gamesData.games) {
      setGames(gamesData.games);
    }
  }, [gamesData]);

  useEffect(() => {
    if (gameData && gameData.game) {
      const { id, ...gameDetails } = gameData.game;
      navigate(`/game/${id}`, { gameDetails });
    }
  }, [gameData]);

  const handleChange = (event) => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log("search:", search);
    console.log("sort:", sort);
    searchGames({
      variables: { search: search, sort: sort },
    });
  };

  const handleGameClick = (id) => {
    getGame({ variables: { id } });
  };

  // adding styling to searchbar

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="SearchBar h-10 flex justify-center bg-[#a9afb2]">
          <input
            className="bg-[#a9afb2] px-2 placeholder-black"
            type="text"
            value={search}
            name="searchValue"
            onChange={handleChange}
            placeholder="Search games"
          />
          <select
            className="sortBy bg-[#a9afb2]"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
          >
            <option value="">Search by filter</option>
            <option value="rating">Rating</option>
            <option value="released">Release Date</option>
            <option value="added">Date Added</option>
            <option value="created">Date Created</option>
            <option value="updated">Date Updated</option>
            <option value="metacritic">Metacritic Score</option>
            <option value="name">Name</option>
          </select>
          <button type="submit">Search</button>
        </div>
      </form>
      {/* add styling to pop out for games */}
      {/* <div>
        <div className="game-list">
          {games.map((game) => (
            <div key={game.id}>
              <Link to={`/game/${game.id}`}>
                <h2>{game.name}</h2>
              </Link>

              <p>Rating: {game.rating}</p>
              <p>Release Date: {game.released}</p>
              <p>Metacritic Score: {game.metacritic}</p>
            </div>
          ))}
        </div>
      </div> */}
    </div>
  );
}

export default SearchBar;
