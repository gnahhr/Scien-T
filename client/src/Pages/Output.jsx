import React, { useState } from 'react'
import { useEffect } from 'react'

import {recipe} from '../Data/Recipe'

import './Output.css'
const Output = () => {
    return (
        <div>{recipe.map((recipe, index) => {
            return(
                <>
                    <div key={index}>
                        <h1>{recipe.name}</h1>
                        <img src={`./images/Compounds/${recipe.compoundPic}`} alt="mema" />
                    </div>
                </>
            )
        })}</div>
    )
}

export default Output