import React from 'react';
import ElemColors from '../Data/ElemColors.js';
import './Elements.css';

const NoDragElem = ({symbol, xpos, ypos, category, clickAct, elem}) => {
  const { familyBGs, familyBDs } = ElemColors;

  return (
    <div
     style={{
        gridRow: ypos,
        gridColumn: xpos,
        border: familyBDs[category] ? familyBDs[category] : "grey",
        backgroundColor: familyBGs[category] ? familyBGs[category] : "grey"
     }}
     className="element"
     onClick={() => clickAct(elem)}
    >{symbol}</div>
  )
}

export default NoDragElem