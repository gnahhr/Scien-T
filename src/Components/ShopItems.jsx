import React, { useState, useEffect } from 'react'

//Components
import ShopItemContainer from './ShopItemContainer'

//Style
import './ShopItems.css'

const template = {
  id: "",
  dir: "",
  price: 0,
};

const ShopItems = ({tryMe, setTotal}) => {
  //Tried Item States
  const [ tops, setTops ] = useState(template);
  const [ bottoms, setBottoms ] = useState(template);
  const [ accessories, setAccessories] = useState(template);

  useEffect(() => {
    tryMe([
      tops.dir,
      bottoms.dir,
      accessories.dir
    ])

    setTotal(tops.price + bottoms.price + accessories.price);
  }, [tops, bottoms, accessories])

  const tryItem = (item) => {
    const data = {
        id: item.id,
        dir: `./images${item.dir}/${item.image}`,
        price: item.price
    };

    if (item.category === "top") {
      setTops(data);
    } else if (item.category === "bottom") {
      setBottoms(data);
    } else if (item.category === "accessory") {
      setAccessories(data);
    }
  }
  
  const resetChar = () => {
    setAccessories(template);
    setTops(template);
    setBottoms(template);
  }

  return (
    <>
      <div className='shop-items-container'>
        <ShopItemContainer category={"Tops"} items={"top"} model={"boy"} tryItem={tryItem}/>
        <ShopItemContainer category={"Bottoms"} items={"bottom"} model={"boy"} tryItem={tryItem}/>
        <ShopItemContainer category={"Accessories"} items={"accessory"} model={"boy"} tryItem={tryItem}/>
      </div>
      <div className="btn-group">
        <button className="fluid-btn" onClick={() => resetChar()}>Reset </button>
        <button className="fluid-btn save">Save</button>
      </div>
    </>
  )
}

export default ShopItems