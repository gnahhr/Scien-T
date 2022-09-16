import React from 'react';
import Mound from '../../Assets/Images/Mound.svg';
import Flasks from '../../Assets/Images/Flasks.svg';
import { NavLink } from 'react-router-dom';
import './landingPage.css';


const landingPage = () => {
  return (
    <div>
      <h1>WELCOME TO SCIEN-T</h1>
      <NavLink to="/mix">Mixing Table</NavLink> <br />
      <NavLink to="/intelliment">Intelliment</NavLink><br />
      <NavLink to="/electronConfiguration">Electron Config</NavLink><br />
      {/* <button>PLAY NOW</button> */}
      <img src={Mound} alt="Mound" id="mound"/>
      <img src={Flasks} alt="Flasks" id="flasks" />
    </div>
  )
}

export default landingPage;