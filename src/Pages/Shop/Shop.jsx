import React, { useState } from 'react'

//Componenst
import ShopItems from '../../Components/ShopItems'

//Assets
import MoneyBag from '../../Assets/Images/money-bag.png'
import Character from '../../Assets/Images/chuu-pewpew.png'

//Style
import './Shop.css'

const Shop = () => {
    const [ coins, setCoins ] = useState(999999)
    const [ username, setUsername ] = useState('michenne')

    return (
        <>
            <div className='main-header'>
                <h1>Shop</h1>
            </div>
            <div className='shop-wrapper'>
                <div className='right'>
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
                        <img src={Character} alt='' />
                    </div>
                </div>
                <div className='left'>
                    <ShopItems/>
                </div>
            </div>
        </>
    )
}

export default Shop