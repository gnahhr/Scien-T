import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode"

//Components
import ElementQuestion from "../../Components/ElementQuestion.jsx";
import Toast from '../../Components/Toast';
import SideNav from '../../Components/SideNav';
import ElectronFinish from '../../Components/ElectronFinish.jsx';
import ElectronChart from '../../Components/ElectronChart.jsx';

//Hooks
import pushProgEC from '../../Hooks/pushProgEC.js';
import getUserProgEC from '../../Hooks/getUserProgEC';

//Data
import { periodicTable } from '../../Data/PeriodicTableJSON';
import backCard from '../../Assets/Images/back-card.png';
import star from '../../Assets/Images/Star1.png';
import clock from '../../Assets/Images/clock.png'

//Style
import "./electronConfiguration.css";
import { shuffle } from 'simple-statistics';

const electronConfiguration = () => {
  const [ points, setPoints ] = useState(0)
  const [ cell, setCell ] = useState([])
  const [ answer, setAnswer ] = useState([])
  const [ isCorrect, setCorrect ] = useState(false)
  const [ shuffledCell, setShuffledCell ] = useState([])
  const [ cellState, setCellState ] = useState(false)
  // const [ clickCount, setClickCount ] = useState(0)
  const [ clickState, setClickState ] = useState(true)
  const [ gameProgress, setGameProgress ] = useState()

  
  const [ access, setAccess ] = useState('')
  const [ username, setUsername] = useState('')


  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)
    setAccess(user.id)
    setUsername(user.username)
    cellGenerator(119)
  },[])

  useEffect(() => {
    if(cell.length > 0)
      shuffleCells()
  },[cell])

  useEffect(() => {
    console.log(shuffledCell)
  },[shuffledCell])


  useEffect(() => {
    if(answer.length === 2){
      if(answer[0][1] === answer[1][1]){
        console.log('duplicate!')
        answer.pop()
        console.log(answer)
      }
    
    else{
        console.log('correct format')
        console.log(answer)
        setClickState(false)
        setTimeout(() => checkAnswer(answer[0][0], answer[0][1], answer[0][2], answer[1][0], answer[1][1], answer[1][2]), 1500)
      }
    }
  },[answer])

  useEffect(() => {
    if(gameProgress === 10){
      console.log('finish na')
    }
  },[gameProgress])

  const cellGenerator = (range) =>{
    setCell([])
    for(let i = 0; i < 10; ++i){
      const rng = Math.floor(Math.random() * range)
      setCell((current) => [...current, [i,periodicTable[rng].symbol,isCorrect,cellState]])
      setCell((current) => [...current, [i,periodicTable[rng].electron_configuration_semantic,isCorrect,cellState]])
    }
  }

  const shuffleCells = () => {
    let duplicate = []

    for(let i = 0; i < 20; ++i){
      let flag = true
      let rng = Math.floor(Math.random() * 20)

      while(flag){
        if(duplicate.filter((num) => num === rng).length > 0){
          rng = Math.floor(Math.random() * 20)
        }
        else{
          flag = false
        }
      }

      setShuffledCell((current) => [...current, cell[rng]])
      duplicate.push(rng)
    }
    console.log(duplicate)
  }

  const checkAnswer = (ans1, index1, cellState1, ans2, index2, cellState2) => {
    if(ans1 === ans2){
      console.log('correct')
      let updatedCells = [...shuffledCell]
      updatedCells[index1][2] = true
      updatedCells[index2][2] = true
      setShuffledCell(updatedCells)
      setClickState(true)
      setAnswer([])
    }

    else{
      let updatedCells = [...shuffledCell]
      updatedCells[index1][3] = false
      updatedCells[index2][3] = false
      setShuffledCell(updatedCells)
      console.log('wrong')
      setAnswer([])
      setClickState(true)
    }
    
  }

  const handelClick = (cell,index, cellState) => {
    setAnswer((current) => [...current, [cell,index, cellState]])
    let updatedCells = [...shuffledCell]
    updatedCells[index][3] = true
    setShuffledCell(updatedCells)
  }

  return (
      <main>
        <div className="main-header">
          <h1>Electron Configuration</h1>
        </div>
        <div className='container-electron-config'>
          <div className='electron-config'>
            <div className='chena'>
              <div className='points'>
                <img src={star} alt="" />
                <h1>Points: 100</h1>
              </div>
              <div className='time'>
                <img src={clock} alt="" />
                <h1>Time: 100</h1>
              </div>
            </div>

            <div className='game-grid'>
              { shuffledCell.map ((shuffledCell, index) => {
                return (
                  <>
                    {
                      shuffledCell[2] ? 
                      <div className='game-cells' key={index}>
                          <a></a>
                      </div> : 
                      <div className='' key={index} onClick={() => {clickState ? handelClick(shuffledCell[0],index, shuffledCell[3]) : console.log('sumosobra ka na')}}>
                        {
                          shuffledCell[3] ? 
                            <div className='game-cells scale-up-horizontal-center'>
                              <a>{shuffledCell[1]}</a>
                            </div> : 
                            <img className='game-cells scale-up-horizontal-center' src={backCard} alt="" />
                        }
                      </div>
                    }
                  </>
                )
              })}
            </div>
          </div>
        </div>
      </main>
  )
}

export default electronConfiguration
//<img className='back-card' src={backCard} alt="" />
