import React, { useEffect, useState } from 'react';
import { DndProvider, useDrop } from "react-dnd";
import { recipe } from '../../Data/Recipe.js';
import Elements from '../../Components/Elements.jsx';
import elements from '../../Data/PeriodicTableJSON.json';
import DiscoverList from '../../Components/DiscoverList.jsx';
import "./mixingTable.css";
import CompoundModal from '../../Components/CompoundModal.jsx';
import DiscoverModal from '../../Components/DiscoverModal.jsx';

const mixingTable = () => {
  const listElems = elements.elements;

  //Data
  const [ mixData, setMixData ] = useState([]);
  const [ selectedCompound, setSelectedCompound] = useState([]);
  const [ knownCompound, setKnownCompound ] = useState(["First", "Second"]);
  const [ newDiscover, setNewDiscover ] = useState("");

  //save user progress to the database
  // async function mixElements(element){                             
  //   const username = 'josh'
  //   const response = await fetch('/api/mixElements',{              remain as a comment until further notice - kagagawan ni juicewah
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({
  //       username,element
  //     })
  //   })
  // }

  //Modals
  const [ showModal, setShowModal ] = useState(false);
  const [ showDiscover, setShowDiscover ] = useState(false);
  const [ showNew, setShowNew ] = useState(false);

  const [{isOver}, drop ] = useDrop(() => ({
    accept: "element",
    drop: (item) => addElement(item.symbol),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }))

  useEffect(() => {
    if (mixData === []) {
      setMixData([]);
    }
  }, [mixData])


  //Add an element into mixData
  const addElement = (symbol) => {
    setMixData((mixData) => {
      if (mixData.length < 1){
        return [...mixData, symbol];
      } else if (!checkArray(symbol, mixData) && mixData.length < 6) {
        return [...mixData, symbol];
      } else {
        return [...mixData];
      }
    });
  }

  //Check mixData if there are any duplicate elements
  const checkArray = (symbol, currData) => {
    return currData.filter((element) => symbol === element).length > 0 ? true : false;
  }

  //Check if the selected elements form a compound
  const mixElems = (elemArr) => {
  	var mixed = recipe.filter((compound) => {
				if (compareElemArr(compound.elements.sort(), elemArr.sort())){
					return compound;
				}
  	});

  	if(mixed.length === 0){
  		alert("No compound of this mixture.")
  	} else {
      mixElements(mixed);
      setNewDiscover(mixed);
      setShowNew(true); 		
  	}
    setMixData([]);
  }

  

  //Compare elements on the mixing table to the recipes list
  const compareElemArr = (elemArr1, elemArr2) => {
  	for (var x = 0; x < elemArr1.length; x++){
  		if(elemArr1[x] !== elemArr2[x]){
  			return false;
  		}
  	}
  	return true;
  }

  return (
    <div>
        <div id="periodic-table">
          <div id="mixing-table" ref={drop}>
            {mixData.length > 0 ? mixData.map(element => <div key={element}>{element}</div>) : "Please drag elements here for mixing."}
          </div>

          <button id="mix-button" onClick={() => mixElems(mixData)}>Mix</button>

          {listElems.map(element => <Elements 
            key={element.name}
            symbol={element.symbol}
            xpos={element.xpos}
            ypos={element.ypos}
          />)}
        </div>
        
        {!showDiscover && <button onClick={() => setShowDiscover(true)}>List</button>}
        <DiscoverList knownCompound={listElems}
                      discoverState={showDiscover}
                      showDiscover={setShowDiscover}
                      selectedCompound={setSelectedCompound}
                      showModal={setShowModal} />

        {showModal && <CompoundModal showModal={setShowModal} data={selectedCompound} />}
        {showNew && <DiscoverModal showNew={setShowNew} data={newDiscover}/>}
    </div>
  )
}

export default mixingTable