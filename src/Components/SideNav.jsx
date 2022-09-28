import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';

//Logos
import Logo from '../Assets/Images/logo.png';
import User from '../Assets/Images/user.png';
import Arrow from '../Assets/Images/arrow.svg';
import Bullet from '../Assets/Images/bullet.svg';
import Rank from '../Assets/Images/rank.svg';
import Gear from '../Assets/Images/gear.svg';
import Info from '../Assets/Images/info.svg';
import Progress from '../Assets/Images/progress.svg';
import Game from '../Assets/Images/game.svg';
import Learn from '../Assets/Images/learn.svg';
import Home from '../Assets/Images/home.svg';

//Design
import "./SideNav.css";

const SideNav = () => {
  const [ navOpen, setNavOpen ] = useState(true);
  
  return (
    <div className={navOpen ? "sideNav" : "sideNav collapsed-nav"}
         style={{width: navOpen ? "15vw" : "5vw"}}>
      <img src={Logo} alt="logo" className="side-nav-logo"/>
      <div className="user">
        <img src={User} alt="pfp"/>
        <NavLink to="/profile">
          <p className="username">{localStorage.getItem("username")}</p>
        </NavLink>
      </div>
      <div className="category">
        <div className="category-header">
          <NavLink to="/"><img src={Home} alt="home" /><div className="l-name">Home</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
          <img src={Learn} alt="learn" />
          <h3>Learn</h3>
        </div>
        <div className="category-links">
            <NavLink to="/periodicTable"><img src={Bullet} alt="-"/><div className="l-name">Periodic Table</div></NavLink>
            <NavLink to="/trivias"><img src={Bullet} alt="-"/><div className="l-name">Trivias</div></NavLink>
            <NavLink to="/intellimentCategory"><img src={Bullet} alt="-"/><div className="l-name">Intelliment</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
          <img src={Game} alt="game" />
          <h3>Game</h3>
        </div>
        <div className="category-links">
            <NavLink to="/mix"><img src={Bullet} alt="-"/><div className="l-name">Mixing Table</div></NavLink>
            <NavLink to="/intelliment"><img src={Bullet} alt="-"/><div className="l-name">Intelliment</div></NavLink>
            <NavLink to="/electronConfiguration"><img src={Bullet} alt="-"/><div className="l-name">Electron Config</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
          <NavLink to="/progress"><img src={Progress} alt="progress" /><div className="l-name">User Progress</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
         <NavLink to="/leaderboard"><img src={Rank} alt="rank" /><div className="l-name">Leaderboard</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
          <NavLink to="/settings"><img src={Gear} alt="settings" /><div className="l-name">Settings</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
          <NavLink to="/about"><img src={Info} alt="info" /><div className="l-name">About Us</div></NavLink>
        </div>
      </div>

      <div className="footer">
        {navOpen ? <p>All Rights Reserved &copy;2022</p> : <p>&copy;2022</p>}
      </div>
    </div>
  )
}

export default SideNav