import React from 'react';
import './AnswerModal.css';
import Star from '../Assets/Images/star.png';
import { useEffect } from 'react';

const AnswerModal = ({results, points, showModal, modalState}) => {

    useEffect(() => {
        if (modalState === true) {
            setTimeout(() => showModal(false), 3000);
        }
    }, [modalState]);

  return (
    <div className="answerModal-wrapper">
        <div className="answerModal">
            <h2 className={`result ${results}`}>
                {results === "correct" ? "CORRECT!" : "WRONG!"}
            </h2>
            {results === "correct" && 
            <div className="points">
                <img src={Star} alt="star" />
                <div className="plus">+{points}</div>
            </div>}
        </div>
    </div>
  )
}

export default AnswerModal