// Buy Functions
// -reduces player money
// -add itemIds to the player
//
// onClick modal
// -Buy Button for single buying
// -Try Button
//


//JuiceWah reminders
//-call mo nalang ulet getCoins, getAccessoriesOwned after mag buyAccessories


import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import mergeImages from 'merge-images';

//Componenst
import ShopItems from '../../Components/ShopItems'

//Assets
import MoneyBag from '../../Assets/Images/money-bag.png'
import Character1 from '../../Assets/Images/chuu-pewpew.png'
import Arrow from '../../Assets/Images/arrow.svg'

//Style
import './Shop.css'

//Hooks
import getCoins from '../../Hooks/getCoins'
import buyAccessories from '../../Hooks/buyAccessories';
import getAccessoriesOwned from '../../Hooks/getAccessoriesOwned';

const Shop = () => {
    //state
    const [ coins, setCoins ] = useState(0);
    const [ preview, setPreview ] = useState(Character1);
    const [ selectedItems, setSelectedItems ] = useState([]);
    const [ totalValue, setTotalValue ] = useState(0);
    const [ accessoriesOwned, setAccessoriesOwned ] = useState([])


    //
    const [ username, setUsername ] = useState('')
    const [ access, setAccess ]  = useState('')
    const [ gender, setGender ] = useState('')

    //Test Function
    const tryMe = (data) => {
        const sample = data.filter((x) => x !== "");
        mergeImages([Character1, ...sample]).then(b64 => setPreview(b64))
    }

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = jwtDecode(token);
        setAccess(user.id);
        setUsername(user.username);
        setGender(user.gender);
        
        (async() => {
            const data =  await getCoins(user.id)
            setCoins(data)
        })();

        (async() =>{
            const data =  await getAccessoriesOwned(user.id)
            setAccessoriesOwned(data)
        })();
        
    },[])

    useEffect(() => {
        console.log(accessoriesOwned)
    },[accessoriesOwned])


    return (
        <>
            <div className='main-header'>
                <h1>Shop</h1>
            </div>
            <div className='shop-wrapper'>
                <div className='left'>
                    <div className='user-info'>
                        <div className='upper-part'>
                            <h1>{username}</h1>
                        </div>

                        <div className='lower-part'>
                            <img src={MoneyBag} alt="" />
                            <h1>{coins}</h1>
                        </div>
                    </div>
                    <div className='character-preview-container'>
                        <img src={preview} alt='' />
                    </div>
                    <div className="totalValue">
                        <div className="label">Total Value: </div>
                        <div className="value">{totalValue}</div>
                    </div>
                </div>
                <div className='right'>
                    <ShopItems tryMe={tryMe} setTotal={setTotalValue}/>
                </div>
            </div>
        </>
    )
}

export default Shop