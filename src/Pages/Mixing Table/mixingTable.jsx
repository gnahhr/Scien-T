//Libraries
import React, { useState, useEffect } from 'react';
import { DndProvider, useDrop } from "react-dnd";
import { useNavigate } from 'react-router-dom'
import jwt_decode from "jwt-decode"

//Hooks
import pushEProg from '../../Hooks/pushEProg.js'
import getUserProgME from '../../Hooks/getUserProgME.js';

//Data
import elements from '../../Data/PeriodicTableJSON.json';
import { recipe } from '../../Data/Recipe.js';

//Components
import Elements from '../../Components/Elements.jsx';
import DiscoverList from '../../Components/DiscoverList.jsx';
import CompoundModal from '../../Components/CompoundModal.jsx';
import DiscoverModal from '../../Components/DiscoverModal.jsx';

//Design
import "./mixingTable.css";
import gear from "../../Assets/Images/gear.svg";
import listIcon from "../../Assets/Images/list-icon.svg";
import muted from "../../Assets/Images/muted.svg";
import unmuted from "../../Assets/Images/music.svg";


const mixingTable = () => {
  const navigate = useNavigate()
  const listElems = elements.elements;

  //Data States
  const [ mixData, setMixData ] = useState([]);
  const [ selectedCompound, setSelectedCompound] = useState([]);
  const [ knownCompound, setKnownCompound ] = useState([]);
  const [ newDiscover, setNewDiscover ] = useState("");
  const [ userProgress, setUserProgress] = useState({})

  // save user progress to the database
  const [access, setAccess] = useState('')
  
  //localStorage
  useEffect (() => {
    const token = localStorage.getItem('token')
    if (token){
      const user = jwt_decode(token)                                
      if(!user){
        localStorage.clear()
        navigate('/login')
      }
      else{
        setAccess(user.id)
        setUserProgress(getUserProgME(access))
      }
    }
  }, [mixData])

  //Modals
  const [ showModal, setShowModal ] = useState(false);
  const [ showDiscover, setShowDiscover ] = useState(false);
  const [ showNew, setShowNew ] = useState(false);
  const [ music, setMusic ] = useState(true);

  const [{isOver}, drop ] = useDrop(() => ({
    accept: "element",
    drop: (item) => addElement(item.symbol),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }))

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

   //Check if the selected elements form a compound
   const mixElems = (elemArr) => {
    let flag = true;
    if (elemArr.length === 0) {
      return;
    }

  	let mixed = recipe.filter((compound) => {
				if (compareElemArr(compound.elements.sort(), elemArr.sort())){
					return compound;
				}
  	});

  	if(mixed.length === 0){
  		alert("No compound of this mixture.");
  	} else {
      pushEProg(...mixed,access);
      setKnownCompound((knownCompound) => {
        if (knownCompound.length < 1){
          return [...knownCompound, ...mixed];
        } else if (!checkCompounds(mixed, knownCompound)) {
          return [...knownCompound, ...mixed];
        } else {
          return [...knownCompound];
        }
      });	
      
      //Just show modal if newly discovered
      if (!checkCompounds(mixed, knownCompound)) {
        setNewDiscover(mixed);
        setShowNew(true); 
      }
      
      // mixElements(mixed); remain as a comment until further notice - kagagawan ni juicewah
  	}
    
    setMixData([]);
  }

  //Check mixData if there are any duplicate elements
  const checkArray = (symbol, currData) => {
    return currData.filter((element) => symbol === element).length > 0 ? true : false;
  }

  //Check knownCompound if there's duplicate known compound
  const checkCompounds = (mixed, listCompound) => {
    if (mixed)
    return listCompound.filter((compound) => mixed[0].name === compound.name).length > 0 ? true : false;
  }
  

  //Compare elements on the mixing table to the recipes list
  const compareElemArr = (elemArr1, elemArr2) => {
    let flag = true;
    if (elemArr1.length === elemArr2.length){
      for (let x = 0; x < elemArr1.length; x++){
        if(elemArr1[x] !== elemArr2[x]){
          flag = false;
        }
      }
    } else {
      flag = false;
    }
  	
  	return flag;
  }

  //Toggle Music
  const toggleMusic = () => {
    setMusic(!music);
  }

  return (
    <div className="main-wrapper">
        <div className="icons-wrapper">
          <div className="icon" onClick={() => toggleMusic()}><img src={music ? unmuted : muted}/></div>
          <div className="icon" onClick={() => setShowDiscover(!showDiscover)}><img src={listIcon}/></div>
          <div className="icon" ><img src={gear}/></div>
        </div>
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
        
        <DiscoverList knownCompound={knownCompound}
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