import React from 'react';
import './App.css';
import Navbar from './components/Navbar';
import {home } from "./pages/home";
import { login } from "./pages/login";
import { signup } from "./pages/signup";

function App() {
  return (
    <React.Fragment>
      <Navbar/>
    </React.Fragment>
  );
}

export default App;
