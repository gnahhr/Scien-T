//Fix Genders
//Try item modals
//
import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

//Components
import ShopItemContainer from './ShopItemContainer'
import TryItemModal from './TryItemModal';

//Hooks
import buyAccessories from '../Hooks/buyAccessories';
import saveCharacter from '../Hooks/saveCharacter';
import getAccessoriesOwned from '../Hooks/getAccessoriesOwned';



//Style
import './ShopItems.css'

const template = {
  id: "",
  dir: "",
  price: 0,
};

const ShopItems = ({tryMe, setTotal, access, preview, gender}) => {
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
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);

    (async() =>{
        const data =  await getAccessoriesOwned(user.id)
        setOwnedTops(data.topOwned)
        setOwnedBots(data.bottomOwned)
        setOwnedAccs(data.accessoryOwned)
    })();
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
        price: item.owned ? 0 : item.price,
        owned: item.owned
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
      //Get don't add owned items to buy somethings;
      saveCharacter(access, gender, previewed, preview);
      buyAccessories(access, tops, bottoms, accessories, priceAll);
    }
  }

  return (
    <>
      <div className='shop-items-container'>
        {ownedTops && <ShopItemContainer category={"Tops"} items={"top"} model={"boy"} tryItem={tryItem} owned={ownedTops}/>}
        {ownedBots && <ShopItemContainer category={"Bottoms"} items={"bottom"} model={"boy"} tryItem={tryItem} owned={ownedBots}/>}
        {ownedAccs && <ShopItemContainer category={"Accessories"} items={"accessory"} model={"boy"} tryItem={tryItem} owned={ownedAccs}/>}
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