import React, { useState } from 'react';

//Data
import {periodicTable as elements} from '../../Data/PeriodicTableJSON.js';

//Components
import PeriodicModal from '../../Components/PeriodicModal';
import NoDragElem from '../../Components/NoDragElem';
import ElemPopup from '../../Components/ElemPopup';
import SideNav from '../../Components/SideNav';

//Design
import './periodicTable.css';

const periodicTable = () => {
  const listElems = elements;
  const [ activeElem, setActiveElem ] = useState("");
  
  //Modal
  const [ showModal, setShowModal] = useState(false);

  const updateModal = (element) => {
    setActiveElem(element);
    setShowModal(true);
  }

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
                        <NoDragElem 
                            key={element.name}
                            symbol={element.symbol}
                            category={element.category}
                            elem={element}
                            clickAct={updateModal}
                            showModal={setShowModal}
                            />
                        <ElemPopup
                            key={`${element.name}-pop`}
                            ypos={element.ypos}
                            xpos={element.xpos}
                            element={element}/>
                    </div>)}
            </div>
        </div>
        {showModal &&
        <PeriodicModal data={activeElem} showModal={setShowModal}/>}
    </>
  )
}

export default periodicTable