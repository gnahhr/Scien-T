//Fix Genders
//Try item modals
//Get equipped damits
import React, { useState, useEffect } from 'react'

//Components
import ShopItemContainer from './ShopItemContainer'
import TryItemModal from './TryItemModal';

//Hooks
import buyAccessories from '../Hooks/buyAccessories';
import saveCharacter from '../Hooks/saveCharacter';


//Style
import './ShopItems.css'

const template = {
  id: "",
  dir: "",
  price: 0,
};

const ShopItems = ({tryMe, setTotal, access, preview, gender, owned}) => {
  //Tried Item States
  const [ tops, setTops ] = useState(template);
  const [ bottoms, setBottoms ] = useState(template);
  const [ accessories, setAccessories] = useState(template);
  const [ priceAll, setPriceAll ] = useState(0);

  //Owned Items
  const [ ownedTops, setOwnedTops ] = useState();
  const [ ownedBots, setOwnedBots ] = useState();
  const [ ownedAccs, setOwnedAccs ] = useState();

  //Modal State
  const [ showModal, setShowModal ] = useState(false);

  //ButtonState
  const [ hasTried, setHasTried ] = useState(false);

  useEffect(() => {
    setOwnedTops(owned.filter(own => {
      if (own[0] === "2") {
        return own;
      }
    }))

    console.log("Set Owned Tops: ", owned.filter(own => {
      console.log("Array1: ", own);
      if (own[0] === "2") {
        return own;
      }
    }))

    setOwnedBots(owned.filter(own => {
      if (own[0] === "3") {
        return own;
      }
    }))

    setOwnedAccs(owned.filter(own => {
      if (own[0] === "1") {
        return own;
      }
    }))
  }, [])

  useEffect(() => {
    const total = tops.price + bottoms.price + accessories.price;

    tryMe([
      tops.dir,
      bottoms.dir,
      accessories.dir
    ])

    setPriceAll(total);
    setTotal(total);

    if (total !== 0) {
      setHasTried(true);
    } else if (total === 0) {
      setHasTried(false);
    }
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

  const buy = () => {
    let previewed = [tops.id, bottoms.id, accessories.id].filter((item) => item !== "");

    if (previewed.length !== 0){
      saveCharacter(access, gender, previewed, preview);
      buyAccessories(access, previewed, priceAll);
    }
  }

  return (
    <>
      <div className='shop-items-container'>
        <ShopItemContainer category={"Tops"} items={"top"} model={"boy"} tryItem={tryItem} owned={ownedTops}/>
        <ShopItemContainer category={"Bottoms"} items={"bottom"} model={"boy"} tryItem={tryItem} owned={ownedBots}/>
        <ShopItemContainer category={"Accessories"} items={"accessory"} model={"boy"} tryItem={tryItem} owned={ownedAccs}/>
        {showModal && <TryItemModal showModal={setShowModal}/>}
      </div>
      <div className="btn-group">
        <button className="fluid-btn" onClick={() => resetChar()}>Reset </button>
        <button className="fluid-btn save" onClick={() => buy()} disabled={!hasTried}>Save</button>
      </div>
    </>
  )
}

export default ShopItems