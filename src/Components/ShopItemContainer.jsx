import React from 'react'

const ShopItemContainer = ({category, items, tryItem, something}) => {
  const data = [1,2,3,4,5,6,7,8,9,0];

  return (
    <div className='category-and-items-container'>
        <div className='category-title'>
          <h1>{category}</h1>
        </div>
        <div className='items'>
            {data.map((data) => 
                <div className="item" onClick={() => something(`${category} ${data}`)} key={data}>
                    <div className="picture">

                    </div>
                    <div className="price">
                        {data}
                    </div>
                </div>
            )}
            
        </div>
      </div>
  )
}

export default ShopItemContainer