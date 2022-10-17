import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Logo from '../../Assets/Images/logo.png';
import './findYourAccount.css'

import requestOTP from '../../Hooks/requestOTP'
import { useEffect } from 'react';

const findYourAccount = () => {
    const navigate = useNavigate()
    const [ email, setEmail ] = useState("")
    const [ flag, setFlag ] = useState(false)

    const setText = {
        "email": setEmail
    }

    const onInputChange = (e) => {
        const value = e.target.value;
        const name = e.target.name;

        setText[name](value);
    }

    async function findUser(event){
        event.preventDefault()
    
        const response = await fetch('/api/findUser', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email
          })
        })

        const data = await response.json()

        if(data.status === 'ok'){
            (async () => {
                const response = await requestOTP(data.user)
                localStorage.setItem('verify', response)
                navigate('/forgotPasswordOTP')
            })()
            alert('User Found')
            // navigate('/forgotPasswordOTP')
        }
        else{
            alert(data.error)
        }
    }


    return (
        <div className="main">
            <img src={Logo} alt="logo" className="logo" />
            <h2>A more fun way to learn the periodic table!</h2>
            <div className="form-wrapper">
                <h2>Find Your Acount</h2>
                <form onSubmit={findUser} id="login">
                    <label htmlFor="email">Email </label>
                    <input type="email" name="email" id="email" value={email} onChange={(e) => onInputChange(e)}/>
                    <button type="submit" className="teal">Find</button>
                </form>
            </div>    
        </div>
    )

}

export default findYourAccount