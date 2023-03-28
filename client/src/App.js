import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_GAMES } from './graphql/queries';
import GameList from './components/GameList';
import SearchBar from './components/SearchBar';
import './styles/index.css';
import { Login } from './login';
import { Register} from './register';

function App() {
  const [search, setSearch] = useState('');

  cosnt [currentForm, setCurrentForm] = useState('login');

  const toggleForm =(formName)=>{
    setCurrentForm(formName);
  }

  const { loading, error, data } = useQuery(GET_GAMES, {
    variables: { search },
  });
  return(
    <div className= "App">
      {
        currentForm === "login" ? <Login onFormSwitch={toggleForm}/> : <Register onFormSwitch/>
      }
    </div>
  );

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
