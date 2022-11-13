import React, { useState, useEffect } from 'react';
import jwtDecode from 'jwt-decode';

//Hooks
import getCoins from '../Hooks/getCoins';

//Images
import MoneyBag from '../Assets/Images/money-bag.png';

//css
import './UnlockStageModal.css';


const UnlockStageModal = ({stage, topic, price, showModal}) => {
  //Get Total Coins
  //
  const [ username, setUsername ] = useState('');
  const [ access, setAccess ]  = useState('');
  const [ coins, setCoins ] = useState(0);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = jwtDecode(token);

    setAccess(user.id);
    setUsername(user.username);
    
    (async() => {
        const data =  await getCoins(user.id);
        setCoins(data);
    })();

  },[])

  const unlockStage = () => {
    console.log("Unlock")
  }

  return (
    <div className="modal-wrapper">
        <div className='user-info'>
            <div className='upper-part'>
                <h1>{username}</h1>
            </div>

            <div className='lower-part'>
                <img src={MoneyBag} alt="" />
                <h1>{coins}</h1>
            </div>
        </div>
        <div className="unlockStage">
            <div className="header">Unlock</div>
            <div className="content">
                <div className="unlock-data">
                    {topic && <div className="topic">{topic}</div>}
                    <div className="stage">Stage {stage}</div>
                </div>
                <div className="price">
                    <img src={MoneyBag} alt="" />
                    <h2>{price}</h2>
                </div>
            </div>
            <div className="btn-wrapper">
                <button className="black"onClick={() => showModal(false)}>Cancel</button>
                <button className="teal" onClick={() => unlockStage()}>Yes</button>
            </div>
        </div>
    </div>
  )
}

export default UnlockStageModal