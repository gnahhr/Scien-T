import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Card.css';

const Card = ({picture, name, description, btnType, path}) => {
  let nav = useNavigate();
  
  return (
    <div className="game">
        <img src={picture} alt="game" />
        <h2 className="game-name">{name}</h2>
        <p>{description}</p>
        <button className={btnType} onClick={() => nav(path)}>PLAY NOW!</button>
    </div>
  )
}

export default Card