import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import jwt_decode from "jwt-decode"

const verifyUser = (event) => {
  const navigate = useNavigate()
  const [OTP, setOTP] = useState('')
  const [access, setAccess] = useState('')
  async function verify() {

    const response = await fetch ('/api/verify', {
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        OTP, access
      })
    })
    const data = await response.json()

    if(data.status === 'ok'){
      localStorage.clear()
      navigate('/login')
      console.log('ok')
    }
    else{
      console.log('not ok')
    }
  }
  const setText = {
    "OTP": setOTP,
  }

  useEffect (() => {
    const token = localStorage.getItem('token')
    if (token){
      const user = jwt_decode(token)
      if(!user){
        localStorage.clear()
        useNavigate('/login')
      }
      else{
        setAccess(user.id)
      }
    }
  })

  const onInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setText[name](value);
  }

  return (
    <div>
      <h1>Enter OTP</h1>
      <input type='number'  name="OTP" value={OTP} onChange={(e) => onInputChange(e)}></input>
      <button onClick={() => verify(OTP)}>Enter</button>
    </div>
  )
}

export default verifyUser