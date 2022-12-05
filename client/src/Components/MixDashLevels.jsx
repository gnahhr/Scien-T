import React, { useEffect, useState } from 'react';

//Components
import UnlockStageModal from './UnlockStageModal';
import Toast from './Toast';

//Images
import Lock from '../Assets/Images/lock.svg';

//Hooks
import buyMixDashStage from '../Hooks/buyMixDashStage';

const MixDashLevels = ({totalLevels, lastFinStage, nextPhase, setLevel, boughtStage, boughtState, access, setShowInstruction}) => {
  //Selected Data States
  const [ selStage, setSelStage ] = useState(0);
  const [ selPrice, setSelPrice ] = useState(0);
  
  const [ levels, setLevels ] = useState();

  //Modal State
  const [ showModal, setShowModal ] = useState(false);

  //Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastMessage, setToastMessage ] = useState("");
  const [ toastType, setToastType ] = useState("");

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

  const buyStage = (price, isBought) => {

    if(isBought){
      buyMixDashStage(access,price);
      setToastMessage("Stage bought!");
      setToastType("success");
      boughtStage(!boughtState);
    } else {
      setToastType("warning");
      setToastMessage("Insufficient Money!");
    }
    
    setShowToast(true);
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
        <div className="settings-wrapper">
          <div className="icon float-help" onClick={() => setShowInstruction(true)}>
            HELP
          </div>
        </div>
        <Toast message={toastMessage} timer={3000} toastType={toastType} showToast={setShowToast} toastState={showToast}/>
        {showModal && <UnlockStageModal stage={selStage} price={200} showModal={setShowModal} buyStage={buyStage}/>}
    </div>
  )
}

export default MixDashLevels