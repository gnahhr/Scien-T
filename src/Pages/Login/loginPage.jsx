import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import "./loginPage.css";

const loginPage = () => {
  const navigate = useNavigate
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

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

    if (data.user){
      localStorage.setItem('token', data.user)
      navigate('/electronConfiguration')
    }
    else{
      alert('Incorrect username/password')
    }
  }

  return (
    <div className="main">
        <h2>Login</h2>
        <form onSubmit={loginUser} id="login">
            <label htmlFor="username">Username </label>
            <input type="text" name="username" id="username" value={username} onChange={(e) => onInputChange(e)}/>
            <label htmlFor="password">Password </label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => onInputChange(e)}/>
            <button type="submit" value="Login" >Submit</button>
        </form>
    </div>
  )
}

export default loginPage;