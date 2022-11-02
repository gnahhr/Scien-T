import React from 'react';
import { useNavigate } from 'react-router-dom';
import BlueFlask from '../Assets/Images/blue-flask.png';
import "./TotalScore.css";

const TotalScore = ({totalQuestions, totalCorrect, totalScore, highestCombo, highestMultiplier, pickedDifficulty, playAgain}) => {
  const nav = useNavigate();
  
  const onClickHandler = () => {
    pickedDifficulty(false);
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
                <p className="left-data">Total Elements</p> <p className="right-data">{totalQuestions}</p>
                <p className="left-data">Total Questions</p> <p className="right-data">{totalQuestions * 4}</p>
                <p className="left-data">Total Correct</p> <p className="right-data">{totalCorrect}</p>
                <p className="left-data">Highest Combo</p> <p className="right-data">{highestCombo}</p>
                <p className="left-data">Highest Multiplier</p> <p className="right-data">{highestMultiplier}</p>
                <p className="left-data total-data">Total Score</p> <p className="right-data total-data">{totalScore}</p>
            </div>
        </div>
        <div className="button-wrapper">
              <button onClick={() => playAgain()}>Play Again</button>
              <button onClick={() => onClickHandler()}>Play Other Level</button>
        </div>
    </div>
  )
}

export default TotalScore