import React, { useState } from 'react';
import './BattleItemWindow.css';

//Images
import HealingPots from '../Assets/Images/healing-potion.svg';
import Fifty from '../Assets/Images/50-50.svg';
import SkipBomb from '../Assets/Images/bomb.svg';

const BattleItemWindow = ({ uItem, sfxClick }) => {
  const [ items, setItems ] = useState([
    {
        itemId: 1,
        name: "Healing Potion",
        qty: 1,
        desc: "Restore health to full.",
        img: HealingPots,
    },
    {
        itemId: 2,
        name: "50-50",
        qty: 1,
        desc: "Eliminate half of the choices.",
        img: Fifty,
    },
    {
        itemId: 3,
        name: "Smokescreen",
        qty: 1,
        desc: "Skip enemy",
        img: SkipBomb,
    }
  ])

  const useItem = (itemPassed, qty) => {
    sfxClick.play();
    setItems(items.map((item) => {
        if (item.itemId === itemPassed) {
            return {
                ...item,
                qty: 0,
            }
        } else {
            return item;
        }
     }))

    if (qty !== 0) {
        uItem(itemPassed);
    }
  }

  return (
    <div className="item-window">
        <div className="header">
            <h5 className="item-header">Items</h5>
        </div>
        <div className="items">
            {items && items.map((item) => 
                <div className="item" title={item.desc} onClick={() => useItem(item.itemId, item.qty)} disabled={item.qty > 0 ? false : true}>
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