import React, { useState, useEffect } from 'react';

//Design
import Customer from '../Assets/Images/MixCust.png';

//Data
import {recipe} from '../Data/Recipe.js';
import NewRecipeModal from './NewRecipeModal';

const MixDashWindow = ({build, setResultState, setResult, nextPhase}) => {
  //Data States
  const [ customers, setCustomers ] = useState();
  const [ currCustomer, setCurrCustomer ] = useState(0);
  const [ custSatis, setCustSatis ] = useState(100);
  const [ earned, setEarned ] = useState(0);
  const [ tips, setTips ] = useState(0);
  const [ totalEarned, setTotalEarned ] = useState(); 
  const [ choices, setChoices ] = useState([]);

  //Conditional States
  const [ paused, setPaused ] = useState(true);
  const [ selState, setSelState ] = useState(false);
  const [ satisColor, setSatisColor ] = useState("green");
  const [ showModal, setShowModal ] = useState(true); 

  //On-mount
  useEffect(() => {
    initChoices();
    initCustomers();
  }, [])

  //Set Paused State
  useEffect(() => {
    if (showModal === false){
      setPaused(false);
    }
  }, [showModal])

  //Monitor custSatis then change color accordingly
  useEffect(() => {
    if (custSatis > 50) {
      setSatisColor("green");
    } else if (custSatis > 25 && custSatis <= 50) {
      setSatisColor("orange");
    } else if (custSatis <= 25) {
      setSatisColor("red");
    }
  }, [custSatis])

  //Customer Satisfaction
  useEffect(() => {
    if (paused) {
      setCustSatis(100);
    }
    else if (!paused && custSatis > 0) {
      setTimeout(() => setCustSatis(() => custSatis - 1), 100);
    }
  }, [custSatis, paused])

  //Randomize Customers
  const initCustomers = () => {
    let iCustomers = [];
    for (let x = 0; x < build.numOfCustomers; x++){
      if (x < build.compounds.length){
        iCustomers.push({
          order: build.compounds[x],
          money: 20,
          customerImg: Customer,
        })
      } else {
        iCustomers.push({
          order: build.compounds[Math.floor(Math.random() * build.compounds.length)],
          money: 20,
          customerImg: Customer,
        })
      }
    }
    console.log(iCustomers);
    setCustomers(shuffleArray(iCustomers));
  }

  //Initialize Choices
  const initChoices = () => {
    let iChoices = [];
    build.elems.forEach((elem) => {
      iChoices.push({
        element: elem,
        selected: false
      })
    })
    setChoices(iChoices);
  }

  //Select Elements
  const toggleSelected = (element) => {
    let updatedState = choices.map(choice => choice.element === element ? {
                            element: choice.element,
                            selected: !choice.selected
                        } : choice)
    setChoices(updatedState);
    (updatedState.filter(choice => choice.selected === true).length === 0) ? setSelState(false) : setSelState(true);
  }

  //Reset Selected (used after mixing)
  const resetSelected = () => {
    setChoices(() => choices.map(choice => {
        choice.selected = false;
        return choice;
    }));
  }

  //Verify if selected elements are correct
  const verifyMix = () => {
    const order = customers[currCustomer].order; 
    const selected = choices.filter((choice) => choice.selected === true).map(choice => choice.element);
    const orderRecipe = recipe.filter((comp) => {
        if (comp.name.toLowerCase().includes(order.toLowerCase())) {
            return comp;
        }
    })[0].elements;
  
    if (compareElemArr(selected.sort(), orderRecipe.sort())){
        const pay = customers[currCustomer].money;
        console.log("Correct Recipe!");
        setEarned(() => earned + pay);
        setTips(() => calcTip(custSatis, pay));
        setTotalEarned(() => earned + tips);
        if (currCustomer + 1 !== build.numOfCustomers){
          setCurrCustomer(() => currCustomer + 1);
        } else if (currCustomer + 1 === build.numOfCustomers){
          setResult({
            numberOfCustomers: build.numOfCustomers,
            gainedMoney: earned,
            tips: tips,
            totalEarned: totalEarned
          })
          build.goal >= totalEarned ? setResultState("victory") : setResultState("defeat");
          nextPhase(2);
        }
        setPaused(true);
        setSelState(false);
        setCustSatis(100);
        setInterval(() => setPaused(false), 1000);
        resetSelected();
    } else {
        console.log("Wrong Recipe!");
        resetSelected();
        setSelState(false);
    }
  }

  const calcTip = (custSatis, pay) => {
    if (custSatis > 75) {
      return pay * .5;
    } else if (custSatis > 50 && custSatis < 75){
      return pay * .25;
    } else if (custSatis < 50){
      return 0;
    }
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

  //Shuffle Array
  const shuffleArray = (currArray) => {
    let currentIndex = currArray.length,  randomIndex;

    while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
      [currArray[currentIndex], currArray[randomIndex]] = [
        currArray[randomIndex], currArray[currentIndex]];
    }

    return currArray;
  };

  return (
    <>
    <div className="dash-status">
      <p className="progress-bar">
        Progress: {earned}
      </p>
      <p className="goal-count">
        Goal: {build.goal}
      </p>
    </div>
    <div className="mixDash-window">
      <div className="customer-backdrop">
        <div className="customer-wrapper">
          {customers && <img src={customers[currCustomer].customerImg} alt="" id="customer"/>}
          <div className="order-wrapper">
            <div className="satisfaction"
                 style={{
                   width: `${custSatis}%`,
                   backgroundColor:`${satisColor}`
                  }}
                  >

            </div>
            <p className="order">
              {customers && customers[currCustomer].order}
            </p>
          </div>
        </div>
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
            <button className="battle-btn cta fluid-btn"
                    onClick={() => {verifyMix()}}
                    disabled={!selState}>
              Mix!
            </button>
          </div>
        </div>

      {showModal && <NewRecipeModal newCompound={build.newCompound} showModal={setShowModal}/>}
    </div>
    </>
  )
}

export default MixDashWindow