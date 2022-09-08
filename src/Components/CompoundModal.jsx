import React from 'react';
import "./CompoundModal.css";

const CompoundModal = ({showModal, data}) => {

  return (
    <div id="compound-modal" onClick={() => {showModal(false)}}>
        <div className="wrapper">
            <div className="exit" onClick={() => {showModal(false)}}>X</div>
            <div className="header">
                <div className="picture">Pic</div>
                <div className="text">
                    <h2 className="name">{data.name}</h2>
                    <h3 className="formula">Formula</h3>
                </div>
            </div>
            
            <p className="description">Lorem ipsum dolor sit amet consectetur adipisicing elit.
            Praesentium iusto laborum, repudiandae facilis dolores fugit tempore molestias,
            dignissimos dolorem necessitatibus quam consequuntur doloremque nisi quasi facere porro,
            reiciendis ipsum repellat.</p>
        </div>
    </div>
  )
}

export default CompoundModal