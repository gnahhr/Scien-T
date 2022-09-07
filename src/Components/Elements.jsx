import React from 'react';
import { useDrag } from 'react-dnd/dist/hooks';

const Elements = ({symbol, xpos, ypos}) => {
  const [{isDragging}, drag] = useDrag(() => ({
    type: "element",
    item: {symbol: symbol},
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    })
  }))
  
  return (
    <div
     ref={drag}
     style={{
        gridRow: ypos,
        gridColumn: xpos,
        border: isDragging ? "2px solid blue" : "",
     }}
    >{symbol}</div>
  )
}

export default Elements