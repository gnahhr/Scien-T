import React from 'react';
import "./TotalScore.css";

const MixDashResult = ({resultState, resultData, setPhase, level, setLevel, totalLevels}) => {

    const playAgain = () => {
        setPhase(1);
    }

    const nextLevel = () => {
        setLevel(level+1);
        setPhase(1);
    }

    const chooseLevel = () => {
        setPhase(0);
    }
  
   return (
    <div className="total-score">
        <div className="wrapper">
            <h2>{resultState === "victory" ? "Shift done!" : "Better luck next time!"}</h2>
            <div className="data-wrapper">
                <p className="left-data">Customers served</p> <p className="right-data">{resultData.numberOfCustomers}</p>
                <p className="left-data">Earned money</p> <p className="right-data">{resultData.gainedMoney}</p>
                <p className="left-data">Tips</p> <p className="right-data">{resultData.tips}</p>
                <p className="left-data total-data">Total Earned</p> <p className="right-data total-data">{resultData.totalEarned}</p>
            </div>
        </div>
        <div className="button-wrapper">
              <button onClick={() => playAgain()}>Play Again</button>
              {totalLevels !== level+1 && <button onClick={() => nextLevel()}>Next Level</button>}
              <button onClick={() => chooseLevel()}>Choose Level</button>
        </div>
    </div>
  )
}

export default MixDashResult