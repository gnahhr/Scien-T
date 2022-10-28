import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlueFlask from '../Assets/Images/blue-flask.png';

const BattleStats = ({totalEnemies, totalScore, highMulti, nextPhase, battleResult}) => {
  const nav = useNavigate();
  return (
    <div className="total-score">
        <div className="img-wrapper">
          <img src={BlueFlask} alt="flask" id="bflask-1"/>
          <img src={BlueFlask} alt="flask" id="bflask-2"/>
        </div>
        <div className="wrapper">
            <h2>Great Work!</h2>
            <div className="data-wrapper">
                <p className="left-data">Total Enemies Defeated:</p> <p className="right-data">{totalEnemies}</p>
                <p className="left-data">Total Score:</p> <p className="right-data">{totalScore}</p>
                <p className="left-data">Highest Multiplier:</p> <p className="right-data">{highMulti}</p>
            </div>
        </div>
        <div className="button-wrapper">
              <button onClick={() => nav("/intelliment")}>Play Again</button>
              <button onClick={() => nav("/intelliment")}>Play Next Stage</button>
        </div>
    </div>
  )
}

export default BattleStats