import React, { useState, useEffect } from 'react';

//Design
import Customer from '../Assets/Images/MixCust.png';
import Microscope from '../Assets/Images/microscope.svg';
import FlaskGroup from '../Assets/Images/flask-group.svg';
import Light from '../Assets/Images/flourescent.svg';
import Customers from '../Assets/Images/customers.svg';
import Money from '../Assets/Images/money-bag.png';

//Customer Images
import Customer1 from '../Assets/Images/cust1.png';
import Customer2 from '../Assets/Images/cust2.png';
import Customer3 from '../Assets/Images/cust3.png';
import Customer4 from '../Assets/Images/cust4.png';

//Data
import { recipe } from '../Data/Recipe.js';
import NewRecipeModal from './NewRecipeModal';

const MixDashWindow = ({build, setResultState, setResult, nextPhase}) => {
  //Data States
  const [ customers, setCustomers ] = useState();
  const [ currCustomer, setCurrCustomer ] = useState(0);
  const [ custSatis, setCustSatis ] = useState(100);
  const [ earned, setEarned ] = useState(0);
  const [ tips, setTips ] = useState(0);
  const [ totalEarned, setTotalEarned ] = useState(0); 
  const [ choices, setChoices ] = useState([]);

  //Conditional States
  const [ paused, setPaused ] = useState(true);
  const [ selState, setSelState ] = useState(false);
  const [ satisColor, setSatisColor ] = useState("green");
  const [ showModal, setShowModal ] = useState(true); 
  const [ finished, setFinished ] = useState(false);

  //Animation States
  const [ animState, setAnimState ] = useState(1);
  const [ isAnimate, setIsAnimate ] = useState(false);  

  //Customers Array
  const custArray = {
    0: Customer1,
    1: Customer2,
    2: Customer3,
    3: Customer4
  }

  //Animation Array
  const animArray = {
    0: "",
    1: "before",
    2: "angry",
    3: "after"
  }

  //On-mount
  useEffect(() => {
    initChoices();
    initCustomers();
  }, [])

  //Set Paused State
  useEffect(() => {
    // if (showModal === false){
    //   setPaused(false);
    // }
    if (showModal === false){
      animateCustomer("before");
    }
    
  }, [showModal])

  useEffect(() => {
    setAnimState(1);
    setTimeout(() => animateCustomer("before"), 1000);
  }, [currCustomer])

  //Monitor custSatis then change color accordingly
  useEffect(() => {
    if (custSatis > 50) {
      setSatisColor("green");
    } else if (custSatis > 25 && custSatis <= 50) {
      setSatisColor("orange");
    } else if (custSatis <= 25 && custSatis > 10) {
      animateCustomer("angry");
      setSatisColor("red");
    } else if (custSatis <= 2) {
      setAnimState(0);
    }
  }, [custSatis])

  //Customer Satisfaction
  useEffect(() => {
    if (paused) {
      setCustSatis(100);
    }
    else if (!paused && custSatis > 0) {
      setTimeout(() => setCustSatis(() => custSatis - 1), 100);
    } else if (!paused && custSatis === 0) {
      if (currCustomer + 1 !== build.numOfCustomers){
        animateCustomer("after");
        setTimeout(() => setCurrCustomer(() => currCustomer + 1), 5000);
      } else if (currCustomer + 1 === build.numOfCustomers) {
        animateCustomer("after");
        setTimeout(() => setFinished(true), 5000);
      }
      setCustSatis(100);
    }
  }, [custSatis, paused])

  //End State
  useEffect(() => {
    setResult({
      numberOfCustomers: build.numOfCustomers,
      gainedMoney: earned,
      tips: tips,
      totalEarned: totalEarned
    })

    if (finished) {
      build.goal <= totalEarned ? setResultState("victory") : setResultState("defeat");
      nextPhase(2);
    }
  }, [finished, totalEarned])

  //Randomize Customers
  const initCustomers = () => {
    let iCustomers = [];
    for (let x = 0; x < build.numOfCustomers; x++){
      if (x < build.compounds.length){
        iCustomers.push({
          order: build.compounds[x],
          money: 20,
          customerImg: randCustomer(custArray),
        })
      } else {
        iCustomers.push({
          order: build.compounds[Math.floor(Math.random() * build.compounds.length)],
          money: 20,
          customerImg: randCustomer(custArray),
        })
      }
    }

    setCustomers(shuffleArray(iCustomers));
  }

  //Randomize Customer Image
  const randCustomer = (custArray) => {
    let imageNum = Math.floor(Math.random() * 3);
    return custArray[imageNum];
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

        setEarned(() => earned + pay);
        setTips(() => tips + calcTip(custSatis, pay));
        setTotalEarned(() => totalEarned + (pay + calcTip(custSatis, pay)));

        if (currCustomer + 1 !== build.numOfCustomers){
          animateCustomer("after");
          setTimeout(() => setCurrCustomer(() => currCustomer + 1), 5000);
        } else if (currCustomer + 1 === build.numOfCustomers) {
          animateCustomer("after");
          setTimeout(() => setFinished(true), 5000);
        }

        setPaused(true);
        setSelState(false);
        setCustSatis(100);
        setInterval(() => setPaused(false), 1000);
        resetSelected();
    } else {
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

  //Animate Toggle
  const animateCustomer = (state) => {
    if (state === "before") {
      setPaused(true);
      setAnimState(0);
      setInterval(() => setPaused(false), 4000);
    } else if (state === "after") {
      setPaused(true);
      setAnimState(3);
      setInterval(() => setPaused(false), 4000);
    } else if (state === "angry") {
      setAnimState(2);
    }
  }

  return (
    <>
    <div className="dash-status">
      <p className="progress stats">
          <img src={Customers} alt="customers" />
          <p>{build.numOfCustomers - currCustomer}</p>
      </p>
      <p className="goal-count stats">
        <img src={Money} alt="money-bag" />
        <p>{earned}/{build.goal}</p> 
      </p>
    </div>
    <div className="mixDash-window">
      <div className="customer-backdrop">
        <img src={Light} alt="light" className="fluorescent" />
        <div className="customer-wrapper">
          {customers && <img src={customers[currCustomer].customerImg} alt="" id="customer" className={animArray[animState]}/>}
          <div className={`order-wrapper ${animArray[animState]}`} >
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
      <div className="bottom-wrapper">
        <div className="microscope">
          <img src={Microscope} alt="microscope" />
        </div>
        <div className="elements-wrapper">
          <h2>Available elements for this order</h2>
          <div className="elements">
            {choices && choices.map((choice) =>
            <div className={
              choice.selected ? 
              "dash-elem selected" :
                "dash-elem"
              }
              onClick={() => toggleSelected(choice.element)}
              >{choice.element}</div>)}
          </div>
          <div className="mix-wrapper">
            <button className="battle-btn cta"
                    onClick={() => {verifyMix()}}
                    disabled={!selState}>
              Mix!
            </button>
          </div>
        </div>
        <div className="flask-group">
          <img src={FlaskGroup} alt="flask group" />
        </div>
      </div>

      {showModal && <NewRecipeModal newCompound={build.newCompound} showModal={setShowModal}/>}
    </div>
    </>
  )
}

export default MixDashWindow