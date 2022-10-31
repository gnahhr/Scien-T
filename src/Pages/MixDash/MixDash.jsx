//TODO:
//-Line Constructor
//--Generate Line from considering the possible Elements
//
//-Mixing Table
//-Generate the mixing table
//--Just select the right elements to mix
//--No more drag and drop bc y not hehe.
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
      compounds: ["Salt", "Hydrocholoric acid"],
      elems: ["Na", "Cl", "H"],
      goal: 100
    }
  ]

  const customers = [
    {
      customerImg: "customer.jpg",
      customerOrder: "Salt",
      customerMoney: 20
    }
  ]

  const verifyMix = () => {
    console.log("Mix is correct!");
  }
  
  return (
    <>
      <div className="main-header">
        <h1>Mix Dash</h1>
      </div>
      <div className="mixDash-wrapper">
        <MixDashWindow />
      </div>
    </>
  )
}

export default MixDash