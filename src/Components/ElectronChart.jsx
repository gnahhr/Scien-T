import React, {useState} from 'react';
import Chart from '../Assets/Images/chart.png';
import './ElectronChart.css';

const ElectronChart = ({showModal}) => {

  return (
    <div className="electron-wrapper">
      <div className="electron-chart">
          <div className="exit" onClick={() => showModal(false)}>X</div>
          <img src={Chart} alt="chart" />
      </div>
    </div>
  )
}

export default ElectronChart