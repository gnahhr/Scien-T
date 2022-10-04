import React, { useEffect } from 'react';
import { useDrag } from 'react-dnd/dist/hooks';
import ElemColors from '../Data/ElemColors.js';
import './Elements.css';

const Elements = ({symbol, xpos, ypos, category, isDragElem}) => {
  const { familyBGs, familyBDs } = ElemColors;
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
        border: isDragging ? "2px solid white" : (familyBDs[category] ? familyBDs[category] : "grey"),
        backgroundColor: familyBGs[category] ? familyBGs[category] : "grey"
     }}
     className="element"
    ><p>{symbol}</p></div>
  )
}

export default Elements