//TO DO:
//-Defeat Screen with the correct answer displayed
//-Progression
//-SFX
//-ASSETS >>>>>>>>>

import React, { useEffect, useState } from 'react';
import Choice from './Choice';
import jwtDecode from 'jwt-decode';

//Data
import { periodicTable } from '../Data/PeriodicTableJSON';

//Components
import BattleItemWindow from './BattleItemWindow';

//Images
import Shen from '../Assets/Images/shen-pewpew.png';
import Chuu from '../Assets/Images/chuu-pewpew.png';
import Pewpew from '../Assets/Images/pewpew.png';
import RedHeart from '../Assets/Images/red-heart.svg';
import WhiteHeart from '../Assets/Images/white-heart.svg';
import Star from '../Assets/Images/battle-star.svg';

const BattleWindow = ({topic, stage, nextPhase, resultState, battleResult, setDefeatInfo}) => {
  //Data States
  const [ questions, setQuestions ] = useState(undefined);
  const [ index, setIndex ] = useState(0);
  const [ health, setHealth ] = useState(3);
  const [ multiplier, setMultiplier ] = useState(1);
  const [ highestMulti, setHighestMulti ] = useState(1);
  const [ conRight, setConRight ] = useState(0);
  const [ score, setScore ] = useState(0);
  const [ username, setUsername ] = useState(""); 
  const [ access, setAccess ] = useState();

  //Health State Renderer
  const [ healthRender, setHealthRender ] = useState(<>
    <img src={RedHeart} alt="red-heart" />
    <img src={RedHeart} alt="red-heart" />
    <img src={RedHeart} alt="red-heart" />
  </>);

  //Animation States
  const [ isWrong, setIsWrong ] = useState(false);
  const [ isRight, setIsRight ] = useState(false);
  const [ isAnimate, setIsAnimate ] = useState(false);

  //Item State
  const [ showItems, setShowItems ] = useState(false);

  //Questions
  const topicQs = {
    "category": "What is the group of the element?",
    "elemName": "What is the name of the element?",
    "atomicNum": "What is its atomic number?",
    "atomicMass": "What is its atomic mass?"
  }

  //Topics
  const topicCats = {
    "category": "CATEGORY",
    "elemName": "NAME",
    "atomicNum": "ATOMIC NUMBER",
    "atomicMass": "ATOMIC MASS"
  }

  //Get User Info
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)
    setAccess(user.id)
    setUsername(user.username)
  },[])

  //SetQuestions
  useEffect(() => {
    setQuestions(shuffleArray(generateQsTopic(topic, stage)));
  }, [])
  
  useEffect(() => {
    if (highestMulti < multiplier) {
      setHighestMulti(multiplier);
    }
  }, [multiplier])

  useEffect(() => {
    let updatedHealth = [];
    for (let x = 0; x < 3; x++){
      if ( x >= health) {
        updatedHealth.push(<img src={WhiteHeart} alt="gray" />)
      } else {
        updatedHealth.push(<img src={RedHeart} alt="red" />)
      }
    }

    setHealthRender(updatedHealth);
  }, [health])

  useEffect(() => {
    if (health === 0) {
      //Better luck next time, the correct answer is something modal
      setDefeatInfo({
        symbol: questions[index].elemSym,
        topic: topicCats[[topic]],
        answer: questions[index].elemAnswer
      });
      resultState("defeat");
      nextPhase(3);
    }
  }, [health])

  useEffect(() => {
    if (conRight === 2){
      setMultiplier(2);
    } else if (conRight === 4) {
      setMultiplier(3);
    }
  }, [conRight])

  //Generate Questions as per Category
  const generateQsTopic = (topic, stage) => {
    let totalQs = [];
    if (stage !== "endless") {
      for(let i=stage-10; i<stage; i++) {
        let topics = {
            "elemName": periodicTable[i].name,
            "atomicMass": periodicTable[i].atomic_mass,
            "atomicNum": periodicTable[i].number,
            "category": periodicTable[i].category,
        };

        totalQs.push({
          "elemSym": periodicTable[i].symbol,
          "elemAnswer": topics[topic],
          "choices": [

          ]
        });
      }
    } else {
      for(let i=0; i<119; i++) {
        let topics = {
            "elemName": periodicTable[i].name,
            "atomicMass": periodicTable[i].atomic_mass,
            "atomicNum": periodicTable[i].number,
            "category": periodicTable[i].category,
        };

        totalQs.push({
          "elemSym": periodicTable[i].symbol,
          "elemAnswer": topics[topic],
          "choices": [

          ]
        });
      }
    }
    
    totalQs.map(el => el["choices"] = generateChoices(totalQs, el));

    return totalQs;
  };

  //Generate choices
  const generateChoices = (array, currElem) => {
    let choices = [], tempChoices = [];
    let temp;
    tempChoices.push(currElem["elemAnswer"])
    for(let y = 0; y < 3; ){
        temp = array[Math.floor(Math.random() * array.length)]["elemAnswer"];
        if (!verifyDupe(temp, tempChoices)) {
            tempChoices.push(temp)
            y++;
        }
    }
    choices = shuffleArray(tempChoices);
    tempChoices = [];

    return choices;
  }

  //Verify if the choices will be duplicated
  const verifyDupe = (currData, finalData) => {
    return finalData.filter(el => el === currData).length > 0 ? true : false;
  };

  //Shuffle Arrays
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
  
  //Check Attack
  const checkAttack = (selected) => {
    let confirm = questions[index].elemAnswer === selected ? true : false;

    if (confirm) {
      animateTimeout(setIsRight);
      if (stage !== "endless"){
        if (index + 1 == 10){
          victoryBattle();
        } else {
          setIndex((index) => index + 1);
        }
      } else {
        if (index + 1 == 119){
          victoryBattle();
        } else {
          setIndex((index) => index + 1);
        }
      }
      setScore(() => score + (50 * multiplier));
      setConRight(() => conRight + 1);
    } else {
      animateTimeout(setIsWrong);
      setHealth((health) => health > 0 ? health - 1 : health);
      setConRight(0);
    }
  }

  const animateTimeout = (entityGot) => {
    entityGot(true);
    setIsAnimate(true);
    setTimeout(() => {
      entityGot(false);
      setIsAnimate(false);
    }, 1500);
  }

  const victoryBattle = () => {
    battleResult({
      totalEnemies: questions.length,
      score: score,
      highMulti: highestMulti,
    })
    nextPhase(3);
  }
  

  return (
    <>
    <div className="testBattle-wrapper"> 
    <div className="score">
      <img src={Star} alt="Star" />
      <div className="score-text">
        Score: {score}
      </div>
    </div>
    <div className="battle-window">
        <div className="players-wrapper">
            <div className="entity player">
                <img src={Chuu} alt="chuu-pewpew" />
                <img src={Pewpew} alt="gfx" className={isWrong ? "gfx gfx-active" : "gfx"}/>
            </div>
            <div className="question-bubble">
                {!isAnimate &&
                <div className="element-icon">
                    {!isAnimate && questions ? questions[index].elemSym : <p>NOOOO!</p>}
                </div>}
                <div className="question">
                    {!isAnimate && <p>{topicQs[topic]}</p>}
                    {(isAnimate && isRight) && <p>You answered it correct!</p>}
                    {(isAnimate && isWrong) && <p>Take this! You're wrong!</p>}
                </div>
            </div>
            <div className="player-info">
                <div className="username">
                    {username}
                </div>
                <div className="user-health">
                    {healthRender}
                </div>
            </div>
            <div className="entity enemy">
                <img src={Shen} alt="Shen-pewpew" />
                <img src={Pewpew} alt="gfx" className={isRight ? "gfx gfx-active" : "gfx"}/>
            </div>
        </div>
        <div className="action-choices">
            <div className="choices-wrapper">
                {!isAnimate &&
                  <div className="label">
                      Choose the correct answer to defeat the enemy.
                  </div>
                }
                <div className="choices">
                    {(questions && !isAnimate) && questions[index].choices.map(choice => 
                        <button className="battle-btn fluid-btn" key={choice} onClick={() => checkAttack(choice)}>{choice}</button>)}
                </div>
                {isAnimate && 
                  <div className="battle-log">
                    {isRight && <h1>Correct Answer! You've defeated the enemy!</h1>}
                    {isWrong && <h1>Wrong Answer! You've received 1 damage.</h1>}
                  </div>
                }
            </div>
            <div className="items-wrapper">
                {showItems ?
                <BattleItemWindow toggleWindow={setShowItems}/>
                :
                <button className="teal battle-btn fluid-btn" onClick={() => setShowItems(true)}>Items</button>
                }
                
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default BattleWindow