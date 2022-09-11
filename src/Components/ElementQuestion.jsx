import React from 'react';
import "./ElementQuestion.css";

const ElementQuestion = ({data, sequence}) => {
  return (
    <div className="element-wrapper" style={{backgroundColor: sequence > 0 ? data.bgColor : ""}}>
        <div className="atomic-number" style={{visibility: sequence > 2 ? "visible" : "hidden"}}>{data.atomicNum}</div>
        <div className="element-symbol">{data.elemSym}</div>
        <div className="element-name" style={{visibility: sequence > 1 ? "visible" : "hidden"}}>{data.elemName}</div>
        <div className="atomic-mass" style={{visibility: sequence > 3 ? "visible" : "hidden"}}>{data.atomicMass}</div>
    </div>
  )
}

export default ElementQuestion