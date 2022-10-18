import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import './forgotPassword.css';

const forgotPassword = () => {
  const navigate = useNavigate()
  const [ access, setAccess ] = useState('')
  const [ password, setPassword ] = useState('')
  const [ confirmPassword, setConfirmPassword] = useState('')
  const [ showPassword, setShowPassword] = useState(false)

  const setText = {
    "confirmPassword": setConfirmPassword,
    "password": setPassword
  }

  const onInputChange = (e) => {
  const value = e.target.value;
  const name = e.target.name;

  setText[name](value);
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


  async function changePassword(event) {
    event.preventDefault()

    if(password === confirmPassword){
      const response = await fetch('/api/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access, password
        })
      })

      const data = await response.json()
      if(data.status === 'ok'){
        localStorage.clear()
        navigate('/')
      }
    }

    else{
      alert('Password and Confirm Password do not match')
    }
  }

  return (
    <div className="main">
      <div className='form-wrapper conPassword'>
        <form onSubmit={changePassword}>
          <h2>Change Password</h2>
          <label htmlFor="password">Password </label>
          <input type={showPassword
          ? 'text' : 'password'} name="password" id="password" value={password} onChange={(e) => onInputChange(e)}/>

          <label htmlFor="password">Confirm Password </label>
          <input type={showPassword
          ? 'text' : 'password'} name="confirmPassword" id="confirmPassword" value={confirmPassword} onChange={(e) => onInputChange(e)}/>
          <div className="showPassword">
            <label htmlFor="showPassword">Show Password:</label>
            <input type='checkbox' id="showPassword" onClick={() => {setShowPassword(!showPassword)}}></input>
          </div>
          <button type="submit" value="Login" className="teal">Change Password</button>
        </form>
      </div>
    </div>
  )
}

export default forgotPassword