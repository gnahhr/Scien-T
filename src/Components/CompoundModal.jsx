import React from 'react';
import "./CompoundModal.css";

const CompoundModal = ({showModal, data}) => {

  return (
    <div id="compound-modal">
        <div className="wrapper">
            <div className="exit" onClick={() => {showModal(false)}}>X</div>
            <div className="header">
                <div className="picture">Pic</div>
                <div className="text">
                    <h2 className="name">{data.name}</h2>
                    <h3 className="formula">{data.formula}</h3>
                </div>
            </div>
            
            <p className="description">{data.description}</p>
        </div>
    </div>
  )
}

export default CompoundModal