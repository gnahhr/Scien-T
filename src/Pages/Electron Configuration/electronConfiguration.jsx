import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { periodicTable } from '../../Data/PeriodicTableJSON';
import "./electronConfiguration.css";
import jwt_decode from "jwt-decode";
import ElementQuestion from "../../Components/ElementQuestion.jsx";
import Toast from '../../Components/Toast';
import pushProgEC from '../../Hooks/pushProgEC.js'
import getUserProgEC from '../../Hooks/getUserProgEC.js'

//Perodic Table
//Electron Configuration Chart

const electronConfiguration = () => {
  const navigate = useNavigate();
  const [index, setIndex] = useState();
  const [question, setQuestion] = useState();
  const [userProgress, setUserProgress] = useState([]);
  const [answer, setAnswer] = useState('');
  const [username, setUsername] = useState('');
  const [points, setPoints] = useState(5);
  const [access, setAccess] = useState('');
  const [finished, setFinished] = useState(false);
  const [solved, setSolved] = useState()

  //Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastState, setToastState ] = useState("");
  const [ toastMsg, setToastMsg ] = useState("");
  

  useEffect (() => {
    const token = localStorage.getItem('token')
    if (token){
      const user = jwt_decode(token)
      if(!user){
        localStorage.clear()
        navigate('/login')
      }
      else{
        setAccess(user.id);
        setUsername(user.email);

        (async () => {
          const progress = await getUserProgEC(user.id);
          setUserProgress(progress);
        })()
        // console.log(userProgress)
        // checkProgress(userProgress,5)
        
      }
    }
  }, [])

  useEffect (() => {
    setSolved(userProgress.length)
    if(!checkProgress(userProgress, 119)){
      setIndex(randomNumberGenerator(userProgress, 119));
    } else {
      setFinished(true);
    }

  }, [userProgress])

  useEffect (() => {
    setQuestion(periodicTable[index]);
  }, [index])



  const checkAnswer = (answer) =>{
    if(answer === question.electron_configuration){
      pushProgEC(access, question.number, points)

      setUserProgress([...userProgress,question.number])

      prepToast('Correct', "success");
      setAnswer('');
    }
    else{
      prepToast('Incorrect!', "warning");
    }
  }

  const randomNumberGenerator = (userProgress, range) => {
    let flag = true;
    let rng = Math.floor(Math.random() * range);

    while (flag) {
      if (userProgress.filter((num) => num === rng + 1).length > 0){
        rng = Math.floor(Math.random() * range);
      } else {
        flag = false;
      }
    }
    return rng;
  }

  const checkProgress = (userProgress, max) => {
    return userProgress.length === max ? true : false;
  }

  const setText = {
    "answer": setAnswer,
  }

  const onInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setText[name](value);
  }

  const prepToast = (message, toastState) => {
    setToastState(toastState);
    setToastMsg(message);
    setShowToast(true);
  }


  return (
    <div className="electron-config">
      <h1>{solved} out of 119</h1>
      {finished ? <h1>finished na</h1> : question && <><ElementQuestion data={
        {
          atomicNum: question.number,
          elemSym: question.symbol,
          elemName: question.name,
          atomicMass: question.atomic_mass,
          family: question.category,
        }}
        
        sequence={2}/>
      <input type='text'  name="answer" value={answer} onChange={(e) => onInputChange(e)}></input>
      <button className="cta" onClick={() => checkAnswer(answer)}>Enter</button>
      <h1>{finished}</h1>
      <Toast message={toastMsg}
               timer={3000}
               toastType={toastState}
               showToast={setShowToast}
               toastState={showToast}/></>}

    </div>
  )
}

export default electronConfiguration

