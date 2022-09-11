import React from 'react'

const Choice = ({data, selectedAnswer}) => {
  return (
    <div className="choice" onClick={() => selectedAnswer(data)}>
        {data}
    </div>
  )
}

export default Choice