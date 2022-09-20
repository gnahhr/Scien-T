import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'
import "./loginPage.css";

const loginPage = ({setUser}) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [counter, setCounter] = useState(0)
  const [forgot, setForgot] = useState('');

  const setText = {
        "username": setUsername,
        "password": setPassword
  }

  const onInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setText[name](value);
  }

  async function loginUser(event){
    event.preventDefault()

    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, password
      })
    })

    const data = await response.json()

    if (data.status === 'ok'){
      localStorage.setItem('token', data.user);
      localStorage.setItem('username', username);
      setUser(localStorage.token);
    }

    else if(data.status === 'error'){
      alert(data.error)
      setCounter(counter + 1)
    }

    else if(data.status === 'verify user'){// if user returned not verified, redirect to verify page with new OTP and updated verification token
      localStorage.setItem('verify', data.user);
      navigate('/verify')
    }
  }

  useEffect (() => {
    if(counter === 3)
      setForgot('Forgot Password?')
  }, [counter]) 

  return (
    <div className="main">
        <h2>Login</h2>
        <form onSubmit={loginUser} id="login">
            <label htmlFor="username">Username </label>
            <input type="text" name="username" id="username" value={username} onChange={(e) => onInputChange(e)}/>
            <label htmlFor="password">Password </label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => onInputChange(e)}/>
            <button type="submit" value="Login">Submit</button>
        </form>
        {forgot > 1 ? <button>{forgot}</button> : ''}
    </div>
  )
}

export default loginPage;