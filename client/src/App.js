import React, { useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { useQuery } from '@apollo/client';
// import { GET_GAMES } from './graphql/queries';
// import GameList from './components/GameList';
import SearchBar from './components/SearchBar';
// import './styles/index.css';
import Navbar from './components/Navbar';
import { Login } from './login';
import { Register} from './register';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/" component={SearchBar} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        {/* <Route component={NotFound} /> */}
      </Switch>
    </BrowserRouter>
  );
}

export default App;
