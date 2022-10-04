import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

//Logos
import Logo from '../Assets/Images/logo.png';
import User from '../Assets/Images/user.png';
import Bullet from '../Assets/Images/bullet.svg';
import Rank from '../Assets/Images/rank.svg';
import Gear from '../Assets/Images/gear.svg';
import UserW from '../Assets/Images/user-white.svg'
import Arrow from '../Assets/Images/arrow.svg';
import Info from '../Assets/Images/info.svg';
import Progress from '../Assets/Images/progress.svg';
import Game from '../Assets/Images/game.svg';
import Learn from '../Assets/Images/learn.svg';
import Home from '../Assets/Images/home.svg';
import Intell from '../Assets/Images/intell-icon.svg';
import Mix from '../Assets/Images/mix-icon.svg';
import Trivia from '../Assets/Images/trivia-icon.svg';
import PerIcon from '../Assets/Images/periodic-icon.svg';

//Design
import "./SideNav.css";

const SideNav = ({children}) => {
  const nav = useNavigate();
  const [ navOpen, setNavOpen ] = useState(true);
  const toggleNav = (status) => setNavOpen(!status);

  const logOut = () => {
    localStorage.clear();
    nav("/");
    window.location.reload();
  }
  
  return (
    <>
    <div className={navOpen ? "sideNav" : "sideNav collapsed-nav"}>
      <img src={Arrow} alt="arrow" id="side-nav-arrow" onClick={() => toggleNav(navOpen)}/>
      <img src={Logo} alt="logo" className="side-nav-logo"/>
      <div className="user">
        <img src={User} alt="pfp"/>
        <NavLink to="/profile">
          <p className="username">{localStorage.getItem("username")}</p>
        </NavLink>
        <div className="cta" onClick={() => logOut()}>Log out</div>
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
            <NavLink to="/periodicTable"><img src={PerIcon} alt="-"/><div className="l-name">Periodic Table</div></NavLink>
            <NavLink to="/trivias"><img src={Trivia} alt="-"/><div className="l-name">Trivias</div></NavLink>
            <NavLink to="/intellimentCategory"><img src={Intell} alt="-"/><div className="l-name">Intelliment</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
          <img src={Game} alt="game" />
          <h3>Game</h3>
        </div>
        <div className="category-links">
            <NavLink to="/mix"><img src={Mix} alt="-"/><div className="l-name">Mixing Table</div></NavLink>
            <NavLink to="/intelliment"><img src={Intell} alt="-"/><div className="l-name">Intelliment</div></NavLink>
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
          <NavLink to="/profile"><img src={UserW} alt="settings" /><div className="l-name">Profile</div></NavLink>
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
    <main>{children}</main>
    </>
  )
}

export default SideNav