import React, { useState, useEffect } from 'react';

import Loader from '../Components/Loader';
import Clothes from '../Data/Clothes';

const ShopItemContainer = ({category, items, tryItem, model, owned}) => {
  const [ shopData, setShopData ] = useState();

  useEffect(() => {
    setShopData(Clothes.filter((Clothe) => {
      if (Clothe.model === model && Clothe.category === items) {
        return Clothe;
      }
    }))

    console.log("Owned: ", owned);
  }, [])

  return (
    <div className='category-and-items-container'>
        <div className='category-title'>
          <h1>{category}</h1>
        </div>
        <div className='items'>
            {shopData ? shopData.map((data) => 
                <div className="item" onClick={() => tryItem(data)} key={data.name}>
                    <div className="picture">
                        <img src={`./images/Shop${data.dir}/${data.image}`} alt="" />
                    </div>
                    <div className="price">
                        {owned.includes(data.id) ? "OWNED" : data.price}
                    </div>
                </div>
            ):
            <Loader />
            }
            
        </div>
      </div>
  )
}

export default ShopItemContainer