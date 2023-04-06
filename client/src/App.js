import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloProvider,
  ApolloClient,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import GameList from "./components/GameList";
import Homescreen from "./components/Homescreen";
import "./index.css";
import GameDetails from "./components/GameDetails";

// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

const httpLink = createHttpLink({
  uri: "/graphql",
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem("id_token");
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");

  return (
    <ApolloProvider client={client}>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={Homescreen} />
          <Route path="/register" element={Register} />
          <Route path="/login" element={Login} />
          <Route path="/game/:id" element={GameDetails} />
          {/* <Route component={NotFound} /> */}
        </Routes>
      </Router>
    </ApolloProvider>
  );
}

export default App;
