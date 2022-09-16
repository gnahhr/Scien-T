import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const registerPage = () => {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setfName] = useState('');
  const [lastName, setlName] = useState('');

  const setText = {
        "username": setUsername,
        "password": setPassword,
        "conPassword": setConPassword,
        "email": setEmail,
        "firstName": setfName,
        "lastName": setlName
  }

  const onInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setText[name](value);
  }

  async function registerUser(event) {
		event.preventDefault()

		const response = await fetch('/api/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
        password,
        email,
        firstName,
        lastName
			})
		})

		const data = await response.json()

    localStorage.setItem('token', data.user)
    
		if (data.status === 'ok') {
			navigate('/verify')
		}
	}

  return (
        <div className="main">
        <h2>Register</h2>
        <form onSubmit={registerUser} id="login">
            <label htmlFor="username">Username</label>
            <input type="text" name="username" id="username" value={username} onChange={(e) => onInputChange(e)}/>
            <label htmlFor="password">Password</label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => onInputChange(e)}/>
            <label htmlFor="password">Confirm Password</label>
            <input type="password" name="conPassword" id="conPassword" value={conPassword} onChange={(e) => onInputChange(e)}/>
            <label htmlFor="email">E-mail</label>
            <input type="email" name="email" id="email" value={email} onChange={(e) => onInputChange(e)}/>
            <label htmlFor="firstName">First Name</label>
            <input type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => onInputChange(e)}/>
            <label htmlFor="lastName">Last Name</label>
            <input type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => onInputChange(e)}/>
            <button type="submit" value="Register">Submit</button>
        </form>
    </div>
  )
}

export default registerPage