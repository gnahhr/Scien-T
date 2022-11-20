import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import jwt_decode from "jwt-decode"

import './verifyUser.css'

import fingerprint from "../../Assets/Images/fingerprint.png"


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
      navigate('/')
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
    <>
      <div className="container">
        <div className="fingerprint"><img src={fingerprint} width={200}/></div>
        <h1 className="header-text"> OTP Verification </h1>
          <h2>Enter the OTP code sent to your email</h2>
          <div className="wrapper">
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
              <div className='btn-wrapper'>
                <button className="fluid-btn" onClick={e => setOTP([...OTP.map(v => "")])} >Clear</button>
                <button className="fluid-btn" onClick={() => verify(OTP)}>Verify OTP</button>
              </div>
          </div>
      </div>
    </>
  )
}

export default verifyUser