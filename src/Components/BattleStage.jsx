import React from 'react';
import './BattleStage.css';

//Images
import Lock from '../Assets/Images/lock.svg';

const BattleStage = ({setStage, lastFinStage, nextPhase}) => {
  const stages = [
    {
        stage: 1,
        value: 10,
    },
    {
        stage: 2,
        value: 20,
    },
    {
        stage: 3,
        value: 30,
    },
    {
        stage: 4,
        value: 40,
    },
    {
        stage: 5,
        value: 50,
    },
    {
        stage: 6,
        value: 60,
    },
    {
        stage: 7,
        value: 70,
    },
    {
        stage: 8,
        value: 80,
    },
    {
        stage: 9,
        value: 90,
    },
    {
        stage: 10,
        value: 100,
    },
    {
        stage: 11,
        value: 110,
    },
    {
        stage: 12,
        value: 119,
    },
    {
        stage: "Endless",
        value: "endless",
    },
  ]

  const onClickHandler = (value) => {
    setStage(value);
    nextPhase(2);
  }
  return (
    <div className="stage-wrapper">
        <h2>Pick a stage:</h2>
        <div className="stages">
            {stages.map(indiv => {
                if (indiv.stage > lastFinStage) {
                    return <button className="fluid-btn"><img src={Lock} alt="Lock" className="lock-icon"/></button>;
                } else {
                    return <button className="fluid-btn" onClick={() => onClickHandler(indiv.value)}>{indiv.stage}</button>;
                }
            })}
        </div>
    </div>
  )
}

export default BattleStage