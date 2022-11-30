import React from 'react';

//Images
import Logo from '../../Assets/Images/logo.png';

//Data
import Members from '../../Data/Members.js';

//Designs
import './aboutUs.css';

const aboutUs = () => {
  const members = Members;
  return (
    <>
      <div className="main-header">
        <h1>
          About Us
        </h1>
      </div>
      <div className="about-wrapper">
        <img src={Logo} alt="logo" id="logo-about"/>
        <p className="short-desc">
          Scien-T is web-based gamified learning system to help students be motivated and pique their interest in chemistry. It is a website to learn and play while tracking your progress or collecting cosmetics just for fun. Learn through Trivias, Mixing Table, and an interactive Periodic Table or play and learn with games like Mix Dash, Test Battle and Electron Configuration. You get to choose on how to learn!
        </p>
        <h2>Members</h2>
        <div className="members-wrapper">
          {members && members.map((member) => 
            <div className="member">
              <img src={`/images/About/${member.img}`} alt={member.name} className="picture" />
              <p className="name">{member.name}</p>
              <p className="role">{member.role}</p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

export default aboutUs