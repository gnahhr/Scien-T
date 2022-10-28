import React, { useState, useEffect } from 'react';

//Hooks

//Components
import Choice from '../../Components/Choice';
import BattleTopic from '../../Components/BattleTopic';
import BattleStage from '../../Components/BattleStage';
import BattleWindow from '../../Components/BattleWindow';
import BattleStats from '../../Components/BattleStats';

//Data
import { periodicTable } from '../../Data/PeriodicTableJSON';
import { sampleQuestions } from '../../Data/SampleQuestion.js';

//Styles
import "./TestBattle.css";

const TestBattle = () => {
  const [ topic, setTopic ] = useState("");
  const [ stage, setStage ] = useState(0);
  const [ score, setScore ] = useState(0);
  const [ progPhase, setProgPhase ] = useState(0);
  const [ multi, setMulti ] = useState(0);
  const [ battleResult, setBattleResult ] = useState("victory");


  return (
    <>
      <div className="main-header">
        <h1>Test Battle</h1>
      </div>
      <div className="test-battle">
        {progPhase === 0 && <BattleTopic setTopic={setTopic} nextPhase={setProgPhase}/>}
        {progPhase === 1 && <BattleStage setStage={setStage} lastFinStage={2} nextPhase={setProgPhase}/>}
        {progPhase === 2 && <BattleWindow topic={topic} stage={stage} nextPhase={setProgPhase} setMulti={setMulti} getScore={setScore}/>}
        {progPhase === 3 && <BattleStats totalEnemies={10} totalScore={score} highMulti={multi} nextPhase={setProgPhase}/>}
      </div>
    </>
  )
}

export default TestBattle