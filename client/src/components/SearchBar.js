import React, { useEffect, useState } from 'react';
import { getGames, getGameDetails } from '../rawgApi';
import { Link, Route, useHistory } from 'react-router-dom';
import GameDetails from './GameDetails';

function SearchBar({ search, setSearch }) {
  const [searchData, setSearchData] = useState({ searchValue: "", sortBy: "rating" });
  const [games, setGames] = useState([]);
  const history = useHistory();

  useEffect(() => {
    searchGames(searchData.searchValue, searchData.sortBy);
  }, [searchData]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setSearchData({ ...searchData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    searchGames(searchData.searchValue, searchData.sortBy);
  };

  const searchGames = async (search, sortBy) => {
    const data = await getGames(search, sortBy);
    setGames(data);
  };

  const handleGameClick = async (id) => {
    const data = await getGameDetails(id);
    history.push(`/game/${id}`, { gameDetails: data });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="search-bar">
          <input
            type="text"
            value={searchData.searchValue}
            name="searchValue"
            onChange={handleChange}
            placeholder="Search games"
          />
          <select name="sortBy" value={searchData.sortBy} onChange={handleChange}>
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
      <div className="game-list">
        {games.map((game) => (
          <div key={game.id}>
            <h2>
              <Link to={`/game/${game.id}`} onClick={() => handleGameClick(game.id)}>
                {game.name}
              </Link>
            </h2>
            <p>Rating: {game.rating}</p>
            <p>Release Date: {game.released}</p>
            <p>Metacritic Score: {game.metacritic}</p>
          </div>
        ))}
      </div>
      <Route path="/game/:id" component={GameDetails} />
    </div>
  );
}

export default SearchBar;
