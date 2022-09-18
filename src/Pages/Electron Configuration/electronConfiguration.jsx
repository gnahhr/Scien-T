import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { periodicTable } from '../../Data/PeriodicTableJSON';
import "./electronConfiguration.css";
import jwt_decode from "jwt-decode";
import ElementQuestion from "../../Components/ElementQuestion.jsx";
import Toast from '../../Components/Toast';


//Perodic Table
//Electron Configuration Chart

const electronConfiguration = () => {
  const navigate = useNavigate();
  const [question, setQuestion] = useState(periodicTable[Math.floor(Math.random() * 120)]);
  const [userProgress, setUserProgress] = useState([]);
  const [answer, setAnswer] = useState('');
  const [username, setUsername] = useState('');

  //Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastState, setToastState ] = useState("");
  const [ toastMsg, setToastMsg ] = useState("");
  
  // async function electronConfig(answer){                             
  //   const username = 'josh'
  //   const response = await fetch('/api/electronConfiguration',{              
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       username,element
  //     })
  //   })
  // }

  // async function populateProgress(){
  //   const response = await fetch('/api/electronConfiguration', {
  //     headers: {
  //       'x-access-token': localStorage.getItem('token')
  //     }
  //   })

  //   const data = await response.json()

  // }

  // for outputting/accessing data stored in localStorage that was sent from the backend- kagagawan ni juicewah
  useEffect (() => {
    const token = localStorage.getItem('token')
    if (token){
      const user = jwt_decode(token)
      if(!user){
        localStorage.clear()
        navigate('/login')
      }
      else{
        // populateProgess()
        setUsername(user.email)
      }
    }
  })


  const checkAnswer = (answer) =>{
    if(answer === question.electron_configuration){
      setUserProgress([userProgress => [...userProgress, question.number]])
      prepToast('Correct', "success");
      setAnswer('')
      setQuestion(periodicTable[Math.floor(Math.random() * 120)])
      return
    }
    else{
      prepToast('Incorrect!', "warning");

    }
  }

  const valid = () =>{
    if(!userProgress.includes(question.number))
      return true
      
    else{
      setQuestion(periodicTable[Math.floor(Math.random() * 120)])
    }
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

  const handler = localStorage.getItem('token')

  return (
    <div className="electron-config">
      <ElementQuestion data={
        {
          atomicNum: question.number,
          elemSym: question.symbol,
          elemName: question.name,
          atomicMass: question.atomic_mass,
          bgColor: "rgba(58, 32, 32, 0.501)",
        }}
        
        sequence={2}/>
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

