import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache } from '@apollo/client';
import SearchBar from './components/SearchBar';
import Navbar from './components/Navbar';
import { Login } from './components/login';
import { Register} from './components/register';
import GameList from './components/GameList';
import "./index.css"

const client = new ApolloClient({
  uri: 'https://api.rawg.io/graphql',
  cache: new InMemoryCache(),
});

function App() {
  const [search, setSearch] = useState({ search: '', sortBy: 'rating' });

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <SearchBar setSearch={setSearch} />
            <GameList search={search.search} sortBy={search.sortBy} />
          </Route>
          <Route path="/register" component={Register} />
          <Route path="/login" component={Login} />
          {/* <Route component={NotFound} /> */}
        </Switch>
      </Router>
    </ApolloProvider>
  );
}


export default App;
