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

//Data
import { levels } from '../../Data/MixDashLevels.js';

//Styles
import './MixDash.css'

const MixDash = () => {
  const [ dashPhase, setDashPhase ] = useState(0);
  const [ level, setLevel ] = useState(0);
  const [ result, setResult ] = useState();
  const [ resultState, setResultState ] = useState("");
  const [ lastFinStage, setLastFinStage ] = useState(0);
  const [ coins, setCoins ] = useState(0);
  const [ prizeCoins, setPrizeCoins ] = useState(500);
  
  const [ boughtStage, setBoughtStage ] = useState(false);

  const [ username, setUsername ] = useState('');
  const [ access, setAccess ]  = useState('');


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
    if (resultState === "victory"){
      pushMixDash(access, prizeCoins);
      (async() => {                                   
        const data = await getUserProgMixDash(access);
        setLastFinStage(data);
      })()
    }
  }, [resultState]);

  useEffect(() => {
    (async () => {
      const data = await getUserProgMixDash(access);
      setLastFinStage(data);
    })()
  }, [boughtStage]);
  
  return (
    <>
      <div className="main-header">
        <h1>Mix Dash</h1>
      </div>
      <div className="mixDash-wrapper">
        {dashPhase === 0 && access &&(lastFinStage ? <MixDashLevels totalLevels={10} lastFinStage={lastFinStage} nextPhase={setDashPhase} setLevel={setLevel} boughtStage={setBoughtStage} boughtState={boughtStage} access={access}/> : <Loader />)}
        {dashPhase === 1 && <MixDashWindow build={levels[level]} setResultState={setResultState} setResult={setResult} nextPhase={setDashPhase} setPrizeCoins={setPrizeCoins}/>}
        {dashPhase === 2 && <MixDashResult resultState={resultState} resultData={result} setPhase={setDashPhase} level={level} setLevel={setLevel} totalLevels={levels.length} prizeCoins={prizeCoins}/>}
        {/* Final */}
      </div>
    </>
  )
}

export default MixDash