import React from 'react';
import Mound from '../../Assets/Images/Mound.png';
import Flasks from '../../Assets/Images/Flasks.svg';
import Logo from '../../Assets/Images/logo.png';
import Honeycomb from '../../Assets/Images/honeycomb.svg';

import { useNavigate } from 'react-router-dom';
import './landingPage.css';


const landingPage = () => {
  const nav = useNavigate();

  return (
    <>
      <img src={Honeycomb} alt="honeycombs" className="honeycombs"/>
      <div className="landing-page">
        <img src={Logo} lt="logo" className="logo" />
        <h2 className="description">
        Learning the periodic table of elements in a more interactive and fun way!
        </h2>
        <div className="button-div">
          {/* <NavLink to="/login" className="button normal">Login</NavLink>
          <NavLink to="/register" className="button cta">Sign Up</NavLink> */}
          <button className="normal" onClick={()=> nav("/login")}>Login</button>
          <button className="cta" onClick={()=> nav("/register")}>Sign Up</button>
        </div>

        <div className="footer-design">
          <img src={Flasks} alt="Flasks" id="flasks" />
          <img src={Mound} alt="Mound" id="mound"/>
        </div>
      </div>
    </>
  )
}

export default landingPage;