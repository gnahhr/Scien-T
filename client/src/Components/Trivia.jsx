import React, { useEffect, useState } from 'react';

//Images
import { elemPics } from '../Data/ElementPictures';
import Arrow from '../Assets/Images/arrow.svg';

//Design
import './Trivia.css';


const Trivia = ({data}) => {
  const usedIn = data.used.split(".").filter(x => x !== "");
  const [ picture, setPicture ] = useState(0);
  const [ triviaIndex, setTriviaIndex ] = useState(0);
  const [ maxTriviaIndex, setMaxTriviaIndex ] = useState(0); 

  useEffect(() => {
    let index = !data.index ? 0 : data.index
    setPicture(elemPics[index].picture);
    setTriviaIndex(0);
    setMaxTriviaIndex(usedIn.length);
    

  }, [data])
  
  const nextTrivia = () => {
    if (triviaIndex + 1 < maxTriviaIndex){
      setTriviaIndex(triviaIndex + 1)
    } else {
      setTriviaIndex(0)
    }
  }

  const prevTrivia = () => {
    if (triviaIndex - 1 > 0){
      setTriviaIndex(triviaIndex - 1)
    } else {
      setTriviaIndex(maxTriviaIndex-1)
    }
  }

  return (
    <div className="Trivia">
        <div className="wrapper">
          <div className="trivia-header">
            {elemPics && <img src={`/images/Elements/${picture}`} alt={data.name} />}
            <h2>{data.name}</h2>
          </div>
          <div className="desc-wrapper">
            <h3>Description:</h3>
            <p className="trivia-text">
                {data.description}
            </p>
          </div>
          <div className="DYK-wrapper">
            <h3>DID YOU KNOW?</h3>
            <div className="trivias-wrapper">
              <div className="prev-btn triv-btn" onClick={() => prevTrivia()}>
                <img src={Arrow} alt="" />
              </div>
              <div className="trivia-text">
                {usedIn[triviaIndex]}.
              </div>
              <div className="next-btn triv-btn" onClick={() => nextTrivia()}>
                <img src={Arrow} alt="" />
              </div>
            </div>
          </div>
        </div>
    </div>
  )
}

export default Trivia