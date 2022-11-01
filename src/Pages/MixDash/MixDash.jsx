//TODO:
//-Line Constructor
//--Generate Line from considering the possible Elements
//
//-Mixing Table
//--Right Combinations == Satisfied Customer
//--Wrong combinations == Customer Satisfaction decreases
import React from 'react';
import MixDashWindow from '../../Components/MixDashWindow';

//Styles
import './MixDash.css'

const MixDash = () => {
  const levels = [
    {
      level: 1,
      numOfCustomers: 5,
      compounds: ["Sodium Chloride", "Hydrochloric acid", "Sodium hydroxide"],
      elems: ["Na", "Cl", "H", "O"],
      goal: 100,
      newCompound: {
        name: "Salt",
        elems: ["Na", "Cl"]
      } 
    }
  ]
  
  return (
    <>
      <div className="main-header">
        <h1>Mix Dash</h1>
      </div>
      <div className="mixDash-wrapper">
        <MixDashWindow build={levels[0]}/>
      </div>
    </>
  )
}

export default MixDash