//TO DO:
//-SFX

import React, { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';

//Data
import { periodicTable } from '../Data/PeriodicTableJSON';

//Components
import BattleItemWindow from './BattleItemWindow';
import MuteButton from './MuteButton';

//Images
import Enemy1 from '../Assets/Images/Enemy1.png';
import Enemy2 from '../Assets/Images/Enemy2.png';
import Enemy1Hit from '../Assets/Images/Enemy1-hit.png';
import Enemy2Hit from '../Assets/Images/Enemy2-hit.png';
import Player1 from '../Assets/Images/chuu-pewpew.png';
import Pewpew from '../Assets/Images/pewpew.png';
import RedHeart from '../Assets/Images/red-heart.svg';
import WhiteHeart from '../Assets/Images/white-heart.svg';
import Star from '../Assets/Images/battle-star.svg';

//Hooks
import getCharacter from '../Hooks/getCharacter'
import getCharacterHit from '../Hooks/getCharacterHit';
import useAudio from '../Hooks/useAudio';

//Audio files
//BGM
import Bgm from '../Assets/Audio/TestBattle/testBattle-bgm.mp3';
//Misc SFX
import SelectSFX from '../Assets/Audio/TestBattle/select.mp3';
//Item SFX
import HealSFX from '../Assets/Audio/TestBattle/healPots.mp3';
import HalfSFX from '../Assets/Audio/TestBattle/halfPots.mp3';
import SkipSFX from '../Assets/Audio/TestBattle/skipPots.mp3';
//Battle SFX
import SpawnE from '../Assets/Audio/TestBattle/enemyUp.mp3';
import DefeatE from '../Assets/Audio/TestBattle/enemyDown.mp3';
import HitEnemy from '../Assets/Audio/TestBattle/hitEnemy.mp3';
import HitChar from '../Assets/Audio/TestBattle/hitChara.mp3';


const BattleWindow = ({topic, stage, nextPhase, resultState, battleResult, setDefeatInfo, setPrizeCoins, setShowInstruction}) => {
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
  const [ battleLog, setBattleLog ] = useState("");

  //Character Model States
  const [ model, setModel ] = useState();
  const [ modelHit, setModelHit ] = useState();

  //Health State Renderer
  const [ healthRender, setHealthRender ] = useState(<>
    <img src={RedHeart} alt="red-heart" />
    <img src={RedHeart} alt="red-heart" />
    <img src={RedHeart} alt="red-heart" />
  </>);

  //Animation States
  const [ isWrong, setIsWrong ] = useState(false);
  const [ isRight, setIsRight ] = useState(false);
  const [ isDefeated, setIsDefeated ] = useState(false);
  const [ isAnimate, setIsAnimate ] = useState(false);
  const [ itemUsed, setItemUsed ] = useState(false);

  //Sound References
  const testBattleBGM = useAudio(Bgm, {volume: 0.5, playbackRate: 1, loop: true});
  const selectSFX = useAudio(SelectSFX, {volume: 0.8, playbackRate: 1.75})
  const healSFX = useAudio(HealSFX, {volume: 0.8})
  const halfSFX = useAudio(HalfSFX, {volume: 0.8})
  const skipSFX = useAudio(SkipSFX, {volume: 0.8})
  const spawnE = useAudio(SpawnE, {volume: 0.8})
  const defeatE = useAudio(DefeatE, {volume: 0.8})
  const hitEnemy = useAudio(HitEnemy, {volume: 0.8})
  const hitChar = useAudio(HitChar, {volume: 0.8})

  const audioArray = [testBattleBGM, selectSFX, healSFX, halfSFX, skipSFX, spawnE, hitEnemy, hitChar];
  
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

  //ModelsArray
  const modelsArr = {
    0: Enemy1,
    1: Enemy2,
  }

  //ModelsHitArray
  const modelsHitArr = {
    0: Enemy1Hit,
    1: Enemy2Hit,
  }

  //Initial Mount
  useEffect(() => {
    //Get User Info
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)
    setAccess(user.id);
    setUsername(user.username);

    //Set Character Models
    (async() => {
      const model =  await getCharacter(user.id, user.gender);
      setModel(model);
    })(); 

    (async() => {
        const model =  await getCharacterHit(user.id, user.gender);
        setModelHit(model);
    })();

    //Play BGM
    testBattleBGM.play();
  },[])

  //Pause BGM on unmount
  useEffect(() => {
    return () => {
      testBattleBGM.pause();
    }
  }, [])

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
      
      if (stage !== "endless") {
        setDefeatInfo({
          symbol: questions[index].elemSym,
          topic: topicCats[[topic]],
          answer: questions[index].elemAnswer
        });
        resultState("defeat");
        nextPhase(3);
      } else {
        victoryBattle();
        setPrizeCoins(index+1);
      }
    }
  }, [health])

  useEffect(() => {
    if (conRight === 2){
      setMultiplier(2);
    } else if (conRight === 4) {
      setMultiplier(3);
    }
  }, [conRight])

  useEffect(() => {
    if (isRight) hitEnemy.play();
    setBattleLog("Correct Answer! You've defeated the enemy!");
  }, [isRight])

  useEffect(() => {
    if (isWrong) hitChar.play();
    setBattleLog("Wrong Answer! You've received 1 damage.");
  }, [isWrong])

  //Generate Questions as per Category
  const generateQsTopic = (topic, stage) => {
    let totalQs = [];
    if (stage !== "endless") {
      for(let i=stage-10; i<stage; i++) {
        const modelRand = Math.floor(Math.random() * 2);
        let topics = {
            "elemName": periodicTable[i].name,
            "atomicMass": periodicTable[i].atomic_mass,
            "atomicNum": periodicTable[i].number,
            "category": periodicTable[i].category,
        };

        totalQs.push({
          "elemSym": periodicTable[i].symbol,
          "elemAnswer": topics[topic],
          "model": modelsArr[modelRand],
          "modelHit": modelsHitArr[modelRand],
          "choices": [

          ]
        });
      }
    } else {
      for(let i=0; i<119; i++) {
        const modelRand = Math.floor(Math.random() * 2);

        let topics = {
            "elemName": periodicTable[i].name,
            "atomicMass": periodicTable[i].atomic_mass,
            "atomicNum": periodicTable[i].number,
            "category": periodicTable[i].category,
        };

        totalQs.push({
          "elemSym": periodicTable[i].symbol,
          "elemAnswer": topics[topic],
          "model": modelsArr[modelRand],
          "modelHit": modelsHitArr[modelRand],
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

  //Half array
  const trimArray = (currArray) => {
    let currentIndex = 4,  randomIndex;
    let flag = true;
    let trimmedArray = [questions[index].elemAnswer]

    while (flag) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      if (currArray[randomIndex] !== questions[index].elemAnswer) {
        trimmedArray.push(currArray[randomIndex]);
        flag = false;
      }
    }

    return trimmedArray;
  };
  
  //Check Attack
  const checkAttack = (selected) => {
    selectSFX.play();
    let confirm = questions[index].elemAnswer === selected ? true : false;
    if (confirm) {
      animateTimeout(setIsRight, true);
      setScore(() => score + (50 * multiplier));
      setConRight(() => conRight + 1);
    } else {
      animateTimeout(setIsWrong);
      setHealth((health) => health > 0 ? health - 1 : health);
      setConRight(0);
    }
  }

  const nextEnemy = (stage) => {
    const max = stage === "endless" ? 119 : 10;
    const prize = stage === "endless" ? index + 1 : 10;
    if (index + 1 === max){
      victoryBattle();
      setPrizeCoins(prize);
    } else {
      spawnE.play();
      setIndex((index) => index + 1);
    }
  }

  const animateTimeout = (entityGot, proceed) => {
    entityGot(true);
    setIsAnimate(true);

    if (proceed) {
      setTimeout(() => {
        setIsDefeated(true);
      }, 1000);
    }

    setTimeout(() => {
      entityGot(false);
      setIsDefeated(false);
      setIsAnimate(false);

      if (proceed) {
        nextEnemy(stage);
      }

    }, 2500);
  }

  //Set battle to victory
  const victoryBattle = () => {
    battleResult({
      totalEnemies: index+1,
      score: score,
      highMulti: highestMulti,
    })
    resultState('victory')
    nextPhase(3);
  }

  //Item Functions
  //Health Potion Function
  const restoreHealth = () => {
    setBattleLog("Health was restored!");
    setHealth(3);
  }

  //50-50 Question
  const halfQs = () => {
    setBattleLog("Your choices was halved!");
    setQuestions(questions.map((question) => {
      if (questions[index].elemSym === question.elemSym) {
        return {
          ...question,
          choices: trimArray(questions[index].choices)
        }
      } else {
        return question;
      }
    })) 
  }

  //Skip question
  const skipQ = () => {
    setBattleLog("You skipped an enemy!");
    nextEnemy(stage);
    setMultiplier(1);
  }

  //useItem
  const useItem = (item) => {
    setItemUsed(true);

    if (item === 1) {
      healSFX.play()
      restoreHealth();
    } else if (item === 2) {
      halfSFX.play();
      halfQs();
    } else if (item === 3) {
      skipSFX.play();
      skipQ();
    }

    setInterval(() => {
      setItemUsed(false);
    }, 1500)
  }

  return (
    <>
    <div className="testBattle-wrapper"> 
    <div className="game-header">
      <div className="score">
        <img src={Star} alt="Star" />
        <div className="score-text">
          Score: {score}
        </div>
      </div>
      <div className="settings-wrapper">
        <div className="icon" onClick={() => setShowInstruction(true)}>
          HELP
        </div>
        <MuteButton audio={audioArray} />
      </div>
    </div>
    
    <div className="battle-window">
        <div className="players-wrapper">
            <div className="entity player">
                <img src={isWrong ? modelHit : model} alt="model" className={isWrong ? "gfx-active" : ""}/>
                <img src={Pewpew} alt="gfx" className={isWrong ? "gfx gfx-active" : "gfx"}/>
            </div>
            <div className={`question-bubble ${isDefeated && "defeat"}`}>
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
            <div className={`entity enemy ${isDefeated && "defeat"}`}>
                { !isRight ? 
                  <img src={questions && questions[index].model} alt="Enemy" /> : 
                  <img src={questions && questions[index].modelHit} alt="Enemy" className={`${isRight && !isDefeated ? "gfx-active" : ""} ${isDefeated ? " defeat" : ""}`} />
                }
                <img src={Pewpew} alt="gfx" className={isRight && !isDefeated ? "gfx gfx-active" : "gfx"}/>
            </div>
        </div>
        <div className={`action-choices ${stage === "endless" ? "" : "normal-actions"}`}>
            <div className="choices-wrapper">
                {!isAnimate && !itemUsed &&
                  <div className="label">
                      Choose the correct answer to defeat the enemy.
                  </div>
                }
                <div className="choices">
                    {(questions && !isAnimate && !itemUsed) && questions[index].choices.map(choice => 
                        <button className="battle-btn fluid-btn" key={choice} onClick={() => checkAttack(choice)}>{choice}</button>)}
                </div>
                {(isAnimate || itemUsed) && 
                  <div className="battle-log">
                    <h1>{battleLog}</h1>
                  </div>
                }
            </div>
            <div className="items-wrapper">
                <BattleItemWindow uItem={useItem} sfxClick={selectSFX}/>    
            </div>
        </div>
    </div>
    </div>
    </>
  )
}

export default BattleWindow