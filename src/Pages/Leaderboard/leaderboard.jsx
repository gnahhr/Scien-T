import React, { useState, useEffect } from 'react'

import "./leaderboard.css"

import getRankings from "../../Hooks/getRankings.js" //rankings for intelliment || will modify later
import getElectronConfigRankings from '../../Hooks/getElectronConfigRankings'

import IntellimentRankings from '../../Components/IntellimentRankings'
import ElectronConfigRankings from  '../../Components/ElectronConfigRankings'
import SideNav from '../../Components/SideNav'

const leaderboard = () => {
  const [ rankings, setRankings] = useState([])
  const [showIntelliment, setShowIntelliment] = useState(true)
  const [showElectronConfig, setShowElectronConfig] = useState(false)

  useEffect(()=>{
    (async () => {
      const data = await getRankings();
      setRankings(data);
    })()
  },[])

  const toggleIntelliment = () => {
    if(showIntelliment === false){
      (async () => {
        const data = await getRankings();
        setRankings(data);
      })()

      setShowIntelliment(!showIntelliment)
      if(showElectronConfig){
        setShowElectronConfig(!showElectronConfig)
      }
    }

    else{
      return
    }
  }

  const toggleElectronConfig = () => {
    if(showElectronConfig === false){
      (async () => {
        const data = await getElectronConfigRankings();
        setRankings(data);
        console.log(data[0].electronConfiguration)
      })()
      setShowElectronConfig(!showElectronConfig)
      if(showIntelliment){
        setShowIntelliment(!showIntelliment)
    }
    }

    else{
      return
    }
  }

  return (
    <>
      <SideNav />
      <div className="selector-wrapper">
        <div className="selector">
            <div id="intelliment"><button style={{backgroundColor: showIntelliment ? "#008773":"#F1F1F1"}} onClick={() => {toggleIntelliment()}}> Intelliment </button> </div>
            <div id="electronConfig"><button style={{backgroundColor: showElectronConfig ? "#008773":"#F1F1F1"}} onClick={() => {toggleElectronConfig()}}>Electron <br></br>Configuration</button> </div>
        </div>
      </div>
      <div className = "container">
        <div className="top-text"><h1>Leaderboard</h1></div>
        <div className="ranking-container">
          {showIntelliment ? <IntellimentRankings rankings={rankings}/> : <ElectronConfigRankings rankings={rankings}/>}
        </div>
      </div>
    </>
  )
}

export default leaderboard