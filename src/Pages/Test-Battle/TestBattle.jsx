//TODOs
//Add Prize Moneysz
//Buy Stages

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import jwtDecode from "jwt-decode"


//Hooks
import getUserProgTestBattle from '../../Hooks/getUserProgTestBattle'
import pushTestBattle from '../../Hooks/pushtTestBattle';
import buyTestBattleStage from '../../Hooks/buyTestBattleStage'; //buyTestBattleStage(access, topic, stagePrice)
import getCoins from '../../Hooks/getCoins';


//Components
import BattleTopic from '../../Components/BattleTopic';
import BattleStage from '../../Components/BattleStage';
import BattleWindow from '../../Components/BattleWindow';
import BattleStats from '../../Components/BattleStats';
import BattleDefeat from '../../Components/BattleDefeat';

//Styles
import "./TestBattle.css";

const TestBattle = () => {
  const navigate = useNavigate();
  const [ topic, setTopic ] = useState("");
  const [ stage, setStage ] = useState(0);
  const [ progPhase, setProgPhase ] = useState(0);
  const [ resultState, setResultState ] = useState("");
  const [ lastFinStage, setLastFinStage ] = useState()
  const [ defeatInfo, setDefeatInfo ] = useState();
  const [ battleResult, setBattleResult ] = useState({
    totalEnemies: 0,
    score: 0,
    highMulti: 0,
  });
  const [ coins, setCoins ] = useState(0);
  const [ prizeCoins, setPrizeCoins ] = useState(0);

  const [ access, setAccess ] = useState('');
  const [ username, setUsername ] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token){
      const user = jwtDecode(token)                                
      if(!user){
        localStorage.clear()
        navigate('/login')
      }
      else{
        setAccess(user.id);
        setUsername(user.username);
        (async () => {
          const data = await getCoins(user.id)
          setCoins(data)
        })()
      }
    }
  },[])

  useEffect(() => {
    (async () => {
      const data = await getUserProgTestBattle(access,topic)
      setLastFinStage(data)
    })()

  },[topic])

  useEffect(() => {//save score to DB
    if (resultState === "victory"){
      setLastFinStage(stage);
      pushTestBattle(access,username,topic,stage,battleResult.score, prizeCoins);
    }
    (async () => {
      const data = await getUserProgTestBattle(access,topic)
      setLastFinStage(data)
    })()
  },[resultState])
  
  return (
    <>
      <div className="main-header">
        <h1>Test Battle</h1>
      </div>
      <div className="test-battle">
        {progPhase === 0 && <BattleTopic setTopic={setTopic} nextPhase={setProgPhase}/>}
        {progPhase === 1 && <BattleStage topic={topic} setStage={setStage} lastFinStage={lastFinStage} nextPhase={setProgPhase}/>}
        {progPhase === 2 && <BattleWindow topic={topic} stage={stage} nextPhase={setProgPhase} battleResult={setBattleResult} resultState={setResultState} setDefeatInfo={setDefeatInfo}/>}
        {progPhase === 3 && (resultState === "victory" ?
        <BattleStats battleInfo={battleResult} setPhase={setProgPhase} setStage={setStage} stage={stage}/>
        :
        <BattleDefeat info={defeatInfo} setPhase={setProgPhase}/>)}
      </div>
    </>
  )
}

export default TestBattle