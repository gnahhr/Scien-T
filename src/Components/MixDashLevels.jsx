import React, { useEffect, useState } from 'react';

//Images
import Lock from '../Assets/Images/lock.svg';

const MixDashLevels = ({totalLevels, lastFinStage, nextPhase, setLevel}) => {
  const [ levels, setLevels ] = useState();

  useEffect(() => {
    initLevels();
    console.log(lastFinStage)
  }, [])

  const onClickHandler = (level) => {
    setLevel(level-1);
    nextPhase(1);
  }

  const initLevels = () => {
    let iLevels = [];
    for (let x = 1; x <= totalLevels; x++){
        if (x <= lastFinStage) {
            iLevels.push(<button className="fluid-btn" key={x} onClick={() => onClickHandler(x)}>{x}</button>);
        } else {
            iLevels.push(<button className="fluid-btn"><img src={Lock} alt="Lock" className="lock-icon"/></button>);
        }
    }
    setLevels(iLevels);
  }

  return (
    <div className="stage-wrapper">
        <h2>Pick a stage:</h2>
        <div className="stages">
            {levels}
        </div>
    </div>
  )
}

export default MixDashLevels