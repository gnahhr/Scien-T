//TODO:
//-Line Constructor
//--Generate Line from considering the possible Elements
//
//-Mixing Table
//--Right Combinations == Satisfied Customer
//--Wrong combinations == Customer Satisfaction decreases
import React, { useState } from 'react';
import MixDashWindow from '../../Components/MixDashWindow';
import MixDashLevels from '../../Components/MixDashLevels';
import MixDashResult from '../../Components/MixDashResult';

//Data
import { levels } from '../../Data/MixDashLevels.js';

//Styles
import './MixDash.css'

const MixDash = () => {
  const [ dashPhase, setDashPhase ] = useState(0);
  const [ level, setLevel ] = useState(0);
  const [ result, setResult ] = useState();
  const [ resultState, setResultState ] = useState("");
  
  return (
    <>
      <div className="main-header">
        <h1>Mix Dash</h1>
      </div>
      <div className="mixDash-wrapper">
        {dashPhase === 0 && <MixDashLevels totalLevels={10} lastFinStage={2} nextPhase={setDashPhase} setLevel={setLevel}/>}
        {dashPhase === 1 && <MixDashWindow build={levels[level]} setResultState={setResultState} setResult={setResult} nextPhase={setDashPhase}/>}
        {dashPhase === 2 && <MixDashResult resultState={resultState} resultData={result} setPhase={setDashPhase} level={level} setLevel={setLevel} totalLevels={levels.length}/>}
        {/* Final */}
      </div>
    </>
  )
}

export default MixDash