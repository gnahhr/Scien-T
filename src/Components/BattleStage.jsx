import React, { useState } from 'react';

//Components
import UnlockStageModal from './UnlockStageModal';
import Toast from './Toast';

//Hooks
import buyTestBattleStage from '../Hooks/buyTestBattleStage';

//Images
import Lock from '../Assets/Images/lock.svg';

//Design
import './BattleStage.css';

const BattleStage = ({setStage, lastFinStage, nextPhase, topic, access, boughtStage, boughtState}) => {
  //Selected Data States
  const [ selStage, setSelStage ] = useState(0);
  const [ selPrice, setSelPrice ] = useState(0);

  //Modal State
  const [ showModal, setShowModal ] = useState(false);

  //Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastMessage, setToastMessage ] = useState("");

  const stages = [
    {
        stage: 1,
        value: 10,
        price: 200,
    },
    {
        stage: 2,
        value: 20,
        price: 200,
    },
    {
        stage: 3,
        value: 30,
        price: 200,
    },
    {
        stage: 4,
        value: 40,
        price: 200,
    },
    {
        stage: 5,
        value: 50,
        price: 200,
    },
    {
        stage: 6,
        value: 60,
        price: 200,
    },
    {
        stage: 7,
        value: 70,
        price: 200,
    },
    {
        stage: 8,
        value: 80,
        price: 200,
    },
    {
        stage: 9,
        value: 90,
        price: 200,
    },
    {
        stage: 10,
        value: 100,
        price: 200,
    },
    {
        stage: 11,
        value: 110,
        price: 200,
    },
    {
        stage: 12,
        value: 119,
        price: 200,
    },
    {
        stage: "Endless",
        value: "endless",
    },
  ]

  const buyStage = (price) => {
    buyTestBattleStage(access,topic,price);
    setToastMessage("Stage bought!");
    setShowToast(true);
    boughtStage(!boughtState);
  }

  const onClickHandler = (value) => {
    setStage(value);
    nextPhase(2);
  }

  const unlockStage = (stage, price) => {
    setShowModal(true);
    setSelPrice(price);
    setSelStage(stage);
  }

  return (
    <div className="stage-wrapper">
        <h2>Pick a stage:</h2>
        <div className="stages">
            {stages.map(indiv => {
                if (indiv.stage === lastFinStage + 1) {
                    return <button className="fluid-btn" key={indiv.value}><img src={Lock} alt="Lock" className="lock-icon" onClick={() => {unlockStage(indiv.stage, indiv.price)}}/></button>;
                } else if (indiv.stage > lastFinStage){
                    return <button className="fluid-btn" key={indiv.value}><img src={Lock} alt="Lock" className="lock-icon"/></button>;
                }else if (indiv.stage === "Endless" || indiv.stage <= lastFinStage){
                    return <button className="fluid-btn" key={indiv.value} onClick={() => onClickHandler(indiv.value)} >{indiv.stage}</button>;
                }
            })}
        </div>
        <Toast message={toastMessage} timer={3000} toastType={"success"} showToast={setShowToast} toastState={showToast}/>
        {showModal && <UnlockStageModal stage={selStage} topic={topic} price={selPrice} showModal={setShowModal} buyStage={buyStage}/>}
    </div>
  )
}

export default BattleStage