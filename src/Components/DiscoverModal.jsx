import React from 'react';
import "./DiscoverModal.css";

const DiscoverModal = ({showNew, data}) => {
  return (
    <div id="discover-modal">
        <div className="wrapper">
            <div className="exit" onClick={() => {showNew(false)}}>X</div>
            <div className="header">
                <div className="picture">Pic</div>
                <div className="text">
                    <h2 className="name">{data.name}</h2>
                    <h3 className="formula">You have discoverd a new compound!</h3>
                </div>
            </div>
        </div>
    </div>
  )
}

export default DiscoverModal