import React from 'react';
import { useNavigate } from 'react-router-dom';
import GreenFlask from '../Assets/Images/green-flask.png';
import './ElectronFinish.css';

const ElectronFinish = () => {
  const nav = useNavigate();

  return (
    <div className="electron-finish">
        <div className="img-wrapper">
          <img src={GreenFlask} alt="flask" id="gflask-1"/>
          <img src={GreenFlask} alt="flask" id="gflask-2"/>
        </div>
        <div className="wrapper">
            <h2>Congratulations!</h2>
            <h2>You're finished.</h2>
        </div>
        <button onClick={() => nav("/")}>Browse Other Games</button>
    </div>
  )
}

export default ElectronFinish