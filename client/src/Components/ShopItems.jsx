import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

//Components
import ShopItemContainer from './ShopItemContainer';
import ShopBuyModal from './ShopBuyModal';
import Toast from './Toast';
import Loader from './Loader';

//Hooks
import buyAccessories from '../Hooks/buyAccessories';
import saveCharacter from '../Hooks/saveCharacter';
import getAccessoriesOwned from '../Hooks/getAccessoriesOwned';
import getAccessoriesEquipped from '../Hooks/getAccessoriesEquipped';

//Data
import Clothes from '../Data/Clothes';

//Style
import './ShopItems.css'

const template = {
  id: "",
  dir: "",
  price: 0,
};

const ShopItems = ({tryMe, setTotal, access, preview, hitPreview,  profilePreview, gender, isBought, boughtState, coins}) => {

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
  const [ equipTop, setEquipTop ] = useState(template);
  const [ equipBot, setEquipBot ] = useState(template);
  const [ equipAcc, setEquipAcc ] = useState(template);

  //Modal State
  const [ showModal, setShowModal ] = useState(false);

  //Toast State
  const [ showToast, setShowToast ] = useState(false);
  const [ toastMessage, setToastMessage ] = useState("");
  const [ toastType, setToastType ] = useState("");

  //ButtonState
  const [ hasTried, setHasTried ] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);
    
    setOwnedItems(user.id);

    (async() =>{
      const data =  await getAccessoriesEquipped(user.id);

      setEquipTop(getEquipped("top",data.topEquipped[0]));
      setEquipBot(getEquipped("bottom", data.bottomEquipped[0]));
      setEquipAcc(getEquipped("accessory", data.accessoryEquipped[0]));
      setTops(getEquipped("top",data.topEquipped[0]));
      setBottoms(getEquipped("bottom", data.bottomEquipped[0]));
      setAccessories(getEquipped("accessory", data.accessoryEquipped[0]));
  })();

  }, [])

  useEffect(() => {
    if (boughtState){
      const token = localStorage.getItem('token');
      const user = jwtDecode(token);
      setOwnedItems(user.id);
    }
  }, [boughtState])

  useEffect(() => {
    const total = tops.price + bottoms.price + accessories.price;
    
    tryMe([
      tops.dir,
      bottoms.dir,
      accessories.dir
    ])

    setPriceAll(total);
    setTotal(total);

    if ((tops.id !== equipTop.id) || (bottoms.id !== equipBot.id) || (accessories.id !== equipAcc.id)) {
      setHasTried(true);
    } else if (total === 0) {
      setHasTried(false);
    }
  }, [tops, bottoms, accessories])

  const getEquipped = (category, id) => {
    if (id === "" || id === undefined) {
      return template;
    }

    const data = Clothes
    .filter((Clothe) => (Clothe.category === category) && (Clothe.id === id))
    .map(Clothe => {
      return {
        ...Clothe,
        owned: true,
        price: 0,
        dir: `./images${Clothe.dir}/${Clothe.image}`,
      }
    });
    
    return data[0];
  }

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

  const setOwnedItems = async (id) => {
    const data =  await getAccessoriesOwned(id);
    setOwnedTops(data.topOwned);
    setOwnedBots(data.bottomOwned);
    setOwnedAccs(data.accessoryOwned);
  }
  
  const resetChar = () => {
    setAccessories(equipAcc);
    setTops(equipTop);
    setBottoms(equipBot);
  }

  const clearChar = () => {
    setAccessories(template);
    setTops(template);
    setBottoms(template);
  }

  const buy = () => {
    if (priceAll <= coins) {
      const filtered = [tops, bottoms, accessories].map(item => {
        if (item.owned === true) {
          return "";
        } else {
          return item.id;
        }
      })
    
      updateCharacter();
      buyAccessories(access, ...filtered, priceAll);
      isBought(true);
      setShowModal(false);
    } else {
      setToastMessage("Insufficient Money");
      setToastType("warning");
      setShowToast(true);
    }
  }

  const updateCharacter = () => {
    let previewed = [tops.id, bottoms.id, accessories.id];
    
    setEquipTop(tops);
    setEquipBot(bottoms);
    setEquipAcc(accessories);
    setHasTried(false);

    saveCharacter(access, gender, ...previewed, preview, hitPreview, profilePreview);
    setToastMessage("Character updated");
    setToastType("success");
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
        {ownedTops ? <ShopItemContainer category={"Tops"} Clothes={Clothes} items={"top"} model={gender} tryItem={tryItem} ownedClothes={ownedTops}/> : <Loader />}
        {ownedBots ? <ShopItemContainer category={"Bottoms"} Clothes={Clothes} items={"bottom"} model={gender} tryItem={tryItem} ownedClothes={ownedBots}/> : <Loader />}
        {ownedAccs ? <ShopItemContainer category={"Accessories"} Clothes={Clothes} items={"accessory"} model={gender} tryItem={tryItem} ownedClothes={ownedAccs}/> : <Loader />}
        {showModal ? <ShopBuyModal showModal={setShowModal} clothes={getShopUnowned} buyClothes={buy}/> : <Loader />}
      </div>
      <div className="btn-group">
        <button className="fluid-btn" onClick={() => clearChar()}>Clear </button>
        <button className="fluid-btn" onClick={() => resetChar()}>Reset </button>
        <button className="fluid-btn save" onClick={() => saveOnClick()} disabled={!hasTried}>Save</button>
      </div>
      <Toast message={toastMessage} timer={3000} toastType={toastType} showToast={setShowToast} toastState={showToast}/>
    </>
  )
}

export default ShopItems