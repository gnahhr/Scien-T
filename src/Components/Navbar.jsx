import React from 'react';
import { NavLink } from 'react-router-dom';
import "./Navbar.css";

const Navbar = () => {
  return (
    <nav>
        <NavLink to="/">
          <h2>Scien-T</h2>
        </NavLink>
        <ul>
            <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
        </ul>
    </nav>
  )
}

export default Navbar