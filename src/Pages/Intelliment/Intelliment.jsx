import React, { useState, useEffect } from 'react';
import Choice from '../../Components/Choice';
import Toast from '../../Components/Toast';
import ElementQuestion from '../../Components/ElementQuestion';
import { sampleQuestions } from '../../Data/SampleQuestion';
import "./Intelliment.css";
import TotalScore from '../../Components/TotalScore';

const Intelliment = () => {
  //Miscellaneous States
  const [ timer, setTimer ] = useState(10);
  const [ step, setStep ] = useState(0);
  const [ score, setScore ] = useState(0);
  const [ numCorrect, setNumCorrect ] = useState(0);
  const [ multiplier, setMultiplier ] = useState(1);
  const [ combo, setCombo ] = useState(0);
  const [ maxCombo, setMaxCombo ] = useState(0);
  const [ nthQuestion, setNthQuestion ] = useState(0);
  const [ answered, setAnswered ] = useState(false);
  const [ finished, setFinished ] = useState(false);

  //Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastState, setToastState ] = useState("");
  const [ toastMsg, setToastMsg ] = useState("");

  //Question Related States
  const [ questions, setQuestions ] = useState(sampleQuestions);

  const phases = {
    0: "family",
    1: "elemName",
    2: "atomicNum",
    3: "atomicMass"
  }

  const guides = {
    0: "What is the group of the element?",
    1: "What is the name of the element?",
    2: "What is it's atomic number?",
    3: "What is it's atomic mass?"
  }

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
  return (
    <div id="intelliment">
      {!finished &&
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
                    return <Choice data={ans}
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