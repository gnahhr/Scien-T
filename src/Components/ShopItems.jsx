//TODOs
//Add Default Clothing
//
import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

//Components
import ShopItemContainer from './ShopItemContainer';
import ShopBuyModal from './ShopBuyModal';
import Toast from './Toast';

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

  //Add Default Values

  //Modal State
  const [ showModal, setShowModal ] = useState(false);

  //Toast State
  const [ showToast, setShowToast ] = useState(false);
  const [ toastMessage, setToastMessage ] = useState("");

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

    if ((total !== 0) || (tops.id !== "" || bottoms.id !== "" || accessories.id !== "")) {
      setHasTried(true);
    } else if (total === 0) {
      setHasTried(false);
    }
  }, [tops, bottoms, accessories])

  const tryItem = (item) => {
    const data = {
        id: item.id,
        dir: `./images${item.dir}/${item.image}`,
        image: `./images/Shop${item.dir}/${item.image}`,
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
    const filtered = [tops, bottoms, accessories].map(item => {
      if (item.owned === true) {
        return "";
      } else {
        return item.id;
      }
    })
  
    updateCharacter();
    buyAccessories(access, ...filtered, priceAll);
    setShowModal(false);
  }

  const updateCharacter = () => {
    let previewed = [tops.id, bottoms.id, accessories.id].filter((item) => item !== "");
    
    saveCharacter(access, gender, previewed, preview);
    setToastMessage("Character updated");
    setShowToast(true);
  }

  const saveOnClick = () => {
    const unownedArray = getShopUnowned();

    if (unownedArray.length > 0){
      setShowModal(true);
    } else {
      updateCharacter();
    }
  }

  const getShopUnowned = () => {
    const filtered = [tops, bottoms, accessories].filter(item => item.owned === false);
    return filtered;
  }

  return (
    <>
      <div className='shop-items-container'>
        {ownedTops && <ShopItemContainer category={"Tops"} items={"top"} model={gender} tryItem={tryItem} ownedClothes={ownedTops}/>}
        {ownedBots && <ShopItemContainer category={"Bottoms"} items={"bottom"} model={gender} tryItem={tryItem} ownedClothes={ownedBots}/>}
        {ownedAccs && <ShopItemContainer category={"Accessories"} items={"accessory"} model={gender} tryItem={tryItem} ownedClothes={ownedAccs}/>}
        {showModal && <ShopBuyModal showModal={setShowModal} clothes={getShopUnowned} buyClothes={buy}/>}
      </div>
      <div className="btn-group">
        <button className="fluid-btn" onClick={() => resetChar()}>Reset </button>
        <button className="fluid-btn save" onClick={() => saveOnClick()} disabled={!hasTried}>Save</button>
      </div>
      <Toast message={toastMessage} timer={3000} toastType={"success"} showToast={setShowToast} toastState={showToast}/>
    </>
  )
}

export default ShopItems