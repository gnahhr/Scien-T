import React, { useState } from 'react';

const registerPage = () => {

  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [conPassword, setConPassword] = useState();
  const [email, setEmail] = useState();
  const [firstName, setfName] = useState();
  const [lastName, setlName] = useState();

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

  return (
    <div className="main">
        <div className="main">
        <h2>Register</h2>
        <form action="/api/login" method="post" id="login">
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
            <button>Submit</button>
        </form>
    </div>
    </div>
  )
}

export default registerPage