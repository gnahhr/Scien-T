import React, { useState, useEffect } from 'react';
import Choice from '../../Components/Choice';
import ElementQuestion from '../../Components/ElementQuestion';
import "./Intelliment.css";

const Intelliment = () => {
  const [ timer, setTimer ] = useState(100);
  const [ step, setStep ] = useState(0);
  const [ questions, setQuestions ] = useState([
    {
        atomicNum: 1,
        elemSym: "H",
        elemName: "Hydrogen",
        atomicMass: 1.01,
        bgColor: "blue"
    }, {
        atomicNum: 2,
        elemSym: "He",
        elemName: "Helium",
        atomicMass: 2,
        bgColor: "black"
    }
  ]);
  const [ corAns, setCorAns] = useState(["Hydrogen", "Ijbol"])
  const [ answers, setAnswers ] = useState([["Hydrogen", "Hi", "Dro", "Gen"], ["Something", "IJBOL", "JABOL", "SADDLE"]]);
  const [ nthQuestion, setNthQuestion ] = useState(0);

  useEffect(() => {
    if (step === 4) {
        setNthQuestion(nthQuestion + 1);
        setStep(0);
    }
  }, [step])
  

  const selectAns = (choice) => {
    let final = choice === corAns[nthQuestion] ? true : false;
    if (final) {
        setStep(step + 1);
    } else {
        setNthQuestion(nthQuestion); 
    }
    console.log(final);
  }
  return (
    <div id="intelliment">
        <div className="total-questions">Total Questions: {nthQuestion+1}/{answers.length}</div>

        <div className="question-wrapper">
            <ElementQuestion data={questions[nthQuestion]} sequence={step}/>
            <div className="question">
                <p className="question">Question {nthQuestion+1}</p>
            </div>
            <div className="choices-wrapper">
                {answers && answers[nthQuestion].map((ans) => {
                    return <Choice data={ans} selectedAnswer={selectAns}/>
                })}
            </div>
        </div>

        <div className="timer">
            <div className="text-timer">
                10s
            </div>
            <div className="bar-timer" style={{}}>
                
            </div>
        </div>
    </div>
  )
}

export default Intelliment