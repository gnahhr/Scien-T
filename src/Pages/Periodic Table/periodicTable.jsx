import React from 'react';
import SideNav from '../../Components/SideNav';
import ElemPopup from '../../Components/ElemPopup';
import Elements from '../../Components/Elements';
import elements from '../../Data/PeriodicTableJSON.json';
import './periodicTable.css';

const periodicTable = () => {
  const listElems = elements.elements;
  return (
    <>
        <SideNav />
        <div className="main-header">
            <h1>Periodic Table</h1>
        </div>
        <div className="main-wrapper">
        <div id="periodic-table">
            {listElems.map(element =>
                <div className="elem-wrapper"
                     style={{
                        gridRow: element.ypos,
                        gridColumn: element.xpos
                    }}>
                    <Elements 
                        key={element.name}
                        symbol={element.symbol}
                        category={element.category}
                        />
                    <ElemPopup
                        key={`${element.name}-pop`}
                        ypos={element.ypos}
                        xpos={element.xpos}/>
                </div>)}
            
            
            </div>
        </div>
    </>
  )
}

export default periodicTable