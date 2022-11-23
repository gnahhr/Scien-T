import React, { useState, useRef } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

//Logos
import Logo from '../Assets/Images/logo.png';
import User from '../Assets/Images/user.png';
import Bullet from '../Assets/Images/bullet.svg';
import Rank from '../Assets/Images/rank.svg';
import UserW from '../Assets/Images/user.svg'
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
import Close from '../Assets/Images/close.svg';
import Hamburger from '../Assets/Images/hamburger.svg'
import Shop from '../Assets/Images/shop.svg';
import MixDash from '../Assets/Images/mix-dash.svg';
import TestBattle from '../Assets/Images/test-battle.svg';
import Assessment from '../Assets/Images/assessment.svg';

//Design
import "./SideNav.css";

const SideNav = ({children}) => {
  const nav = useNavigate();
  const [ navOpen, setNavOpen ] = useState(false);

  const toggleNav = (status) => setNavOpen(!status);

  const logOut = () => {
    localStorage.clear();
    nav("/");
    window.location.reload();
  }

  const closeNav = () => {
    if (navOpen) {
      setNavOpen(false);
    }
  }
  
  return (
    <>
    <div className={navOpen ? "sideNav" : "sideNav collapsed-nav"}>
      <img src={Arrow} alt="arrow" id="side-nav-arrow" onClick={() => toggleNav(navOpen)}/>
      <img src={Close} alt="close" id="side-nav-close" onClick={() => toggleNav(navOpen)}/>
      <img src={Logo} alt="logo" className="side-nav-logo"/>
      <div className="user">
        <img src={User} alt="pfp"/>
        <NavLink to="/profile" onClick={closeNav}>
          <p className="username">{localStorage.getItem("username")}</p>
        </NavLink>
        <div className="cta" onClick={() => logOut()}>Log out</div>
      </div>
      <div className="category">
        <div className="category-header">
          <NavLink to="/" title="Home" onClick={closeNav}><img src={Home} alt="home" /><div className="l-name">Home</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header" title="Learn">
          <img src={Learn} alt="learn" />
          <h3>Learn</h3>
        </div>
        <div className="category-links">
            <NavLink to="/periodicTable" title="Periodic Table" onClick={closeNav}><img src={PerIcon} alt="-"/><div className="l-name">Periodic Table</div></NavLink>
            <NavLink to="/trivias/hydrogen" title="Trivias" onClick={closeNav}><img src={Trivia} alt="-"/><div className="l-name">Trivias</div></NavLink>
            <NavLink to="/mix" title="Mixing Table" onClick={closeNav}><img src={Mix} alt="-"/><div className="l-name">Mixing Table</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header" title="Games">
          <img src={Game} alt="game"/>
          <h3>Game</h3>
        </div>
        <div className="category-links">
            <NavLink to="/electronConfiguration" title="Electron Configuration" onClick={closeNav}><img src={Bullet} alt="-"/><div className="l-name">Electron Config</div></NavLink>
            <NavLink to="/testBattle" title="Test Battle" onClick={closeNav}><img src={TestBattle} alt="-"/><div className="l-name">Test Battle</div></NavLink>
            <NavLink to="/mixDash" title="Mix Dash" onClick={closeNav}><img src={MixDash} alt="-"/><div className="l-name">Mix Dash</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
          <NavLink to="/intelliment" title="Assessment" onClick={closeNav}><img src={Assessment} alt="assessment" /><div className="l-name">Assessment</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
          <NavLink to="/shop" title="Shop" onClick={closeNav}><img src={Shop} alt="shop" /><div className="l-name">Shop</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
          <NavLink to="/progress" title="User Progress" onClick={closeNav}><img src={Progress} alt="progress" /><div className="l-name">User Progress</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
         <NavLink to="/leaderboard" title="Leaderboards"onClick={closeNav}><img src={Rank} alt="rank" /><div className="l-name">Leaderboard</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
          <NavLink to="/profile" title="Profile" onClick={closeNav}><img src={UserW} alt="settings" /><div className="l-name">Profile</div></NavLink>
        </div>
      </div>
      <div className="category">
        <div className="category-header">
          <NavLink to="/about" title="About Us"onClick={closeNav}><img src={Info} alt="info" /><div className="l-name">About Us</div></NavLink>
        </div>
      </div>

      <div className="footer">
        {navOpen ? <p>All Rights Reserved &copy;2022</p> : <p>&copy;2022</p>}
      </div>
    </div>

    <main>
      <img src={Hamburger} alt="hamburger" id="nav-menu" onClick={() => toggleNav(navOpen)}/>
      {children}
    </main>
    </>
  )
}

export default SideNav