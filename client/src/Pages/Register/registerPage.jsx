//Add Gender
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

//Images
import Logo from '../../Assets/Images/logo.png';
import Male from '../../Assets/Images/male.png';
import Female from '../../Assets/Images/female.png';
import MaleIco from '../../Assets/Images/male-icon.svg';
import FemaleIco from '../../Assets/Images/female-icon.svg';

//Design
import './registerPage.css';

const registerPage = () => {
  const navigate = useNavigate();

  //Input Field States
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [conPassword, setConPassword] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setfName] = useState('');
  const [lastName, setlName] = useState('');
  const [gender, setGender] = useState("male");

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

  const toggleGender = (gender) => {
    setGender(gender);
  }

  async function registerUser(event) {
		event.preventDefault()

		const response = await fetch(`${process.env.API_URL}/api/register`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				username,
        password,
        email,
        firstName,
        lastName,
        gender
			})
		})

		const data = await response.json()
    
		if (data.status === 'ok') {
      localStorage.setItem('verify', data.user)
			navigate('/verify')
		}
	}

  return (
      <div className="main">
          <img src={Logo} alt="logo" className="logo" />
          <h2>A more fun way to learn the periodic table!</h2>
          <div className="form-wrapper register-wrapper">
            <h2>Register</h2>
            <div className="model-sel-wrapper">
              <h3>Choose your model:</h3>
              <img src={gender === "male" ? Male : Female} alt="" />
              <div className="button-wrapper">
                <button className={`fluid-btn purple ${gender === "male" && "active"}`} onClick={() => toggleGender("male")}><img src={MaleIco} alt="Male Icon"/></button>
                <button className={`fluid-btn purple ${gender === "female" && "active"}`} onClick={() => toggleGender("female")}><img src={FemaleIco} alt="Female Icon"/></button>
              </div>
            </div>
            <form onSubmit={registerUser} id="login">
              <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => onInputChange(e)}/>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => onInputChange(e)}/>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={username} onChange={(e) => onInputChange(e)}/>
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" value={password} onChange={(e) => onInputChange(e)}/>
                <label htmlFor="password">Confirm Password</label>
                <input type="password" name="conPassword" id="conPassword" value={conPassword} onChange={(e) => onInputChange(e)}/>
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => onInputChange(e)}/>
                <button type="submit" value="Register" className="teal">Sign Up</button>
            </form>
          </div>
      </div>
  )
}

export default registerPage