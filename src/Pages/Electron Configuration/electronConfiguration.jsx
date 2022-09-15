import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { periodicTable } from '../../Data/PeriodicTableJSON'
import jwt_decode from "jwt-decode"

const electronConfiguration = () => {
  const navigate = useNavigate()
  const [question, setQuestion] = useState(periodicTable[Math.floor(Math.random() * 120)])
  const [userProgress, setUserProgress] = useState([])
  const [answer, setAnswer] = useState('')
  const [username, setUsername] = useState('')
  
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
      console.log('correct')
      setAnswer('')
      setQuestion(periodicTable[Math.floor(Math.random() * 120)])
      return
    }
    else{
      console.log('incorrect')
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

  const handler = localStorage.getItem('token')

  return (
    <div>
      <h1>{valid() ? question.name : ''}</h1>
      <input type='text'  name="answer" value={answer} onChange={(e) => onInputChange(e)}></input>
      <button onClick={() => checkAnswer(answer)}>Enter</button>
      <h1>{username}</h1>
        
    </div>
  )
}

export default electronConfiguration

