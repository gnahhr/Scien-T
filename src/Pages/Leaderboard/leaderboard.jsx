import React, { useState, useEffect } from 'react'

import "./leaderboard.css"

import getIntellimentRankings from "../../Hooks/getIntellimentRankings.js" //rankings for intelliment || will modify later
import getElectronConfigRankings from '../../Hooks/getElectronConfigRankings'
import getTestBattleRankings from '../../Hooks/getTestBattleRankings'

import IntellimentRankings from '../../Components/IntellimentRankings'
import ElectronConfigRankings from  '../../Components/ElectronConfigRankings'
import SideNav from '../../Components/SideNav'

const leaderboard = () => {
  const [ rankings, setRankings] = useState([])

  //Game States
  const [showIntelliment, setShowIntelliment] = useState(true);
  const [showElectronConfig, setShowElectronConfig] = useState(false);
  const [ showTestBattle, setShowTestBattle ] = useState(false)

  //Difficulty States
  const [ difficulty, setDifficulty ] = useState("easy");
  const [ topic, setTopic ] = useState('elemName')

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
        setShowElectronConfig(false)
        setShowIntelliment(false);
        setDifficulty("");
      }
    }
  }

  const toggleTopic = (topic) => {
    setTopic(topic)
  }

  return (
    <main>
      <div className="selector-wrapper">
        <div className="selector">
            <div id="intelliment"><button style={{backgroundColor: showIntelliment ? "#008773":"#F1F1F1"}} onClick={() => {toggleIntelliment()}}> Intelliment </button> </div>
            <div id="electronConfig"><button style={{backgroundColor: showElectronConfig ? "#008773":"#F1F1F1"}} onClick={() => {toggleElectronConfig()}}>Electron <br></br>Configuration</button> </div>
            <div id="electronConfig"><button style={{backgroundColor: showTestBattle ? "#008773":"#F1F1F1"}} onClick={() => {toggleTestBattle()}}>Test Battle</button> </div>
        </div>
      </div>
      <div className = "container">
        <div className="ranking-container">
          <div className="top-text"><h1>Leaderboard</h1></div>
          {showIntelliment ? <IntellimentRankings rankings={rankings}/> : <ElectronConfigRankings rankings={rankings}/>}
        </div>

        {showIntelliment &&
        <div className="difficulty-wrapper">
          <button className={difficulty === "easy" ? "active-diff" : "" || showIntelliment ? "" : "hidden-button"}
                  onClick={() => toggleDifficulty("easy")}>Easy</button>
          <button className={difficulty === "normal" ? "active-diff" : ""  || showIntelliment ? "" : "hidden-button"}
                  onClick={() => toggleDifficulty("normal")}>Normal</button>
          <button className={difficulty === "hard" ? "active-diff" : ""  || showIntelliment ? "" : "hidden-button"}
                  onClick={() => toggleDifficulty("hard")}>Hard</button>
          <button className={difficulty === "hardcore" ? "active-diff" : ""  || showIntelliment ? "" : "hidden-button"}
                  onClick={() => toggleDifficulty("hardcore")}>Hardcore</button>
        </div>
        }

        {showTestBattle && 
        <div className="difficulty-wrapper">
        <button className={topic === "elemName" ? "active-diff" : "" || showTestBattle ? "" : "hidden-button"}
                onClick={() => toggleTopic("elemName")}>Element Name</button>
        <button className={topic === "atomicNum" ? "active-diff" : ""  || showTestBattle ? "" : "hidden-button"}
                onClick={() => toggleTopic("atomicNum")}>Atomic Number</button>
        <button className={topic === "atomicMass" ? "active-diff" : ""  || showTestBattle ? "" : "hidden-button"}
                onClick={() => toggleTopic("atomicMass")}>Atomic Mass</button>
        <button className={topic === "category" ? "active-diff" : ""  || showTestBattle ? "" : "hidden-button"}
                onClick={() => toggleTopic("category")}>Category</button>
      </div>
      }
        
      </div>
    </main>
  )
}

export default leaderboard