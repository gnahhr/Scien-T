import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';
import SideNav from '../../Components/SideNav';
import User from '../../Assets/Images/user.png';
import './userProfile.css';


const userProfile = () => {
  const [ access, setAccess ] = useState('')
  const [ isEditable, setIsEditable ] = useState(true)
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
    const token = localStorage.getItem('token')
    const user = jwtDecode(token);
    setUsername(user ? user.username : "USERNAME");
    setEmail(user ? user.email : "EMAIL");
    setfName(user ? user.firstName : "FIRST NAME");
    setlName(user ? user.lastName : "LAST NAME");
    setAccess(user.id);
  }, [])

  const onInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setText[name](value);
  }

  async function editUser(event){
    event.preventDefault()
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
      alert('Successfully edited user profile')
    }

    else{
      alert(data.error)
    }
  }

  return (
    <main>
      <div className="main-header">
        <h1>Profile</h1>
      </div>
      <div className="user-wrapper">
        <div className="user-header">
          <img src={User} alt="user-pfp" />
          <h3>{localStorage.getItem("username")}</h3>
        </div>
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
    </main>
  )
}

export default userProfile
