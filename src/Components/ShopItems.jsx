import React from 'react'

//Style
import './ShopItems.css'

const ShopItems = (setSelectedItems) => {
  return (
    <div className='shop-items-container'>
      <div className='category-and-items-container'>
        <div className='category-title'>
          <h1>Top</h1>
        </div>
        <div className='items'>
          <ul>
            <li>Chenalin</li>
            <li>Chenalin</li>
            <li>Chenalin</li>
            <li>Chenalin</li>
          </ul>
        </div>
      </div>

      <div className='category-and-items-container'>
        <div className='category-title'>
          <h1>Bottom</h1>
        </div>
        <div className='items'>
          <ul>
            <li>Chenalin</li>
            <li>Chenalin</li>
            <li>Chenalin</li>
            <li>Chenalin</li>
          </ul>
        </div>
      </div>

      <div className='category-and-items-container'>
        <div className='category-title'>
          <h1>Accessory</h1>
        </div>
        <div className='items'>
          <ul>
            <li>Chenalin</li>
            <li>Chenalin</li>
            <li>Chenalin</li>
            <li>Chenalin</li>
          </ul>
        </div>
      </div>

      <div className='btn-group'>
        <button>Cance</button>
        <button>Save</button>
      </div>

    </div>
  )
}

export default ShopItems