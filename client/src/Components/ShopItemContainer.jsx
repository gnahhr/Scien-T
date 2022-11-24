import React, { useState, useEffect } from 'react';

import Loader from '../Components/Loader';

const ShopItemContainer = ({category, items, tryItem, model, ownedClothes, Clothes}) => {
  const [ shopData, setShopData ] = useState();

  useEffect(() => {
    updateShop();
  }, [])

  useEffect(() => {
    updateShop();
  }, [ownedClothes])

  const updateShop = () => {
    setShopData(Clothes.filter((Clothe) => {
      if (Clothe.model === model && Clothe.category === items) {
        return Clothe
      }
    }).map(Clothe => {
      return {
        owned: ownedClothes.includes(Clothe.id),
        ...Clothe
      }
    }));
  }

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
                        {data.owned ? "OWNED" : data.price}
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