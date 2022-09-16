import React from 'react';
import { NavLink } from 'react-router-dom';
import "./SideNav.css";

const SideNav = () => {
  return (
    <div className="sideNav">
      <div className="category">
        <div className="category-header">
          <div className="p">🧢</div>
          <h2>Learn</h2>
        </div>
        <ul>
          <li><NavLink to="/mix">Mixing Table</NavLink></li>
          <li><NavLink to="/intelliment">Intelliment</NavLink></li>
          <li><NavLink to="/electronConfiguration">Electron Config</NavLink></li>
        </ul>
      </div>
    </div>
  )
}

export default SideNav