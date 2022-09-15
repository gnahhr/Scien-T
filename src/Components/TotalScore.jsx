import React from 'react';
import "./TotalScore.css";

const TotalScore = ({totalQuestions, totalCorrect, totalScore, highestCombo, highestMultiplier}) => {
  return (
    <div className="total-score">
        <div className="wrapper">
            <h2>Finished</h2>
            <div className="data-wrapper">
                <p className="left-data">Total Elements</p> <p className="right-data">{totalQuestions}</p>
                <p className="left-data">Total Questions</p> <p className="right-data">{totalQuestions * 4}</p>
                <p className="left-data">Total Correct</p> <p className="right-data">{totalCorrect}</p>
                <p className="left-data">Highest Combo</p> <p className="right-data">{highestCombo}</p>
                <p className="left-data">Highest Multiplier</p> <p className="right-data">{highestMultiplier}</p>
                <p className="left-data">Total Score</p> <p className="right-data">{totalScore}</p>
            </div>
            <button>Confirm</button>
        </div>
    </div>
  )
}

export default TotalScore