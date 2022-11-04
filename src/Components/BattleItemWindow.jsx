import React from 'react';
import './BattleItemWindow.css';

//Images
import HealingPots from '../Assets/Images/healing-potion.svg';
import Fifty from '../Assets/Images/50-50.svg';
import SkipBomb from '../Assets/Images/bomb.svg';

const BattleItemWindow = ({ toggleWindow, useItem}) => {
  const items = [
    {
        itemId: 1,
        name: "Healing Potion",
        qty: 100,
        img: HealingPots,
    },
    {
        itemId: 2,
        name: "50-50",
        qty: 100,
        img: Fifty,

    },
    {
        itemId: 3,
        name: "Smokescreen",
        qty: 100,
        img: SkipBomb,
    }
  ]

  return (
    <div className="item-window">
        <div className="header">
            <h5 className="item-header">Items</h5>
            <div className="exit-button" onClick={() => toggleWindow(false)}>x</div>
        </div>
        <div className="items">
            {items.map((item) => 
                <div className="item">
                    <img src={item.img} alt={""} />
                    <div className="item-name">{item.name}</div>
                    <div className="item-qty">x{item.qty}</div>
                </div>
            )}
        </div>
        
    </div>
  )
}

export default BattleItemWindow