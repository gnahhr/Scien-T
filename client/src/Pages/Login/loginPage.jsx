import React, { useState, useEffect } from 'react';
import Logo from '../../Assets/Images/logo.png';
import { useNavigate } from 'react-router-dom';
import "./loginPage.css";

//Hooks
import getFailedAttempts from '../../Hooks/getFailedAttempts';
import requestOTP from '../../Hooks/requestOTP';

const loginPage = ({setUser}) => {
  const navigate = useNavigate()
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, setForgot] = useState(false);
  const [counter, setCounter] = useState(0);
  const [tkn, setTkn] = useState("")

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

    const response = await fetch(`${process.env.REACT_APP_API_URL}/api/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, password
      })
    })

    const data = await response.json()

    //if successful, save data to localstorage and proceed
    if (data.status === 'ok'){
      localStorage.setItem('token', data.user);
      localStorage.setItem('username', username);
      setUser(localStorage.token);
      navigate("/");
    }

    else if(data.status === 'Wrong Password'){
      alert(data.error);
      (async () => {
        const data = await getFailedAttempts(username)
        setCounter(data)// set counter for failed attempts
      })()
      
    }

    else if(data.status === 'Invalid Username'){
      alert(data.error)
    }

    else if(data.status === 'Verify User'){// if user returned not verified, redirect to verify page with new OTP and updated verification token
      localStorage.setItem('verify', data.user);
      navigate('/verify')
    }
  }

 

  const handleClick = () => {
    navigate('/findYourAccount')
  }

  

  return (
    <div className="main">
        <img src={Logo} alt="logo" className="logo" />
        <h2>A more fun way to learn the periodic table!</h2>

        <div className="form-wrapper">
          <h2>Login</h2>
          <form onSubmit={loginUser} id="login">
              <label htmlFor="username">Username </label>
              <input type="text" name="username" id="username" value={username} onChange={(e) => onInputChange(e)}/>
              <label htmlFor="password">Password </label>
              <input type="password" name="password" id="password" value={password} onChange={(e) => onInputChange(e)}/>
              <button type="submit" value="Login" className="teal">LOGIN</button>
          </form>
          <a id="forgot-pw" onClick={() => {handleClick()}}>Forgot Password?</a>
        </div>
    </div>
  )
}

export default loginPage;