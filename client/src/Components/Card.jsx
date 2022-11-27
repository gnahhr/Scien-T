import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({picture, name, description, btnType, path, type}) => {
  let nav = useNavigate();
  
  return (
    <div className="game">
        <img src={picture} alt={name} />
        <h2 className="game-name">{name}</h2>
        <p>{description}</p>
        <button className={btnType} onClick={() => nav(path)}>
          {type === "learn" ? "Learn Now!" : "Play Now!"}
        </button>
    </div>
  )
}

export default Card