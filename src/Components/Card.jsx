import React from 'react';
import './Card.css';

const Card = ({picture, name, description, btnType}) => {
  return (
    <div className="game">
        <img src={picture} alt="game" />
        <h2 className="game-name">{name}</h2>
        <p>{description}</p>
        <button className={btnType}>PLAY NOW!</button>
    </div>
  )
}

export default Card