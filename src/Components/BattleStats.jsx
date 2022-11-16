import React from 'react';
import BlueFlask from '../Assets/Images/blue-flask.png';

import './TotalScore.css';

const BattleStats = ({battleInfo, setPhase, stage, setStage, prizeCoins}) => {
  const chooseLevel = (choice) => {
    setPhase(choice);
  }

  const nextLevel = () => {
    setStage(stage+1);
    setPhase(2);
  }

  return (
      <div className="total-score">
          <div className="img-wrapper">
            <img src={BlueFlask} alt="flask" id="bflask-1"/>
            <img src={BlueFlask} alt="flask" id="bflask-2"/>
          </div>
          <div className="wrapper">
              <h2>Great Work!</h2>
              <div className="data-wrapper">
                  <p className="left-data">Total Enemies Defeated:</p> <p className="right-data">{battleInfo.totalEnemies}</p>
                  <p className="left-data">Total Score:</p> <p className="right-data">{battleInfo.score}</p>
                  <p className="left-data">Highest Multiplier:</p> <p className="right-data">{battleInfo.highMulti}</p>
                  <p className="left-data">Prize Coins:</p> <p className="right-data">{prizeCoins}</p>
              </div>
          </div>
          <div className="button-wrapper">
              <button onClick={() => chooseLevel(2)}>Play Again</button>
              {9 > stage+1 && <button onClick={() => nextLevel()}>Next Stage</button>}
              <button onClick={() => chooseLevel(1)}>Choose Stage</button>
              <button onClick={() => chooseLevel(0)}>Choose Topic</button>
          </div>
      </div>
  )
}

export default BattleStats