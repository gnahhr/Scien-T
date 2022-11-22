import React from 'react';
import { useEffect } from 'react';
import ElemColors from '../Data/ElemColors.js';
import "./ElementQuestion.css";

const ElementQuestion = ({data, sequence, category}) => {
  const { familyBGs } = ElemColors;

  return (
    <div className="element-wrapper" style={{backgroundColor: sequence > -1 ? familyBGs[data.family] : ""}}>
        <div className="atomic-number" style={{visibility: sequence > 1 ? "visible" : "hidden"}}>{data.atomicNum}</div>
        <div className="element-symbol">{data.elemSym}</div>
        <div className="element-name" style={{visibility: sequence > 0 ? "visible" : "hidden"}}>{data.elemName}</div>
        <div className="atomic-mass" style={{visibility: sequence > 2 ? "visible" : "hidden"}}>{data.atomicMass}</div>
    </div>
  )
}

export default ElementQuestion