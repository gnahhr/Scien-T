import React from 'react';

//Images
import MoneyBag from '../Assets/Images/money-bag.png';

//css
import './ShopBuyModal.css';

const ShopBuyModal = ({showModal, clothes, buyClothes}) => {
  const buyClothing = clothes();

  return (
    <div className="modal-wrapper">
        <div className="shopbuy-modal">
            <div className="header">Buy Clothes</div>
            <div className="content">
                <div className="buy-wrapper">
                    {buyClothing && 
                        buyClothing.map((item) => 
                        <div className="buy-clothes-item" key={item.name}>
                            <div className="item-image">
                                <img src={item.image} alt={item.name} />
                            </div>
                            <div className="item-price">
                                <p>{item.price}</p>
                            </div>
                        </div>
                        )
                    }                
                </div>
                <div className="price">
                    <img src={MoneyBag} alt="" />
                    <h2>{buyClothing && buyClothing.map(cloth => cloth.price).reduce((cur, total) => cur + total, 0)}</h2>
                </div>
            </div>
            <div className="btn-wrapper">
                <button className="black"onClick={() => showModal(false)}>Cancel</button>
                <button className="teal" onClick={() => buyClothes() }>Yes</button>
            </div>
        </div>
    </div>
  )
}

export default ShopBuyModal