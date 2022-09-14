import React from 'react'
import "./Choice.css";

const Choice = ({data, selectedAnswer, answered, category}) => {
  return (
    <div className={answered ? `choice ${category}` : "choice"} onClick={() => selectedAnswer(data)}>
        {data}
    </div>
  )
}

export default Choice