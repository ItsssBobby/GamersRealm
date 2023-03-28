import { useRef } from 'react'
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/main.css";

function Navbar () {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");
    }

    return (
        <header>
            <h1>Gamers Realm</h1>
            <nav ref={navRef}>
                <a href = '/#'>Home</a>
                <a href = '/#'>Signup</a>
                <a href = '/#'>Login</a>
                <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                    <FaTimes />
                </button>
            </nav>
            <button className='nav-btn nav-close-btn' onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    )
}

export default Navbar;