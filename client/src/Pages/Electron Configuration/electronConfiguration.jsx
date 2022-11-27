import React, { useState, useEffect } from 'react';
import jwtDecode from "jwt-decode"

//Hooks
import pushProgEC from '../../Hooks/pushProgEC.js';
import getUserProgEC from '../../Hooks/getUserProgEC';
import useAudio from '../../Hooks/useAudio.js';

//Data
import { periodicTable } from '../../Data/PeriodicTableJSON';

//Images
import star from '../../Assets/Images/Star1.png';
import frontCard from '../../Assets/Images/front-card.png';
import backCard from '../../Assets/Images/back-card.png';
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

//Audio
import BgmElecConfig from '../../Assets/Audio/Electron Configuration/elecConfig-bgm.mp3';
import RightSFX from '../../Assets/Audio/Electron Configuration/correct.mp3';
import WrongSFX from '../../Assets/Audio/Electron Configuration/wrong.mp3';
import SelectSFX from '../../Assets/Audio/Electron Configuration/select.mp3';

//Components
import InstructionModal from '../../Components/InstructionModal.jsx';
import MuteButton from '../../Components/MuteButton.jsx';

//Data
import ElectronConfigInstructions from '../../Data/ElectronConfigInstructions'

//Style
import "./electronConfiguration.css";

const electronConfiguration = () => {
  //Icon Array
  const icons = [icon1,icon2,icon3,icon4,icon5,icon6,icon7,icon8,icon9,icon10];
  
  //Data States
  const [ points, setPoints ] = useState(0)
  const [ prizeCoins, setPrizeCoins ] = useState(10)
  const [ igPoints, setIGPoints ] = useState(0)
  const [ cell, setCell ] = useState([])
  const [ answer, setAnswer ] = useState([])
  const [ isCorrect, setCorrect ] = useState(false)
  const [ shuffledCell, setShuffledCell ] = useState([])
  const [ cellState, setCellState ] = useState(false)
  const [ clickState, setClickState ] = useState(true)
  const [ gameProgress, setGameProgress ] = useState(0)
  const [ access, setAccess ] = useState('')
  const [ username, setUsername] = useState('')

  //Modal States
  const [ overlayState, setOverlayState ] = useState(false)
  const [ showModal, setShowModal ] = useState(false)
  const [ showInstruction, setShowInstruction ]  = useState(true)

  //Audio References
  const elecConfigBGM = useAudio(BgmElecConfig, {volume: 0.65, playbackRate: 1, loop: true});
  const selectSFX = useAudio(SelectSFX, {volume: 0.6, playbackRate: 1.75, loop: false});
  const rightSFX = useAudio(RightSFX, {volume: 0.6, playbackRate: 1, loop: false});
  const wrongSFX = useAudio(WrongSFX, {volume: 0.6, playbackRate: 1, loop: false});

  const audioArray = [elecConfigBGM, selectSFX, rightSFX, wrongSFX];

  useEffect(() => {
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)

    setAccess(user.id)
    setUsername(user.username)
    cellGenerator(119);
    elecConfigBGM.play();

    (async() => {
      const data = await getUserProgEC(user.id)
      setPoints(data)
    })()
  },[])

  useEffect(() => {
    return () => {
      elecConfigBGM.pause()
    }
  }, [])

  useEffect(() => {
    if(showInstruction === false){
      setOverlayState(true)
    }
  },[showInstruction])
  
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
      pushProgEC(access,igPoints,prizeCoins)
      setShowModal(true)
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
      rightSFX.play();
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
      wrongSFX.play();
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
    selectSFX.play();
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
        {showInstruction &&
          <InstructionModal instructions={ElectronConfigInstructions} setShowInstruction={setShowInstruction}/>
        }
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
              </div>

              <div className="settings-wrapper">
                <MuteButton audio={audioArray} />
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
