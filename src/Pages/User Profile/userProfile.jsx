import React, { useState, useEffect } from 'react';
import './userProfile.css';
import User from '../../Assets/Images/user.png';

const userProfile = ({user}) => {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ firstName, setfName]  = useState('');
  const [ lastName, setlName ] = useState('');

  const setText = {
    "username": setUsername,
    "email": setEmail,
    "firstName": setfName,
    "lastName": setlName
  }

  useEffect(() => {
    setUsername(user ? user.username : "USERNAME");
    setEmail(user ? user.email : "EMAIL");
    setfName(user ? user.fname : "FIRST NAME");
    setlName(user ? user.lname : "LAST NAME");
  }, [])

  const onInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;

    setText[name](value);
  }

  return (
    <main>
        <div className="main-header">
            <h1> Profile</h1>
        </div>
        <div className="user-profile">
            <div className="user-header">
                <img src={User} alt="user-pfp" />
                <h3>{localStorage.getItem("username")}</h3>
            </div>

            <div className="user-body">
                <form className="form-wrapper profile-form">
                    <label htmlFor="username">Username</label>
                    <input type="text" name="username" id="username" value={username} onChange={(e) => onInputChange(e)}/>
                    <label htmlFor="firstName">First Name</label>
                    <input type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => onInputChange(e)}/>
                    <label htmlFor="lastName">Last Name</label>
                    <input type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => onInputChange(e)}/>
                    <label htmlFor="email">E-mail</label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => onInputChange(e)}/>
                </form>
            </div>
        </div>
    </main>
  )
}

export default userProfile;