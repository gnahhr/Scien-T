import React, { useState, useEffect }from 'react'
import jwtDecode from 'jwt-decode'
import LineChart from '../../Components/LineChart'
import regression from 'regression'

import "./userProgress.css";

//Hooks
import getIntellimentData from '../../Hooks/getIntellimentData'
import getUserProgEC from '../../Hooks/getUserProgEC'
import getUserProgME from '../../Hooks/getUserProgME'
import getIntellimentCounter from '../../Hooks/getIntellimentCounter'

const userProgress = () => {
  const [ username, setUsername ] = useState('');
  const [ email, setEmail ] = useState('');
  const [ firstName, setFirstName]  = useState('');
  const [ lastName, setLastName ] = useState('');
  const [ access, setAccess ] = useState('')
  const [ data, setData ] = useState([])
  const [ intellimentCounter, setIntellimentCounter ] = useState([])
  const [ difficulty, setDifficulty ] = useState('easy')
  const [ mixingTableCounter, setMixingTableCounter ] = useState(0)
  const [ electronConfigCounter, setElectronConfigCounter ] = useState(0)
  const [ predictedValue, setPredictedValue ] = useState(0)

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
      setElectronConfigCounter(progress);
    })();
  },[])

  //get user data per difficulty change
  useEffect(()=>{
    (async () => {
      const progress = await getIntellimentData(access, difficulty);
      setData(progress);
    })();

    (async () => {
      const progress = await getIntellimentCounter(access, difficulty);
      setIntellimentCounter(progress);
    })();
  },[difficulty])

  useEffect(() => {
    const formattedArray = intellimentCounter.map((ctr, index) => {
      return[index+1,+ctr]
    })
    const result = regression.linear(formattedArray)
    const predict = result.predict(intellimentCounter.length+1)
    console.log(predict)
    console.log(formattedArray)
    setPredictedValue(predict[1])
  },[intellimentCounter])


  const formatData = (data) => {
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

  const levelOfMastery = () => {
    let passing = 0;

    if (difficulty === "easy") {
      passing = 18;
    } else if (difficulty === "normal") {
      passing = 36;
    } else if (difficulty === "hard") {
      passing = 54;
    } else if (difficulty === "hardcore") {
      passing = 72;
    }

    if(intellimentCounter.length < 5){
      return "Insufficient Games Played";
    }
    else{
      if (predictedValue >= passing){
        return "A+";
      }
      else{
        return "F-";
      }
    }

  }

  return (
    <>
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
              <p>{electronConfigCounter}pts</p>
              <p></p>
            </div>
            <div className="mastery progress-div">
              <h3>Level of Mastery</h3>
              <p>{levelOfMastery()}</p>
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
                <LineChart chartData={formatData(data)} />
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
        </div>
    </>
  )
}

export default userProgress