import React, { useState, useEffect } from 'react';
import jwtDecode from "jwt-decode"

//Hooks
import pushIntelliment from '../../Hooks/pushIntelliment';

//Components
import Choice from '../../Components/Choice';
import ElementQuestion from '../../Components/ElementQuestion';
import TotalScore from '../../Components/TotalScore';
import AnswerModal from '../../Components/AnswerModal';

//Data
import { periodicTable } from '../../Data/PeriodicTableJSON';
import { sampleQuestions } from '../../Data/SampleQuestion.js';

//Styles
import ElemColors from '../../Data/ElemColors.js'
import "./Intelliment.css";

const Intelliment = ({mode}) => {
  //Push Progress
  const [ access, setAccess ] = useState('')
  const [ username, setUsername] = useState('')
  const [ category, setCategory] = useState(0)
  
  //Question States
  const [ timer, setTimer ] = useState(10);
  const [ step, setStep ] = useState(0);
  const [ nthQuestion, setNthQuestion ] = useState(0);
  const [ answered, setAnswered ] = useState(false);
  const [ finished, setFinished ] = useState(false);
  const [ pickedDifficulty, setPickedDifficulty ] = useState(false);
  const [ questions, setQuestions ] = useState(sampleQuestions);
  const [ clickedAns, setClickedAns ] = useState("");
  
  //Performance States
  const [ score, setScore ] = useState(0);
  const [ numCorrect, setNumCorrect ] = useState(0);
  const [ multiplier, setMultiplier ] = useState(1);
  const [ combo, setCombo ] = useState(0);
  const [ maxCombo, setMaxCombo ] = useState(0);
  const [ highestMult, setHighestMult ] = useState(0);
  const [ corCategory, setCorCategory ] = useState(0);
  const [ corNumber, setCorNumber ] = useState(0);
  const [ corName, setCorName ] = useState(0);
  const [ corMass, setCorMass ] = useState(0);

  //Modal States
  const [ showModal, setShowModal ] = useState(false);
  const [ modalResult, setModalResult ] = useState("");
  const [ scoreModal, setScoreModal ] = useState(0);

  //Variables
  const { familyBGs } = ElemColors;

  const phases = {
    0: "family",
    1: "elemName",
    2: "atomicNum",
    3: "atomicMass"
  }

  const guides = {
    0: "What is the group of the element?",
    1: "What is the name of the element?",
    2: "What is its atomic number?",
    3: "What is its atomic mass?"
  }

  const corTally = {
    0: setCorCategory,
    1: setCorName,
    2: setCorNumber,
    3: setCorMass
  }

  const corCounter = {
    0: corCategory,
    1: corName,
    2: corNumber,
    3: corMass
  }

  //get user credentials from localStorage
  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)
    setAccess(user.id)
    setUsername(user.username)
  },[])

  //End of Game Trigger
  useEffect(() => {
    if (mode === "game"){
      if(finished){
        const corAve = (corCategory+corName+corNumber+corMass)/4;
        pushIntelliment(score, access, category, corAve)
      }
    }
  },[finished])

  //SetQuestions
  useEffect(() => {
    if (mode === "game"){
      setQuestions(shuffleArray(generateQsDiff(category)));
    } else if (mode === "learn"){
      setQuestions(shuffleArray(generateQsCategory(category)));
    }
  }, [pickedDifficulty])

  //Next Question
  useEffect(() => {
    if (mode === "game"){
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
    } else if (mode === "learn"){
      if (step === 4) {
        // Stops from going out of bounds
        if (questions.length > nthQuestion+1) {
          setNthQuestion(nthQuestion + 1);
        } else {
          setFinished(true);
        }
        // Resets the sequence
        setStep(1);
      }
    }
  }, [step])

  useEffect(() => {
    if(nthQuestion === questions.length) {
      setFinished(true);
    }
  }, [nthQuestion])

  //Combo
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

  //Set Multiplier
  useEffect(() => {
    if (multiplier > highestMult) {
      setHighestMult(multiplier);
    }

  }, [multiplier])


  //Timer Use Effect
  useEffect(() => {
    if (answered) {
      setTimer(10);
    }

    if (pickedDifficulty && !answered){
      if (timer === 0) {
        selectAns("");
        // prepToast("wrong", "warning");
        prepToast("wrong", 0);
        setTimer(10)
      }

      setTimeout(() => setTimer(timer-1), 1000)
    }
    
  }, [timer, answered, pickedDifficulty])


  //Function to format toast message
  const prepToast = (result, points) => {
    setModalResult(result);
    setScoreModal(points);
    setShowModal(true);
  }

  const setDifficulty = (difficulty) => {
    if (mode === "game") {
      setCategory(difficulty)
      setQuestions(shuffleArray(generateQsDiff(difficulty)));
      setPickedDifficulty(true);
    } else if (mode === "learn"){
      setCategory(difficulty);
      setStep(1);
      setQuestions(shuffleArray(generateQsCategory(difficulty)));
      setPickedDifficulty(true);
    }

    setTimer(10);
  }

  //Play Again - Reset Stats
  const playAgain = () => {
    setNthQuestion(0);
    setScore(0);
    setNumCorrect(0);
    setMultiplier(1);
    setCombo(0);
    setMaxCombo(0);
    setHighestMult(0);
    setCorCategory(0);
    setCorNumber(0);
    setCorName(0);
    setCorMass(0);
    setFinished(false);
    setTimer(10);
    setQuestions(shuffleArray(generateQsDiff(category)));
  }

  //Verify Answer
  const selectAns = (choice) => {
    if (!answered) {
      let final = choice === questions[nthQuestion][phases[step]] ? true : false;
      setClickedAns(choice);
      if (final) {
        corTally[step](corCounter[step] + 1);
        prepToast("correct", 50 * multiplier);
        setCombo(combo + 1);
        setNumCorrect(numCorrect + 1);
        setScore(score + (50 * multiplier));
      } else {
        setCombo(0);
        setMultiplier(1);
        prepToast("wrong", 0);
      }
      setAnswered(true);
      setTimeout(() => {setAnswered(false); setStep(step + 1);}, 3000);
    }
  }

  //Generate Questions as per Difficulty
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

  //Generate Questions as per Category
  const generateQsCategory = (selected) => {
    let totalQs = [];
    periodicTable.filter((el) => {
      if (selected === el.category) {
        return el;
      }
    }).map((el) => {
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
      tempChoices.push(currElem[phases[x]])
      if (mode === "learn" && x === 0) {
        for(let y = 0; y < 3; y++){
          tempChoices.push(currElem[phases[x]])
        }
      } else {
        for(let y = 0; y < 3; ){
          temp = array[Math.floor(Math.random() * array.length)][phases[x]];
          if (!verifyDupe(temp, tempChoices)) {
            tempChoices.push(temp)
            y++;
          }
        }
      }
      choices.push(shuffleArray(tempChoices));
      tempChoices = [];
    }

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

  return (
      <>
        <div className="main-header">
          <h1>Assessment</h1>
        </div>
        <div id="intelliment">
          {(!pickedDifficulty && mode === "game") &&
            <div className="difficulty-chooser">
              <h2>Choose a difficulty:</h2>
              <button onClick={() => setDifficulty(5)}>Easy</button>
              <button onClick={() => setDifficulty(20)}>Medium</button>
              <button onClick={() => setDifficulty(40)}>Hard</button>
              <button onClick={() => setDifficulty(60)}>Hardcore</button>
            </div>}

          {(!pickedDifficulty && mode === "learn") &&
            <div className="difficulty-chooser">
              <h2>Choose a category</h2>
              <button onClick={() => setDifficulty("diatomic nonmetal")}>Diatomic Nonmetals</button>
              <button onClick={() => setDifficulty("polyatomic nonmetal")}>Polyatomic Nonmetals</button>
              <button onClick={() => setDifficulty("noble gas")}>Noble Gases</button>
              <button onClick={() => setDifficulty("alkali metal")}>Alkali Metals</button>
              <button onClick={() => setDifficulty("alkaline earth metal")}>Alkaline Earth Metals</button>
              <button onClick={() => setDifficulty("transition metal")}>Transition Metals</button>
              <button onClick={() => setDifficulty("post-transition metal")}>Post-Transition Metals</button>
              <button onClick={() => setDifficulty("metalloid")}>Metalloid</button>
              <button onClick={() => setDifficulty("actinide")}>Actinide</button>
              <button onClick={() => setDifficulty("lanthanide")}>Lanthanide</button>
            </div>}
          
          {(!finished && pickedDifficulty) &&
          <div className="intellimain">
            <div className="header">
              <div className="left-header">
                <div className="total-questions">Elements Encountered: {nthQuestion+1}/{questions.length}</div>
                <div className="score">Score: {score}</div>
              </div>
              <div className="multiplier">
                <div className="label">
                  Multiplier
                </div>
                <div className="multi">
                  {`x${multiplier}`} 
                </div>
              </div>
              <div className="settings">
                <div className="exit icon" onClick={() => setPickedDifficulty(false)}>EXIT</div>
                <div className="reset icon" onClick={() => playAgain()}>RESET</div>
              </div>
            </div>
            <div className="question-wrapper">
                <ElementQuestion data={questions[nthQuestion]} sequence={step-1}/>
                <p className="question">{guides[step]}</p>
                <div className="choices-wrapper">
                    {questions[nthQuestion].choices[step] && questions[nthQuestion].choices[step].map((ans) => {
                        return <Choice 
                                      key={ans}
                                      data={ans}
                                      selectedAnswer={selectAns}
                                      answered={answered}
                                      category={ans === questions[nthQuestion][phases[step]] ? "correct" : "wrong"}
                                      selHighlight={ans === clickedAns ? "answered" : ""}
                                />
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
            
            {/* Modal for Correct Answers */}
            {showModal &&
              <AnswerModal results={modalResult} points={scoreModal} showModal={setShowModal} modalState={showModal}/>
            }
          </div>}
          {finished && <TotalScore totalQuestions={questions.length}
                                  totalCorrect={numCorrect}
                                  totalScore={score}
                                  highestCombo={maxCombo}
                                  highestMultiplier={highestMult}
                                  pickedDifficulty={setPickedDifficulty}
                                  playAgain={playAgain} />}
        </div>
      </>
  )
}

export default Intelliment