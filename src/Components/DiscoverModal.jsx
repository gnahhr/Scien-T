import React from 'react';
import "./DiscoverModal.css";

const DiscoverModal = ({showNew, data}) => {
  return (
    <div id="discover-modal">
        <div className="wrapper">
            <div className="exit" onClick={() => {showNew(false)}}>X</div>
            <div className="compound-wrapper">
                {data.map((compound) => {
                    return(
                    <div className="compound" key={compound.name}>
                        <div className="picture">
                            <img src={`/images/Compounds/${compound.compoundPic}`} alt="" />
                        </div>
                        <div className="text">
                            <h2 className="name">{compound.name}</h2>
                            <h3 className="formula">You have discoverd a new compound!</h3>
                        </div>
                    </div>
                )})}
            </div>
        </div>
    </div>
  )
}

export default DiscoverModal