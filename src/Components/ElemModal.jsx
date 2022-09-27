import React from 'react'

const ElemModal = ({data}) => {
  return (
    <div className="elem-modal">
        <div className="wrapper">
            <div className="exit" onClick={() => {showModal(false)}}>X</div>
            <div className="header">
                <div className="picture">Pic</div>
                <div className="text">
                    <h2 className="name">{data.name}</h2>
                    <h3 id="symbol">{data.symbol}</h3>
                </div>
            </div>
            
            <div className="description">
                {data.description && data.description}
            </div>
        </div>
    </div>
  )
}

export default ElemModal