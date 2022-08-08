import React, { useState } from 'react';
import "./loginPage.css";

const loginPage = () => {

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

  return (
    <div className="main">
        <h2>Login</h2>
        <form action="" method="post" id="login">
            <label htmlFor="username">Username </label>
            <input type="text" name="username" id="username" value={username} onChange={(e) => onInputChange(e)}/>
            <label htmlFor="password">Password </label>
            <input type="password" name="password" id="password" value={password} onChange={(e) => onInputChange(e)}/>
            <button>Submit</button>
        </form>
    </div>
  )
}

export default loginPage;