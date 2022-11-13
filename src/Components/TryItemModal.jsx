import React from 'react'

const TryItemModal = ({price, item}) => {
  return (
    <div className="modal-wrapper">
        <div className="tryItem">
            <div className="image">

            </div>
            <div className="price">

            </div>
            <div className="btn-wrapper">
                <button className="teal">Try</button>
                <button className="cta">Buy</button>
            </div>
        </div>
    </div>
  )
}

export default TryItemModal