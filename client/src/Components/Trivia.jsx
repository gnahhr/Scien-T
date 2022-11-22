import React from 'react';
import './Trivia.css';

const Trivia = ({data}) => {
  return (
    <div className="Trivia">
        <div className="wrapper">
            <h2>{data.name}</h2>
            <h3>Description:</h3>
            <p className="trivia-text">
                {data.description}
            </p>
            <h3>Used in:</h3>
            <p className="trivia-text">
                {data.used}
            </p>
            
        </div>
    </div>
  )
}

export default Trivia