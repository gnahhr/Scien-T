import React, { useState } from 'react'
import jwtDecode from 'jwt-decode'

//Componenst
import ShopItems from '../../Components/ShopItems'

//Assets
import MoneyBag from '../../Assets/Images/money-bag.png'
import Character1 from '../../Assets/Images/chuu-pewpew.png'
import Arrow from '../../Assets/Images/arrow.svg'

//Style
import './Shop.css'
import { useEffect } from 'react'

const Shop = () => {
    //state
    const [ coins, setCoins ] = useState(999999)
    const [ selectedItems, setSelectedItems ] = useState(null)

    //
    const [ username, setUsername ] = useState('')
    const [ access, setAccess ]  = useState('')

    useEffect(() => {
    const token = localStorage.getItem('token')
    const user = jwtDecode(token)
    setAccess(user.id)
    setUsername(user.username)
    },[])


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
                        <img src={Character1} alt='' />
                        <div className='circular-platform'></div>
                    </div>

                </div>
                <div className='left'>
                    <ShopItems selectedItems={setSelectedItems}/>
                </div>
            </div>
        </>
    )
}

export default Shop