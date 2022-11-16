import React, { useEffect, useState } from 'react';

//Components
import UnlockStageModal from './UnlockStageModal';
import Toast from './Toast';

//Images
import Lock from '../Assets/Images/lock.svg';

//Hooks
import buyMixDashStage from '../Hooks/buyMixDashStage';

const MixDashLevels = ({totalLevels, lastFinStage, nextPhase, setLevel, boughtStage, boughtState, access}) => {
  //Selected Data States
  const [ selStage, setSelStage ] = useState(0);
  const [ selPrice, setSelPrice ] = useState(0);
  
  const [ levels, setLevels ] = useState();

  //Modal State
  const [ showModal, setShowModal ] = useState(false);

  //Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastMessage, setToastMessage ] = useState("");

  useEffect(() => {
    initLevels();
  }, [])

  useEffect(() => {
    initLevels();
  }, [lastFinStage])

  const onClickHandler = (level) => {
    setLevel(level-1);
    nextPhase(1);
  }

  const unlockStage = (stage, price) => {
    setShowModal(true);
    setSelPrice(price);
    setSelStage(stage);
  }

  const buyStage = (price) => {
    buyMixDashStage(access, price);
    setToastMessage("Stage bought!");
    setShowToast(true);
    boughtStage(!boughtState);
  }

  const initLevels = () => {
    let iLevels = [];
    for (let x = 1; x <= totalLevels; x++){
        if (x <= lastFinStage) {
            iLevels.push(<button className="fluid-btn" key={x} onClick={() => onClickHandler(x)}>{x}</button>);
        } else if (x === lastFinStage + 1) {
            iLevels.push(<button className="fluid-btn" key={x} onClick={() => unlockStage(x, 200)}><img src={Lock} alt="Lock" className="lock-icon"/></button>);
        } else {
            iLevels.push(<button className="fluid-btn" key={x}><img src={Lock} alt="Lock" className="lock-icon"/></button>);
        }
    }
    setLevels(iLevels);
  }

  return (
    <div className="stage-wrapper">
        <h2>Pick a stage:</h2>
        <div className="stages mixDash-stages">
            {levels && levels}
        </div>
        <Toast message={toastMessage} timer={3000} toastType={"success"} showToast={setShowToast} toastState={showToast}/>
        {showModal && <UnlockStageModal stage={selStage} price={200} showModal={setShowModal} buyStage={buyStage}/>}
    </div>
  )
}

export default MixDashLevels