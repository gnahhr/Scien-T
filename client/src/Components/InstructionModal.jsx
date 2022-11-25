import React, { useState, useEffect } from 'react'

import "./InstructionModal.css"

//Assets
import arrow from '../Assets/Images/arrow.svg'
import close from '../Assets/Images/close.svg'

const InstructionModal = ({instructions, setShowInstruction}) => {
    const [ steps, setSteps ] = useState([])
    const [ description, setDescription ] = useState('')
    const [ screenshots, setScreenshots ] = useState([])
    const [ index, setIndex ] = useState(0)
    const [ indicator, setIndicator ] = useState('')

    useEffect(() => {
        setSteps(instructions.steps)
        setDescription(instructions.description)
        setScreenshots(instructions.screenshots)
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
        
        <div className='content'>
            <div className='close-button'>
                    <a onClick={() => closeInstruction()}><img src={close} alt="" /></a>
            </div> 

            <div className='screenshots-slider'>
                <div className={`middle-container ${indicator}`}>
                    <div className='left-button'>
                        {index > 0 && 
                            <a onClick={() => toTheLeft()}><img src={arrow} alt="" /></a>
                        }
                    </div>
                    
                    <div className='screenshots'>
                        <img className={indicator}  src={`./images/${instructions.game}/${screenshots[index]}.png`} alt="" />
                    </div>

                    <div className='right-button'>
                        {index < screenshots.length-1 && 
                            <a onClick={() => toTheRight()}><img src={arrow} alt="" /></a>
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