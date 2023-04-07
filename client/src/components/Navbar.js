import React, { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../Styles/main.css";
import AuthService from "../utils/auth";

function Navbar() {
  const navRef = useRef();

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  const isLoggedIn = AuthService.loggedIn();

  return (
    <header>
      <h1>Gamers Realm</h1>
      <nav ref={navRef}>
        <Link to={"/"}>
          Home
        </Link>
        {!isLoggedIn && (
          <>
            <Link to={"/register"}>
              Signup
            </Link>
            <Link to={"/login"}>
              Login
            </Link>
          </>
        )}
        {isLoggedIn && (
          <Link to={"/"} onClick={() => AuthService.logout()}>
            Logout
          </Link>
        )}
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn nav-close-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;