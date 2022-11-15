//TODO:
//-Line Constructor
//--Generate Line from considering the possible Elements
//
//-Mixing Table
//--Right Combinations == Satisfied Customer
//--Wrong combinations == Customer Satisfaction decreases
import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

//Components
import MixDashWindow from '../../Components/MixDashWindow';
import MixDashLevels from '../../Components/MixDashLevels';
import MixDashResult from '../../Components/MixDashResult';
import Loader from '../../Components/Loader';


//Hooks
import pushMixDash from  '../../Hooks/pushMixDash'
import getUserProgMixDash from '../../Hooks/getUserProgMixDash';
import buyMixDashStage from '../../Hooks/buyMixDashStage'; //buyMixDashStage(access, stagePrice)

//Data
import { levels } from '../../Data/MixDashLevels.js';

//Styles
import './MixDash.css'

const MixDash = () => {
  const [ dashPhase, setDashPhase ] = useState(0);
  const [ level, setLevel ] = useState(0);
  const [ result, setResult ] = useState();
  const [ resultState, setResultState ] = useState("");
  const [ lastFinStage, setLastFinStage ] = useState(0)
  const [ coins, setCoins ] = useState(0)
  const [ prizeCoins, setPrizeCoins ] = useState(500)

  const [ username, setUsername ] = useState('')
  const [ access, setAccess ]  = useState('')


  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    setAccess(user.id);
    setUsername(user.username);
    (async() => {
      const data = await getUserProgMixDash(user.id);
      setLastFinStage(data)
    })()
  },[])

  useEffect(() => {
    console.log(resultState);
    pushMixDash(access, prizeCoins);
    (async() => {                                   //kagagawan ni juicewah
      const data = await getUserProgMixDash(access)
      setLastFinStage(data)
    })()
  }, [resultState]);

  useEffect(() => {
    console.log(lastFinStage)
  },[lastFinStage])
  
  return (
    <>
      <div className="main-header">
        <h1>Mix Dash</h1>
      </div>
      <div className="mixDash-wrapper">
        {dashPhase === 0 && lastFinStage ? <MixDashLevels totalLevels={10} lastFinStage={lastFinStage} nextPhase={setDashPhase} setLevel={setLevel} /> : <Loader />}
        {dashPhase === 1 && <MixDashWindow build={levels[level]} setResultState={setResultState} setResult={setResult} nextPhase={setDashPhase}/>}
        {dashPhase === 2 && <MixDashResult resultState={resultState} resultData={result} setPhase={setDashPhase} level={level} setLevel={setLevel} totalLevels={levels.length}/>}
        {/* Final */}
      </div>
    </>
  )
}

export default MixDash