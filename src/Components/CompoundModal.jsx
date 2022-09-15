import React, { useEffect } from 'react';
import "./CompoundModal.css";

const CompoundModal = ({showModal, data}) => {

  useEffect(() => {
    //Output formula correctly on HTML
    document.getElementById("formula").innerHTML = data.formula;
  }, [])

  return (
    <div id="compound-modal">
        <div className="wrapper">
            <div className="exit" onClick={() => {showModal(false)}}>X</div>
            <div className="header">
                <div className="picture">Pic</div>
                <div className="text">
                    <h2 className="name">{data.name}</h2>
                    <h3 id="formula"></h3>
                </div>
            </div>
            
            <div className="description">{data.description.map(description => <p key={Math.random()}>{description}</p>)}</div>
        </div>
    </div>
  )
}

export default CompoundModal