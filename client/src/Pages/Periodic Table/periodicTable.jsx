import React, { useState, useEffect } from 'react';

//Data
import {periodicTable as elements} from '../../Data/PeriodicTableJSON.js';
import {TriviasData} from '../../Data/Trivias.js';

//Components
import PeriodicModal from '../../Components/PeriodicModal';
import NoDragElem from '../../Components/NoDragElem';
import ElemPopup from '../../Components/ElemPopup';
import Legend from '../../Components/Legend.jsx';

//Design
import './periodicTable.css';

const periodicTable = () => {
  const listElems = elements;
  const [ activeElem, setActiveElem ] = useState("");
  const [ category, setCategory ] = useState("noble gas");
  const [ filtSearch, setFiltSearch ] = useState([]);

  const categories = [
    "diatomic nonmetal",
    "polyatomic nonmetal",
    "noble gas",
    "alkali metal",
    "alkaline earth metal",
    "transition metal",
    "post-transition metal",
    "metalloid",
    "actinide",
    "lanthanide",
  ]
  
  //Modal
  const [ showModal, setShowModal] = useState(false);
  
  const changeCategory = (category) => {
    setCategory(category)
  }

  const updateModal = (element) => {
    setActiveElem(element);
    setShowModal(true);
  }

  useEffect(() => {
    if (category === "") {
      setFiltSearch([]);
    } else {
      setFiltSearch(listElems.filter((data) => {
        if (data.category.toLowerCase().includes(category.toLowerCase())) {
          return data;
        }
      }))
    }
  }, [category]);

  return (
    <>
        <div className="main-header">
            <h1>Periodic Table</h1>
        </div>
        <div className="periodic-wrapper">
            <div id="periodic-table">
                <Legend />
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
                            />
                        <ElemPopup
                            key={`${element.name}-pop`}
                            ypos={element.ypos}
                            xpos={element.xpos}
                            element={element}
                            desc={TriviasData[element.number-1]}/>
                    </div>)}
            </div>

            <div id="periodic-table-mobile">
                <h2>Elements of the Periodic Table</h2>
                <form>
                    <label htmlFor="periodic-category">Category:</label>
                    <select
                        id="periodic-category" 
                        onChange={(e) => changeCategory(e.target.value)}
                        value={category}
                    >
                        {categories.map((category) => 
                            <option value={category}>{category}</option>
                        )}
                    </select>
                </form>
                {filtSearch.map(element =>
                <div className="elem-wrapper">
                    <button className=" button" key={element.name}
                        onClick={ () =>updateModal(element)}
                    >{element.name}</button>
                </div>)}
            </div>
        </div>
        {showModal &&
        <PeriodicModal data={activeElem} showModal={setShowModal}/>}
    </>
  )
}

export default periodicTable