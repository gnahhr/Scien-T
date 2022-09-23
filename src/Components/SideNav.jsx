import React from 'react';
import Logo from '../Assets/Images/logo.png';
import User from '../Assets/Images/user.png';
import { NavLink } from 'react-router-dom';
import Arrow from '../Assets/Images/arrow.svg';
import Bullet from '../Assets/Images/bullet.svg';
import Rank from '../Assets/Images/rank.svg';
import Gear from '../Assets/Images/gear.svg';
import Info from '../Assets/Images/info.svg';
import "./SideNav.css";

const SideNav = () => {
  return (
    <div className="sideNav">
      <img src={Logo} alt="logo" className="side-nav-logo" />
      <div className="user">
        <img src={User} alt="pfp" />
        <p className="username">Son Chaeyoung</p>
      </div>
      <div className="category">
        <div className="category-header">
          <img src={Arrow} alt="arrow" />
          <h3>Learn</h3>
        </div>
        <div className="category-links">
        <ul>
            <li><img src={Bullet} alt="-"/><NavLink to="/periodicTable">Periodic Table</NavLink></li>
        </ul>
        </div>
      </div>
      <div className="category cat-active">
        <div className="category-header">
          <img src={Arrow} alt="arrow" />
          <h3>Game</h3>
        </div>
        <div className="category-links">
        <ul>
            <li><img src={Bullet} alt="-"/><NavLink to="/mix">Mixing Table</NavLink></li>
            <li><img src={Bullet} alt="-"/><NavLink to="/intelliment">Intelliment</NavLink></li>
            <li><img src={Bullet} alt="-"/><NavLink to="/electronConfiguration">Electron Config</NavLink></li>
        </ul>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
        <img src={Rank} alt="rank" />
          <h3><NavLink to="/leaderboard">Leaderboard</NavLink></h3>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
        <img src={Gear} alt="settings" />
          <h3><NavLink to="/settings">Settings</NavLink></h3>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
        <img src={Info} alt="info" />
          <h3><NavLink to="/about">About Us</NavLink></h3>
        </div>
      </div>

      <div className="footer">
        <p>All Rights Reserved &copy;2022</p>
      </div>
    </div>
  )
}

export default SideNav