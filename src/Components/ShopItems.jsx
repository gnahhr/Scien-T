import React, { useState, useEffect } from 'react'

//TODOs:
//Get Inventory/Bought Outfits
//Generate shop depending on bought outfits
//Yey

//Components
import ShopItemContainer from './ShopItemContainer'

//Data
import {shopItems} from '../Data/ShopItems';

//Style
import './ShopItems.css'

const ShopItems = ({setSelectedItems, tryMe}) => {
  //Shop Item States
  const [ tops, setTops ] = useState();
  const [ bottoms, setBottoms ] = useState();
  const [ accessories, setAccessories] = useState();

  //


  const tryItem = (itemType, itemId) => {
    console.log("Tried Item: ");
  }
  
  return (
    <>
      <div className='shop-items-container'>
        <ShopItemContainer category={"Tops"} items={"items"} tryItem={tryItem} something={tryMe}/>
        <ShopItemContainer category={"Bottoms"} items={"items"} something={tryMe}/>
        <ShopItemContainer category={"Accessories"} items={"items"} something={tryMe}/>
      </div>
      <div className="btn-group">
        <button className="fluid-btn">Cancel</button>
        <button className="fluid-btn save">Save</button>
      </div>
    </>
  )
}

export default ShopItems