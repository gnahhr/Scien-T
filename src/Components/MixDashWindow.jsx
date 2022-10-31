import React, { useState } from 'react';

//Design
import Customer from '../Assets/Images/customer.svg';

//Data
import {recipe} from '../Data/Recipe.js';

//Customers, Choices
const MixDashWindow = ({build, customers}) => {
  const [ currCustomer, setCurrCustomer ] = useState(0);
  const [ custSatis, setCustSatis ] = useState(100);
  const [ choices, setChoices ] = useState([
    {
        element: "H",
        selected: false
    },
    {
        element: "Na",
        selected: false
    },
    {
        element: "Cl",
        selected: false
    },
  ]);

  //Select Elements
  const toggleSelected = (element) => {
    setChoices(() => choices.map(choice => choice.element === element ? {
        element: choice.element,
        selected: !choice.selected
    } : choice));
  }

  //Reset Selected (used after mixing)
  const resetSelected = () => {
    setChoices(() => choices.map(choice => {
        choice.selected = false;
        return choice;
    }));
  }

  //Verify if selected elements are correct
  const verifyMix = (order) => {
    const selected = choices.filter((choice) => choice.selected === true).map(choice => choice.element);
    const orderRecipe = recipe.filter((comp) => {
        if (comp.name.toLowerCase().includes(order.toLowerCase())) {
            return comp;
        }
    })[0].elements;

    console.log("Selected: ", selected);
    console.log("Order Recipe: ", orderRecipe);
    console.log("Same: ", compareElemArr(selected, orderRecipe))
    //Next Customer
    //Add Money based on performance
    resetSelected();
  }

  //Compare the selected and same elements
  const compareElemArr = (elemArr1, elemArr2) => {
    let flag = true;
    if (elemArr1.length === elemArr2.length){
      for (let x = 0; x < elemArr1.length; x++){
        if(elemArr1[x] !== elemArr2[x]){
          flag = false;
        }
      }
    } else {
      flag = false;
    }
  	
  	return flag;
  }

  return (
    <div className="mixDash-window">
        <div className="dash-status">
          <p className="progress-bar">
            Progress:
          </p>
          <p className="goal-count">
            Goal Count: 
          </p>
        </div>
        <div className="customer-wrapper">
          <div className="order-wrapper">
            <p className="order">
              Yakisoba
            </p>
          </div>
          <img src={Customer} alt="" id="customer"/>
        </div>
        <div className="elements-wrapper">
          <div className="elements">
            {choices && choices.map((choice) =>
            <div className={
                choice.selected ? 
                "dash-elem element selected" :
                "dash-elem element"
            }
                onClick={() => toggleSelected(choice.element)}
            >{choice.element}</div>)}
          </div>
          <div className="mix-wrapper">
            <button className="battle-btn cta fluid-btn" onClick={() => {verifyMix("Sodium Chloride")}}>
              Mix!
            </button>
          </div>
        </div>
    </div>
  )
}

export default MixDashWindow