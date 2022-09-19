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
  const [access, setAccess] = useState('')

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
        setUserProgress(getUserProgEC(user.id));
        setQuestion(periodicTable[randomNumberGenerator(userProgress, 117)]);
      }
    }
  }, [])

  useEffect (() => {
    
  }, [index])

  const checkAnswer = (answer) =>{
    if(answer === question.electron_configuration){
      pushProgEC(access, question.number, points)
      setUserProgress(getUserProgEC(access))
      setQuestion(periodicTable[index])
      prepToast('Correct', "success");
      setAnswer('');
    }
    else{
      prepToast('Incorrect!', "warning");
    }
  }

  const randomNumberGenerator = (userProgress, range) => {
    let flag = true;
    let rng = rng = Math.floor(Math.random() * range);

    while (flag) {
      if (userProgress.filter((num) => num === rng).length > 1){
        rng = Math.floor(Math.random() * range);
      } else {
        flag = false;
      }
    }

    return rng;
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
      {question && <ElementQuestion data={
        {
          atomicNum: question.number,
          elemSym: question.symbol,
          elemName: question.name,
          atomicMass: question.atomic_mass,
          bgColor: "rgba(58, 32, 32, 0.501)",
        }}
        
        sequence={2}/>}
      <input type='text'  name="answer" value={answer} onChange={(e) => onInputChange(e)}></input>
      <button onClick={() => checkAnswer(answer)}>Enter</button>
      <Toast message={toastMsg}
               timer={3000}
               toastType={toastState}
               showToast={setShowToast}
               toastState={showToast}/>

    </div>
  )
}

export default electronConfiguration

