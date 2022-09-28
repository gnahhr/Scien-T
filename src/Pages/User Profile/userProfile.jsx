import React, { useState, useEffect }from 'react'
import jwtDecode from 'jwt-decode'
import regression from 'regression'
import User from '../../Assets/Images/user.png';
import "./userProfile.css"

import getIntellimentData from '../../Hooks/getIntellimentData'
import getUserProgEC from '../../Hooks/getUserProgEC'
import getUserProgME from '../../Hooks/getUserProgME'
import getIntellimentCounter from '../../Hooks/getIntellimentCounter'
import LineChart from '../../Components/LineChart'

// const userProfile = ({user}) => {
//   const [ username, setUsername ] = useState('');
//   const [ email, setEmail ] = useState('');
//   const [ firstName, setfName]  = useState('');
//   const [ lastName, setlName ] = useState('');




const userProfile = () => {

  const [ username, setUsername ] = useState ('')
  const [ email, setEmail ] = useState ('')
  const [ firstName, setFirstName ] = useState ('')
  const [ lastName, setLastName ] = useState ('')
  const [ access, setAccess ] = useState('')
  const [ isDisabled, setIsDisabled ] = useState(true)
  const [ data, setData ] = useState([])
  const [ intellimentCounter, setIntellimentCounter ] = useState([])
  const [ difficulty, setDifficulty ] = useState('easy')
  const [ mixingTableCounter, setMixingTableCounter ] = useState(0)
  const [ electronConfigCounter, setElectronConfigCounter ] = useState(0)

  // const formatArray = (intellimentCounter) => { // format to 2D array for linear regression
  //   return intellimentCounter.map((ctr, index) => {
  //     return[index+1,ctr]
  //   })
  // }

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
    })();

    (async () => {
      const progress = await getIntellimentCounter(user.id, "easy");
      setIntellimentCounter(progress);
    })();

    (async () => {
      const progress = await getUserProgME(user.id);
      setMixingTableCounter(progress.length);
    })();

    (async () => {
      const progress = await getUserProgEC(user.id);
      setElectronConfigCounter(progress.length);
    })();
  },[])

  //get user data per difficulty change
  useEffect(()=>{
    (async () => {
      const progress = await getIntellimentData(access, difficulty);
      setData(progress);
    })()
  },[difficulty])

  useEffect(() => {
    const formattedArray = intellimentCounter.map((ctr, index) => {
      return[index+1,ctr]
    })
    console.log(formattedArray)
    const result = regression.linear(formattedArray)
    console.log(result.string)
    console.log(result.equation[0])
    console.log(result.equation[1])
    console.log(result.predict(30))
  },[data])

  const formatter = (data) => {
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
              <p>{mixingTableCounter}/273</p>
              <p></p>
            </div>
            <div className="electron-progress progress-div">
              <h3>Electron Configuration Progress</h3>
              <p>{electronConfigCounter}/118</p>
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

            {/* <div className="user-body">
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
            </div> */}
            
          </div>
        </div>
    </main>
    </>
  )
}

export default userProfile