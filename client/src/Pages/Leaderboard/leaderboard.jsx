import React, { useState, useEffect } from 'react';

//Components
import IntellimentRankings from '../../Components/IntellimentRankings';

//Hooks
import getIntellimentRankings from '../../Hooks/getIntellimentRankings.js'; //rankings for intelliment || will modify later
import getElectronConfigRankings from '../../Hooks/getElectronConfigRankings';
import getTestBattleRankings from '../../Hooks/getTestBattleRankings';

//Design
import "./leaderboard.css";


const leaderboard = () => {
  const [ rankings, setRankings] = useState([])

  //Game States
  const [ showIntelliment, setShowIntelliment ] = useState(true);
  const [ showElectronConfig, setShowElectronConfig ] = useState(false);
  const [ showTestBattle, setShowTestBattle ] = useState(false)

  //Difficulty States
  const [ difficulty, setDifficulty ] = useState("easy");
  const [ topic, setTopic ] = useState('elemName');

  const intDiff = [
    {
      value: "Easy",
      key: "easy"
    },
    {
      value: "Normal",
      key: "normal"
    },
    {
      value: "Hard",
      key: "hard"
    },
    {
      value: "Hardcore",
      key: "hardcore"
    }
  ];

  const battleTopics = [
    {
      value: "Elem Name",
      key: "elemName"
    },
    {
      value: "Atomic Num",
      key: "atomicNum"
    },
    {
      value: "Atomic Mass",
      key: "atomicMass"
    },
    {
      value: "Category",
      key: "category"
    }
  ];

  useEffect(()=>{
    (async () => {
      const data = await getIntellimentRankings(difficulty);
      setRankings(data);
    })()
  },[])

  useEffect(()=>{
    if (difficulty !== "") {
      (async () => {
        const data = await getIntellimentRankings(difficulty);
        setRankings(data);
      })()
    }
  },[difficulty])

  useEffect(()=>{
    if (topic !== "") {
      (async () => {
        const data = await getTestBattleRankings(topic);
        setRankings(data);
      })()
    }
  },[topic])



  const toggleIntelliment = () => {
    if(showIntelliment === false){
      (async () => {
        const data = await getIntellimentRankings("easy");
        setDifficulty("easy");
        setRankings(data);
      })()

      setShowIntelliment(!showIntelliment)
      if(showElectronConfig || showTestBattle){
        setShowElectronConfig(false)
        setShowTestBattle(false)
      }
    }
  }

  const toggleDifficulty  = (difficulty) => {
    setDifficulty(difficulty);
  }

  const toggleElectronConfig = () => {
    if(showElectronConfig === false){
      (async () => {
        const data = await getElectronConfigRankings();
        setRankings(data);
      })()

      setShowElectronConfig(!showElectronConfig)

      if(showIntelliment || showTestBattle){
        setShowIntelliment(false);
        setDifficulty("");
        setShowTestBattle(false)
      }
    }
  }

  const toggleTestBattle = () => {
    if(showTestBattle === false){
      (async () => {
        const data = await getTestBattleRankings("elemName");
        setRankings(data);
        setTopic("elemName")
      })()

      setShowTestBattle(!showTestBattle)

      if(showIntelliment || showElectronConfig){
        setShowElectronConfig(false);
        setShowIntelliment(false);
        setDifficulty("");
      }
    }
  }

  const toggleTopic = (topic) => {
    setTopic(topic)
  }

  return (
    <>
      <div className="selector-wrapper">
        <div className="selector">
            <button id="intelliment" className={showIntelliment ? "active":""} onClick={() => {toggleIntelliment()}}> Assessment </button>
            <button id="electronConfig" className={showElectronConfig ? "active":""} onClick={() => {toggleElectronConfig()}}>Electron <br></br>Configuration</button>
            <button id="testBattle" className={showTestBattle ? "active":""} onClick={() => {toggleTestBattle()}}>Test Battle</button>
        </div>
      </div>
      <div className = "container">
        <div className="top-text">
          <h1>Leaderboard</h1>
        </div>
        <div className="ranking-container">
          <IntellimentRankings rankings={rankings}/>
        </div>

        {showIntelliment &&
        <div className="difficulty-wrapper">
          {intDiff && intDiff.map(diff =>
                  <button
                      className={diff.key === difficulty ? "active-diff" : ""}
                      onClick={() => toggleDifficulty(diff.key)}><span>{diff.value}</span></button> )}
        </div>
        }

        {showTestBattle && 
        <div className="difficulty-wrapper">
          {battleTopics && battleTopics.map(top =>
                <button className={top.key === topic ? "active-diff" : ""}
                  onClick={() => toggleTopic(top.key)}><span>{top.value}</span></button>)}
                  
        </div>
      }
        
      </div>
    </>
  )
}

export default leaderboard