//TODOs
//Refresh total values
//Something

import React, { useState, useEffect } from 'react'
import jwtDecode from 'jwt-decode'
import mergeImages from 'merge-images';

//Componenst
import ShopItems from '../../Components/ShopItems';
import Loader from '../../Components/Loader';

//Assets
import MoneyBag from '../../Assets/Images/money-bag.png';
import Male from '../../Assets/Images/male.png';
import Female from '../../Assets/Images/female.png';

//Style
import './Shop.css';

//Hooks
import getCoins from '../../Hooks/getCoins';


const Shop = () => {
    //Data States
    const [ coins, setCoins ] = useState(0);
    const [ totalValue, setTotalValue ] = useState(0);
    const [ model, setModel ] = useState();
    const [ preview, setPreview ] = useState(model);

    //Query States
    const [ username, setUsername ] = useState('')
    const [ access, setAccess ]  = useState('')
    const [ gender, setGender ] = useState('')

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = jwtDecode(token);
        setAccess(user.id);
        setUsername(user.username);
        setGender(user.gender);
        setModel(user.gender === "male" ? Male : Female);
        setPreview(user.gender === "male" ? Male : Female);
        console.log(user.gender);
        
        (async() => {
            const data =  await getCoins(user.id)
            setCoins(data)
        })();        
    },[])

    const tryMe = (data) => {
        const sample = data.filter((x) => x !== "");
        model && mergeImages([model, ...sample]).then(b64 => setPreview(b64));

        (async() => {
            const token = localStorage.getItem('token');
            const user = jwtDecode(token);
            const data =  await getCoins(user.id);
            setCoins(data);
        })();   
    }

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
                        {preview ? <img src={preview} alt='' /> : <Loader />}
                    </div>
                    <div className="totalValue">
                        <div className="label">Total Value: </div>
                        <div className="value">{totalValue}</div>
                    </div>
                </div>
                <div className='right'>
                    <ShopItems tryMe={tryMe}
                               setTotal={setTotalValue}
                               access={access}
                               preview={preview}
                               gender={gender}/>
                </div>
            </div>
        </>
    )
}

export default Shop