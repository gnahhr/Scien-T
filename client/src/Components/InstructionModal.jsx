import React, { useState, useEffect } from 'react'

import "./InstructionModal.css"

//Assets
import arrow from '../Assets/Images/arrow.svg'
import close from '../Assets/Images/close.svg'

const InstructionModal = ({instructions, setShowInstruction}) => {
    const [ steps, setSteps ] = useState([])
    const [ description, setDescription ] = useState('')
    const [ screenshots, setScreenshots ] = useState([])
    const [ mobileScreens, setMobileScreens ] = useState([])
    const [ index, setIndex ] = useState(0)
    const [ indicator, setIndicator ] = useState('')

    useEffect(() => {
        setSteps(instructions.steps);
        setDescription(instructions.description);
        setScreenshots(instructions.screenshots);
        setMobileScreens(instructions.mobileScreens);
    },[])

    useEffect(() => {
        if(instructions.game === 'ElectronConfiguration'){
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
        <div className='instruction-content'>
            <div className='close-button'>
                    <img src={close} alt="" onClick={() => closeInstruction()}/>
            </div> 

            <div className='screenshots-slider'>
                <div className={`middle-container ${indicator}`}>
                    <div className='left-button'>
                        {index > 0 && 
                            <img src={arrow} alt="" onClick={() => toTheLeft()}/>
                        }
                    </div>
                    
                    <div className='screenshots'>
                        <img className={`screenshot`}  src={`./images/${instructions.game}/${screenshots[index]}.png`} alt="" />
                        <img className={`mobile-screenshot`}  src={`./images/${instructions.game}/${mobileScreens[index]}.png`} alt="" />
                    </div>

                    <div className='right-button'>
                        {index < screenshots.length-1 && 
                            <img src={arrow} alt="" onClick={() => toTheRight()}/>
                        }
                    </div>
                </div>

                <div className="steps">
                    <p>{steps[index]}</p>
                </div>
            </div>
            
            <div className='description-and-steps'>
                <div className="description">
                    <p>{description}</p>
                </div>
            </div>
        </div>
    </div>
  )
}

export default InstructionModal