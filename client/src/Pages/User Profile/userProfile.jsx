//Redirect User to Shop if they want to customize the character <3
import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import { useNavigate } from 'react-router-dom';

//Components
import Toast from '../../Components/Toast.jsx';
import Loader from '../../Components/Loader.jsx';

//Hooks
import getCharacter from '../../Hooks/getCharacter'

import './userProfile.css';


const userProfile = () => {
  const nav = useNavigate();
  const [ access, setAccess ] = useState('');
  const [ gender, setGender ] = useState('');
  const [ isEditable, setIsEditable ] = useState(true);
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ firstName, setfName]  = useState('');
  const [ lastName, setlName ] = useState('');

  //Character Model State
  const [ b64String, setB64String ] = useState();

  //Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastMessage, setToastMessage ] = useState("");
  const [ toastType, setToastType ] = useState("");

  const setText = {
    "username": setUsername,
    "email": setEmail,
    "firstName": setfName,
    "lastName": setlName
  }

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    setUsername(user ? user.username : "USERNAME");
    setEmail(user ? user.email : "EMAIL");
    setfName(user ? user.firstName : "FIRST NAME");
    setlName(user ? user.lastName : "LAST NAME");
    setAccess(user.id);
    setGender(user.gender);

    (async() =>{
      const data = await getCharacter(user.id, user.gender);
      setB64String(data);
    })();
    
  }, [])

  const onInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setText[name](value);
  }

  async function editUser(event){
    event.preventDefault();
    const response = await fetch('/api/editUser/' + access, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        username, firstName, lastName, email
      })
    })

    const data = await response.json()

    if(data.status === 'ok'){
      localStorage.clear()
      localStorage.setItem('token', data.user);
      localStorage.setItem('username', username);
      setToastMessage("Successfully edited user profile");
      setToastType("success");
      setShowToast(true);
    }
    else{
      alert(data.error);
      setToastMessage("Something went wrong. Please try again.");
      setToastType("warning");
      setShowToast(true);
    }
  }

  return (
    <>
      <div className="main-header">
        <h1>Profile</h1>
      </div>
      <div className="user-wrapper">
        <div className="left">
          {b64String ? 
          <>
          <h3>{localStorage.getItem("username")}</h3>
          <img src={b64String} alt="" />
          <button onClick={() => nav("/shop")} className={"cta fluid-btn"}> Customize Character</button></>
          :
          <Loader />
          
          }
        </div>
        <div className="right">
          <div className="user-body">
            <form onSubmit={editUser} className="form-wrapper profile-form">
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" value={username} onChange={(e) => onInputChange(e)} disabled={isEditable}/>
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => onInputChange(e)} disabled={isEditable}/>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => onInputChange(e)} disabled={isEditable}/>
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" value={email} onChange={(e) => onInputChange(e)} disabled={isEditable}/>
              
              <button className='teal' onClick={() => setIsEditable(!isEditable)} type={isEditable ? 'submit' : 'button'}> {isEditable ? 'Edit' : 'Save'} </button>
            </form>
            
          </div>
        </div>
      </div>
      <Toast message={toastMessage} timer={3000} toastType={toastType} showToast={setShowToast} toastState={showToast}/>
    </>
  )
}

export default userProfile