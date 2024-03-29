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
import HitMale from '../../Assets/Images/hit-male.png';
import HitFemale from '../../Assets/Images/hit-female.png';

//Style
import './Shop.css';

//Hooks
import getCoins from '../../Hooks/getCoins';

const Shop = () => {
    //Data States
    const [ coins, setCoins ] = useState(0);
    const [ totalValue, setTotalValue ] = useState(0);
    const [ model, setModel ] = useState();
    const [ hitModel, setHitModel ] = useState();
    const [ profileModel, setProfileModel ] = useState();
    const [ preview, setPreview ] = useState(model);
    const [ hitPreview, setHitPreview ] = useState(hitModel);
    const [ profilePreview, setProfilePreview ] = useState(profileModel);

    //Query States
    const [ username, setUsername ] = useState('');
    const [ access, setAccess ]  = useState('');
    const [ gender, setGender ] = useState('');

    //Buy States
    const [ isBought, setIsBought ] = useState(false);

    useEffect(() => {
        if (isBought) {
            setCoins(coins - totalValue);
            setTotalValue(0);
            setIsBought(false);
        }
    }, [isBought, totalValue])

    useEffect(() => {
        const token = localStorage.getItem('token');
        const user = jwtDecode(token);
        setAccess(user.id);
        setUsername(user.username);
        setGender(user.gender);
        setModel(user.gender === "male" ? Male : Female);
        setPreview(user.gender === "male" ? Male : Female);
        setHitModel(user.gender === "male" ? HitMale : HitFemale);
        setHitPreview(user.gender === "male" ? HitMale : HitFemale);
        
        (async() => {
            const data =  await getCoins(user.id)
            setCoins(data)
        })();
    },[])


    //Condition for costume
    const tryMe = (data, isCostume = false) => {
        const sample = data.filter((x) => x !== "");
        model && mergeImages([model, ...sample]).then(b64 => setPreview(b64));
        model && mergeImages([hitModel, ...sample]).then(b64 => setHitPreview(b64));
        
        if(gender === 'male'){
            model && mergeImages([model, ...sample],{ width: 1000, height: 1100}).then(b64 => setProfilePreview(b64));
        }
        else if(gender === 'female'){
            model && mergeImages([model, ...sample],{ width: 1300, height: 1370}).then(b64 => setProfilePreview(b64));
        }
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
                            <img src={MoneyBag} alt="" className="money-bag"/>
                            <h1>{coins}</h1>
                        </div>
                    </div>
                    <div className='character-preview-container'>
                        {preview ? <img src={preview} alt='' /> : <Loader />}
                    </div>
                    <div className="totalValue">
                        <div className="label"><span>Total Value: </span></div>
                        <div className="value"><img src={MoneyBag} alt="" className="money-bag"/><span>{totalValue}</span></div>
                    </div>
                </div>
                <div className='right'>
                    <ShopItems tryMe={tryMe}
                               setTotal={setTotalValue}
                               access={access}
                               preview={preview}
                               hitPreview={hitPreview}
                               profilePreview={profilePreview}
                               gender={gender}
                               isBought={setIsBought}
                               boughtState={isBought}
                               coins={coins}/>
                </div>
            </div>
        </>
    )
}

export default Shop