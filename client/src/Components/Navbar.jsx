import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import "./Navbar.css";

const Navbar = ({setUser}) => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear();
    setUser(null);
    navigate("/");
  }

  return (
    <nav>
        <NavLink to="/">
          <h2>Scien-T</h2>
        </NavLink>

        {localStorage.token && <div className="user">
          <p className="welcome">Welcome, {localStorage.getItem("username")}!</p>
          <a className="sample" onClick={() => {logout()}}>Logout</a>
          
        </div>

        }

        {!localStorage.token && 
        <ul>
            <li><NavLink to="/register">Register</NavLink></li>
            <li><NavLink to="/login">Login</NavLink></li>
        </ul>}
    </nav>
  )
}

export default Navbar