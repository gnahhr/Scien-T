import React, { useState, useEffect } from 'react'

import "./InstructionModal.css"

//Assets
import arrow from '../Assets/Images/arrow.svg'
import close from '../Assets/Images/close.svg'

//Data
import ElectronConfigInstructions from '../Data/ElectronConfigInstructions'
import TestBattleInstructions from '../Data/TestBattleInstructions'
import MixDashInsctructions from '../Data/MixDashInsctructions'

const InstructionModal = ({game, setShowInstruction}) => {
    const [ steps, setSteps ] = useState([])
    const [ description, setDescription ] = useState('')
    const [ screenshots, setScreenshots ] = useState([])
    const [ index, setIndex ] = useState(0)
    const [ indicator, setIndicator ] = useState('')

    useEffect(() => {
        if(game === 'ElectronConfiguration'){
            setSteps(ElectronConfigInstructions.steps)
            setDescription(ElectronConfigInstructions.description)
            setScreenshots(ElectronConfigInstructions.screenshots)
        }

        else if(game === 'TestBattle'){
            setSteps(TestBattleInstructions.steps)
            setDescription(TestBattleInstructions.description)
            setScreenshots(TestBattleInstructions.screenshots)
        }

        else if(game === 'MixDash'){
            setSteps(MixDashInsctructions.steps)
            setDescription(MixDashInsctructions.description)
            setScreenshots(MixDashInsctructions.screenshots)
        }

        
    },[])

    useEffect(() => {
        if(game === 'ElectronConfiguration'){
            if(index === 0){
                setIndicator('Incorrect')
            }
            else{
                setIndicator('Correct')
            }
        }
    },[index])

    const toTheLeft = () => {
        if(index > 0){
            setIndex(index-1)
        }
    }

    const toTheRight = () => {
        if(index < screenshots.length-1){
            setIndex(index+1)
        }
    }

    const closeInstruction = () => {
        setShowInstruction(false)
    }

  return (
    <div className='modal-wrapper'>
        <div className='close-button'>
                <a onClick={() => closeInstruction()}><img src={close} alt="" /></a>
        </div> 
        <div className='content'>
            
            <div className='screenshots-slider'>
                <div className='left-button'>
                    {index > 0 && 
                        <a onClick={() => toTheLeft()}><img src={arrow} alt="" /></a>
                    }
                </div>
                
                <div className={`middle-container ${indicator}`}>
                    <div className='screenshots'>
                        <img className={indicator}  src={`./images/${game}/${screenshots[index]}.png`} alt="" />
                    </div>

                    {game === 'ElectronConfiguration'  && 
                        <div className='text'>
                            <h1>{indicator}</h1>
                        </div>
                    }

                </div>

                <div className='right-button'>
                    {index < screenshots.length-1 && 
                        <a onClick={() => toTheRight()}><img src={arrow} alt="" /></a>
                    }
                </div>
                
                
            </div>
            <div className='description-and-steps'>
                <h1>{description}</h1>
                <h1>Steps:</h1>
                {steps.map((steps,index) => {
                    return( <p><span>{index+1}.</span>{steps}</p> )
                })}

            </div>
        </div>
    </div>
  )
}

export default InstructionModal