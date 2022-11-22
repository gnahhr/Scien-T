import React from 'react';
import './BattleDefeat.css';

const BattleDefeat = ({info, setPhase}) => {

  const onClickHandler = (phase) => {
    setPhase(phase);
  }

  return (
    <div className="defeat-window">
      <div className="defeat">
        <h2 className="header">Defeat!</h2>
        <div className="info">
          <h3>{`${info.symbol}'s ${info.topic} is:`}</h3>
          <div className="answer">{info.answer}</div>
        </div>
        <h3>Would you like to try again?</h3>
        <div className="button-wrapper">
          <button onClick={() => onClickHandler(0)}>Main Menu</button>
          <button className="try-again" onClick={() => onClickHandler(2)}>Try Again</button>
        </div>
      </div>
    </div>
  )
}

export default BattleDefeat