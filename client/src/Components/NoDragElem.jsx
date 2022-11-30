import React from 'react';
import ElemColors from '../Data/ElemColors.js';
import './Elements.css';

const NoDragElem = ({symbol, xpos, ypos, category, clickAct, elem, tag}) => {
  const { familyBGs, familyBDs } = ElemColors;
  const borderColor = familyBDs[category] ? familyBDs[category] : "#D8E9EF";

  const clickAction = () => {
    if (clickAct) {
      clickAct(elem)
    }
  }

  return (
    <div
     style={{
        gridRow: ypos,
        gridColumn: xpos,
        border: `3px solid ${borderColor}`,
        backgroundColor: familyBGs[category] ? familyBGs[category] : "#EBF3F6"
     }}
     className={`element ${tag}`}
     onClick={() => clickAction()}
    >{symbol}</div>
  )
}

export default NoDragElem