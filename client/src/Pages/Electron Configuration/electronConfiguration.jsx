import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwtDecode from "jwt-decode"

//Hooks
import pushProgEC from '../../Hooks/pushProgEC.js';
import getUserProgEC from '../../Hooks/getUserProgEC';

//Data
import { periodicTable } from '../../Data/PeriodicTableJSON';
import backCard from '../../Assets/Images/back-card.png';

//Assets
import star from '../../Assets/Images/Star1.png';
import frontCard from '../../Assets/Images/front-card.png';
import icon1 from '../../Assets/Images/icon1.png';
import icon2 from '../../Assets/Images/icon2.png';
import icon3 from '../../Assets/Images/icon3.png';
import icon4 from '../../Assets/Images/icon4.png';
import icon5 from '../../Assets/Images/icon5.png';
import icon6 from '../../Assets/Images/icon6.png';
import icon7 from '../../Assets/Images/icon7.png';
import icon8 from '../../Assets/Images/icon8.png';
import icon9 from '../../Assets/Images/icon9.png';
import icon10 from '../../Assets/Images/icon10.png';


//Style
import "./electronConfiguration.css";

const electronConfiguration = () => {
  const icons = [icon1,icon2,icon3,icon4,icon5,icon6,icon7,icon8,icon9,icon10]
  const [ points, setPoints ] = useState(0)
  const [ prizeCoins, setPrizeCoins ] = useState(500)
  const [ igPoints, setIGPoints ] = useState(0)
  const [ cell, setCell ] = useState([])
  const [ answer, setAnswer ] = useState([])
  const [ isCorrect, setCorrect ] = useState(false)
  const [ shuffledCell, setShuffledCell ] = useState([])
  const [ cellState, setCellState ] = useState(false)
  const [ clickState, setClickState ] = useState(true)
  const [ gameProgress, setGameProgress ] = useState(0)

  const [ overlayState, setOverlayState ] = useState(true)
  const [ showModal, setShowModal ] = useState(false)

  
  const [ access, setAccess ] = useState('')
  const [ username, setUsername] = useState('')


  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)
    setAccess(user.id)
    setUsername(user.username)
    cellGenerator(119);
    (async() => {
      const data = await getUserProgEC(user.id)
      setPoints(data)
    })()
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
        answer.pop()
      }
    
    else{
        setClickState(false)
        setTimeout(() => checkAnswer(answer[0][0], answer[0][1], answer[0][2], answer[1][0], answer[1][1], answer[1][2]), 1500)
      }
    }
  },[answer])

  useEffect(() => {
    if(gameProgress === 10){
      pushProgEC(access,igPoints,prizeCoins,username)
      setShowModal(true)
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
      setIGPoints(igPoints+1)
      setAnswer([])
      setGameProgress(gameProgress+1)
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

  const handleClick = (cell,index, cellState) => {
    setAnswer((current) => [...current, [cell,index, cellState]])
    let updatedCells = [...shuffledCell]
    updatedCells[index][3] = true
    setShuffledCell(updatedCells)
  }

  const modal = () => {
    setCell([])
    setShuffledCell([])
    cellGenerator(119)
    setGameProgress(0)
    setShowModal(false)
    setOverlayState(true)
  }

  return (
      <>
        {overlayState && 
          <div className='overlay' onClick={() => setOverlayState(!overlayState)}>
            <div className='bg'></div>
            <div className='opening-text'><h1>Click to Start</h1></div>
          </div>
        }

        {showModal && 
          <div className='overlay'>
          <div className='bg'></div>
          <div className='container-text'>
            <h1>Would you like to play again?</h1>
            <button onClick={() => modal()}>Yes</button>
          </div>
        </div>
        }

        <div className="main-header">
          <h1>Electron Configuration</h1>
        </div>

        <div className='container-electron-config'>
          <div className='left-container'>
            <h1>P</h1>
            <h1>I</h1>
            <h1>C</h1>
            <h1>K</h1>
          </div>

          <div className='middle-container'>
            
            <div className='chena'>
              <div className='points'>
                <img src={star} alt="" />
                <h1>Points: {points+igPoints}</h1>
                {gameProgress === 10 ? <h1>Finish na</h1> : ''}
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
                      <div className='' key={index} onClick={() => {clickState ? handleClick(shuffledCell[0],index, shuffledCell[3]) : console.log('sumosobra ka na')}}>
                        {
                          shuffledCell[3] ? 
                            <div className='game-cells rotate-scale-up-vertical'>
                              <img className='card' src={frontCard} alt="" />
                              <img className='icons' src={icons[shuffledCell[0]]}/>
                              <a className='text'>{shuffledCell[1]}</a>
                            </div> : 
                            <div className='game-cells' >
                              <img className='card rotate-scale-up-vertical' src={backCard} alt="" />
                            </div>
                        }
                        <img src={<img className='icons' src={shuffledCell[4]}/>} alt="" />
                      </div>
                      
                    }
                  </>
                )
              })}
            </div>
          </div>

          <div className='right-container'>
            <h1>M</h1>
            <h1>A</h1>
            <h1>T</h1>
            <h1>C</h1>
            <h1>H</h1>
          </div>
        </div>
      </>
  )
}

export default electronConfiguration
//<img className='back-card' src={backCard} alt="" />
