import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_GAMES } from './graphql/queries';
import GameList from './components/GameList';
import SearchBar from './components/SearchBar';
import './styles/index.css';

function App() {
  const [search, setSearch] = useState('');

  const { loading, error, data } = useQuery(GET_GAMES, {
    variables: { search },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return (
    <div className="container">
      <h1>Game Reviews</h1>
      <SearchBar search={search} setSearch={setSearch} />
      <GameList games={data.games} />
    </div>
  );
}

export default App;
