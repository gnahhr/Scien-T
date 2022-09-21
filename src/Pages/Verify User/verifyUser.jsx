import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import jwt_decode from "jwt-decode"

import './verifyUser.css'


const verifyUser = (event) => {
  const navigate = useNavigate()
  const [OTP, setOTP] = useState(new Array(4).fill(''));
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

    if(data.status === 'ok' || data.status === 'user already verified'){
      localStorage.clear()
      navigate('/login')
      console.log('ok')
    }
    else{
      console.log('not ok')
    }
  }
 

  useEffect (() => {
    const token = localStorage.getItem('verify')
    if (token){
        const user = jwt_decode(token)
        setAccess(user.id)  
    }
    else{
      navigate('/login')
    }
  },[])

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOTP([...OTP.map((d, idx) => (idx === index ? element.value : d))]);
    if (element.nextSibling) {
        element.nextSibling.focus();
    }
};

  

  return (
    <div className="container">
        <h2>Enter the OTP sent to you to verify your email</h2>
        <div className="otp-container">
        {OTP.map((data, index) => {
          return (
            <input
                className="otp-field"
                type="text"
                name="OTP"
                maxLength="1"
                key={index}
                value={data}
                onChange={e => handleChange(e.target, index)}
                onFocus={e => e.target.select()}
            />
          )
          })}
          </div> 
        
          <button className="btn" onClick={e => setOTP([...OTP.map(v => "")])} >Clear</button>
          <button className="btn" onClick={() => verify(OTP)}>Verify OTP</button>
        
    </div>
  )
}

export default verifyUser