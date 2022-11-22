import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd/dist/hooks';
import ElemColors from '../Data/ElemColors.js';
import './Elements.css';

const Elements = ({symbol, xpos, ypos, category, isDragElem, addElement}) => {
  const { familyBGs, familyBDs } = ElemColors;
  const borderColor = familyBDs[category] ? familyBDs[category] : "#D8E9EF";

  const [{isDragging}, drag] = useDrag(() => ({
    type: "element",
    item: { symbol: symbol },
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }))

  useEffect(() => {
    isDragElem(isDragging);
  }, [isDragging])

  return (
    <div
     ref={drag}
     style={{
        gridRow: ypos,
        gridColumn: xpos,
        border: isDragging ? "2px solid #000000" : `3px solid ${borderColor}`,
        backgroundColor: familyBGs[category] ? familyBGs[category] : "#EBF3F6"
     }}
     className="element"
     onClick={() => addElement(symbol)}
    ><p>{symbol}</p></div>
  )
}

export default Elements