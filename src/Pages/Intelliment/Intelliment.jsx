import React, { useState, useEffect } from 'react';
import jwtDecode from "jwt-decode"

//Hooks
import pushIntelliment from '../../Hooks/pushIntelliment';

//Components
import Choice from '../../Components/Choice';
import Toast from '../../Components/Toast';
import ElementQuestion from '../../Components/ElementQuestion';
import TotalScore from '../../Components/TotalScore';

//Data
import { periodicTable } from '../../Data/PeriodicTableJSON';
import { sampleQuestions } from '../../Data/SampleQuestion.js';

//Styles
import "./Intelliment.css";

const Intelliment = () => {
  //Question States
  const [ timer, setTimer ] = useState(10);
  const [ step, setStep ] = useState(0);
  const [ nthQuestion, setNthQuestion ] = useState(0);
  const [ answered, setAnswered ] = useState(false);
  const [ finished, setFinished ] = useState(false);
  const [ pickedDifficulty, setPickedDifficulty ] = useState(false);
  const [ questions, setQuestions ] = useState(sampleQuestions);
  const [ access, setAccess ] = useState('')
  
  //Performance States
  const [ score, setScore ] = useState(0);
  const [ numCorrect, setNumCorrect ] = useState(0);
  const [ multiplier, setMultiplier ] = useState(1);
  const [ combo, setCombo ] = useState(0);
  const [ maxCombo, setMaxCombo ] = useState(0);

  //Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastState, setToastState ] = useState("");
  const [ toastMsg, setToastMsg ] = useState("");

  const phases = {
    0: "family",
    1: "elemName",
    2: "atomicNum",
    3: "atomicMass"
  }

  const familyBGs = {
    "diatomic nonmetal": "blue",
    "noble gas": "red"
  };

  const guides = {
    0: "What is the group of the element?",
    1: "What is the name of the element?",
    2: "What is its atomic number?",
    3: "What is its atomic mass?"
  }

  //get user credentials from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)
    setAccess(user.id)
  },[])

  useEffect(() => {
    if(finished){
      pushIntelliment(score, access)
    }
  },[finished])


  
  useEffect(() => {
    setQuestions(shuffleArray(generateQsDiff(pickedDifficulty)));
    // generateQsCategory("noble gas");
  }, [setPickedDifficulty])

  useEffect(() => {
    if (step === 4) {
      // Stops from going out of bounds
      if (questions.length > nthQuestion+1) {
        setNthQuestion(nthQuestion + 1);
      } else {
        setFinished(true);
      }

      // Resets the sequence
      setStep(0);
    }
  }, [step])

  useEffect(() => {
    if (timer === 0) {
      selectAns("");
      prepToast("Time's up!", "warning");
      setTimer(10)
    }

    if (answered) {
      setTimer(10);
    }
    
    setTimeout(() => setTimer(timer-1), 1000)
    
  }, [timer, answered])

  useEffect(() => {
    if (multiplier < 5) {
      if (combo % 4 === 0){
        setMultiplier((combo/4) + 1)
      }
    }
    
    if (maxCombo < combo) {
      setMaxCombo(combo);
    }
  }, [combo])


  //Function to format toast message
  const prepToast = (message, toastState) => {
    setToastState(toastState);
    setToastMsg(message);
    setShowToast(true);
  }

  const setDifficulty = (difficulty) => {
    setPickedDifficulty(true);
    setQuestions(shuffleArray(generateQsDiff(difficulty)));
  }

  //Verify Answer
  const selectAns = (choice) => {
    if (!answered) {
      let final = choice === questions[nthQuestion][phases[step]] ? true : false;
      if (final) {
        prepToast("Correct!", "success");
        setCombo(combo + 1);
        setNumCorrect(numCorrect + 1);
        setScore(score + (50 * multiplier));
      } else {
        setCombo(0);
        setMultiplier(1);
        prepToast("Wrong!", "warning");
      }
      setAnswered(true);
      setTimeout(() => {setAnswered(false); setStep(step + 1);}, 3000);
    }
  }

  //Generate Questions
  const generateQsDiff = (difficulty) => {
    let totalQs = [];
    for(let i=0; i<difficulty; i++) {
      totalQs.push({
        "atomicNum": periodicTable[i].number,
        "elemSym": periodicTable[i].symbol,
        "elemName": periodicTable[i].name,
        "atomicMass": periodicTable[i].atomic_mass,
        "family": periodicTable[i].category,
        "bgColor": familyBGs[periodicTable[i].category],
        "choices": [

        ]
      });
    }

    totalQs.map(el => el["choices"] = generateChoices(totalQs, el));
    return totalQs;
  };

  const generateQsCategory = (selected) => {
    let totalQs = [];
    periodicTable.filter((el) => selected === el.category).map((el) => {
      totalQs.push({
        "atomicNum": el.number,
        "elemSym": el.symbol,
        "elemName": el.name,
        "atomicMass": el.atomic_mass,
        "family": el.category,
        "bgColor": familyBGs[el.category],
        "choices": [
          
        ]
      });
      
      return true;
    })

    totalQs.map(el => el["choices"] = generateChoices(totalQs, el));
    return totalQs;
  };

  //Generate choices
  const generateChoices = (array, currElem) => {
    let choices = [], tempChoices = [];
    let temp;

    for(let x = 0; x < 4; x++){
      tempChoices.push(currElem[phases[x]]);
      for(let y = 0; y < 3; ){
        temp = array[Math.floor(Math.random() * array.length)][phases[x]];
        if (!verifyDupe(temp, tempChoices)) {
          tempChoices.push(temp)
          y++;
        }
      }
      choices.push(shuffleArray(tempChoices));
      tempChoices = [];
    }

    return choices;
  }

  //Verify if the choices will be duplicated
  const verifyDupe = (currData, finalData) => {
    console.log ()
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

  return (
    <div id="intelliment">
      {!pickedDifficulty &&
        <div className="difficulty-chooser">
        <h2>Choose a difficulty:</h2>
        <button onClick={() => setDifficulty(30)}>Easy</button>
        <button onClick={() => setDifficulty(60)}>Medium</button>
        <button onClick={() => setDifficulty(90)}>Hard</button>
        <button onClick={() => setDifficulty(118)}>Hardcore</button>
      </div>}
      
      {(!finished && pickedDifficulty) &&
      <div className="intellimain">
        <div className="header">
          <div className="total-questions">Total Elements Encountered: {nthQuestion+1}/{questions.length}</div>
          <div className="multiplier">
            <div className="label">
              Multiplier
            </div>
            <div className="multi">
              {`x${multiplier}`} 
            </div>
          </div>
          <div className="score">Score: {score}</div>
        </div>
        <div className="question-wrapper">
            <ElementQuestion data={questions[nthQuestion]} sequence={step-1}/>
            <div className="question">
                <p className="question">{guides[step]}</p>
            </div>
            <div className="choices-wrapper">
                {questions[nthQuestion].choices[step] && questions[nthQuestion].choices[step].map((ans) => {
                    return <Choice 
                                   key={ans}
                                   data={ans}
                                   selectedAnswer={selectAns}
                                   answered={answered}
                                   category={ans === questions[nthQuestion][phases[step]] ? "correct" : "wrong"}/>
                })}
            </div>
        </div>

        <div className="timer">
            <div className="text-timer">
                {timer}s
            </div>
            <div className="bar-timer" style={{width: `${10*timer}%`}}>
                
            </div>
        </div>

        <Toast message={toastMsg}
               timer={3000}
               toastType={toastState}
               showToast={setShowToast}
               toastState={showToast}/>
      </div>}
      {finished && <TotalScore totalQuestions={questions.length}
                               totalCorrect={numCorrect}
                               totalScore={score}
                               highestCombo={maxCombo}
                               highestMultiplier={multiplier} />}
    </div>
  )
}

export default Intelliment