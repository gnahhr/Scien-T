import React from 'react';
import './aboutUs.css';
import Logo from '../../Assets/Images/logo.png';

const aboutUs = () => {

  const members = [
    {
      img: {},
      name: "Patrick Jan Capati",
      role: "Data Researcher"
    },
    {
      img: {},
      name: "Michenne Cortez",
      role: "UI/UX Designer"
    },
    {
      img: {},
      name: "Matt Gabriel Domingo",
      role: "Front-end Developer"
    },
    {
      img: {},
      name: "Kimberly Joy Magat",
      role: "Data Researcher"
    },
    {
      img: {},
      name: "Ram Keazar Medina",
      role: "Documentation"
    },
    {
      img: {},
      name: "Joshua Kyule Ocampo",
      role: "Back-end Developer"
    },
    {
      img: {},
      name: "Jerico Carlo Pangilinan",
      role: "Data Researcher"
    },
    {
      img: {},
      name: "Louis Andrei Suba",
      role: "Documentation"
    }
  ]

  return (
    <main>
      <div className="main-header">
        <h1>
          About Us
        </h1>
      </div>
      <div className="about-wrapper">
        <img src={Logo} alt="logo" id="logo-about"/>
        <p className="short-desc">
          Scien-T is web-based Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum error laboriosam eum cumque corporis, maxime iure, quisquam, tenetur sunt suscipit facilis commodi. Ea voluptatem fugit ad excepturi amet doloribus veniam?
        </p>
        <div className="members-wrapper">
          {members && members.map((member) => 
            <div className="member">
              <div className="picture"></div>
              <p className="name">{member.name}</p>
              <p className="role">{member.role}</p>
            </div>
          )}
        </div>
      </div>
    </main>
  )
}

export default aboutUs