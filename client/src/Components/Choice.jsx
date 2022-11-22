import React from 'react'
import { useEffect } from 'react';
import "./Choice.css";

const Choice = ({data, selectedAnswer, answered, category, selHighlight}) => {
  return (
    <div className={answered ? `choice ${category} ${selHighlight}` : "choice"} onClick={() => selectedAnswer(data)}>
        {data}
    </div>
  )
}

export default Choice