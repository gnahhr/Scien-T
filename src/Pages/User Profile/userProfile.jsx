import React, { useState, useEffect }from 'react'
import jwtDecode from 'jwt-decode'

import SideNav from '../../Components/SideNav'
import LineChart from '../../Components/LineChart'

import "./userProfile.css"

import getIntellimentData from '../../Hooks/getIntellimentData'


const userProfile = () => {

  const [ username, setUsername ] = useState ('')
  const [ email, setEmail ] = useState ('')
  const [ firstName, setFirstName ] = useState ('')
  const [ lastName, setLastName ] = useState ('')
  const [ access, setAccess ] = useState('')
  const [ isDisabled, setIsDisabled ] = useState(true)
  const [ data, setData ] = useState([])
  const [ difficulty, setDifficulty ] = useState('easy')

  //get data on refresh
  useEffect(()=>{
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)
    setUsername(user.username)
    setEmail(user.email)
    setFirstName(user.firstName)
    setLastName(user.lastName)
    setAccess(user.id);
    (async () => {
      const progress = await getIntellimentData(user.id, "easy");
      setData(progress);
    })()
  },[])

  //get user data per difficulty change
  useEffect(()=>{
    (async () => {
      const progress = await getIntellimentData(access, difficulty);
      setData(progress);
    })()
  },[difficulty])


  //text input
  const setText = {
    "username": setUsername,
    "email": setEmail,
    "firstName": setFirstName,
    "lastName": setLastName
  }

  //text input
  const onInputChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    setText[name](value);
  }

  //format data for chart output
  const formatter = (data) => {
    console.log(data.map((data) => data));
    return {
      labels: data.map((data,index) => `Game ${index + 1}`),
      datasets: [
        {
          label: difficulty,
          data: data.map((data) => data),
          backgroundColor: "#008773",
          borderColor: "#008773",
          borderWidth: 5,
        },
      ],
    }
  }

  const toggleDifficulty  = (difficulty) => {
    setDifficulty(difficulty);
  }

    
  return (
    <>
      <SideNav/>
      <main>
        <div className="main-header">
          <h1>User Progress</h1>
        </div>
        <div className="main-wrapper user-profile">
          <div className="progress-header">
            <h2>Check your progress!</h2>
            <div className="progress-wrapper">
              <div className="mix-progress progress-div">
                <h3>Mixing Table Progress</h3>
                <p>100/273</p>
                <p></p>
              </div>
              <div className="electron-progress progress-div">
                <h3>Electron Configuration Progress</h3>
                <p>100/118</p>
                <p></p>
              </div>
              <div className="mastery progress-div">
                <h3>Level of Mastery</h3>
                <p>Newbie</p>
                <p className="side">
                  You are something else.
                </p>
              </div>
            </div>
          </div>
          <div className="progress-body">
            <div className="category-wrapper">
                <h1>Intelliment</h1>
                {/* <button>Intelliment</button>
                <button>Electron Configuration</button> */}
            </div>
            <div className="body-content">
              <div className="left-progress">
                <div className="chart"style={{ width: "95%" }}>
                  <LineChart chartData={formatter(data)} />
                </div>
              </div>
              <div className="right-progress">
                  <h2>Choose difficulty:</h2>
                  <button className={difficulty === "easy" ? "active-diff" : ""}
                          onClick={() => toggleDifficulty("easy")}>Easy</button>
                  <button className={difficulty === "normal" ? "active-diff" : ""}
                          onClick={() => toggleDifficulty("normal")}>Normal</button>
                  <button className={difficulty === "hard" ? "active-diff" : ""}
                          onClick={() => toggleDifficulty("hard")}>Hard</button>
                  <button className={difficulty === "hardcore" ? "active-diff" : ""}
                          onClick={() => toggleDifficulty("hardcore")}>Hardcore</button>
              </div>

            </div>
          </div>
          {/* <div className="form-wrapper">
            <h2>User Profile</h2>
            <form  id="login">
                <label htmlFor="firstName">First Name</label>
                <input type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => onInputChange(e)} disabled={isDisabled}/>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => onInputChange(e)} disabled={isDisabled}/>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" id="username" value={username} onChange={(e) => onInputChange(e)} disabled={isDisabled}/>
                <label htmlFor="email">E-mail</label>
                <input type="email" name="email" id="email" value={email} onChange={(e) => onInputChange(e)} disabled={isDisabled}/>
            </form>
          </div> */}
        </div>
      </main>
    </>
  )
}

export default userProfile

{/* <>
        <div className="main-wrapper">
        <div className="form-wrapper">
          <h2>User Profile</h2>
          <form  id="login">
              <label htmlFor="firstName">First Name</label>
              <input type="text" name="firstName" id="firstName" value={firstName} onChange={(e) => onInputChange(e)} disabled={isDisabled}/>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" name="lastName" id="lastName" value={lastName} onChange={(e) => onInputChange(e)} disabled={isDisabled}/>
              <label htmlFor="username">Username</label>
              <input type="text" name="username" id="username" value={username} onChange={(e) => onInputChange(e)} disabled={isDisabled}/>
              <label htmlFor="email">E-mail</label>
              <input type="email" name="email" id="email" value={email} onChange={(e) => onInputChange(e)} disabled={isDisabled}/>
          </form>
        </div>
        </div>
        <LineChart/>
        <SideNav/>
    </> */}