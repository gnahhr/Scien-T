import React from 'react';
import Mound from '../../Assets/Images/Mound.svg';
import Flasks from '../../Assets/Images/Flasks.svg';
import './landingPage.css';


const landingPage = () => {
  return (
    <div>
      <h1>WELCOME TO SCIEN-T</h1>
      <button>PLAY NOW</button>
      <img src={Mound} alt="Mound" id="mound"/>
      <img src={Flasks} alt="Flasks" id="flasks" />
    </div>
  )
}

export default landingPage;