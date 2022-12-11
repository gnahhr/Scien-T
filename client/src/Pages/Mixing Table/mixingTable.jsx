//Libraries
import React, { useState, useEffect, useRef } from 'react';
import { DndProvider, useDrop } from "react-dnd";
import { useNavigate } from 'react-router-dom'
import jwtDecode from "jwt-decode"

//Hooks
import pushMixElems from '../../Hooks/pushMixElems.js'
import getUserProgME from '../../Hooks/getUserProgME.js';

//Data
import elements from '../../Data/PeriodicTableJSON.json';
import { recipe } from '../../Data/Recipe.js';

//Components
import Elements from '../../Components/Elements.jsx';
import DiscoverList from '../../Components/DiscoverList.jsx';
import CompoundModal from '../../Components/CompoundModal.jsx';
import DiscoverModal from '../../Components/DiscoverModal.jsx';
import Toast from '../../Components/Toast.jsx';
import NoDragElem from '../../Components/NoDragElem.jsx';
import Legend from '../../Components/Legend.jsx';

//Design
import "./mixingTable.css";
import listIcon from "../../Assets/Images/list-icon.svg";
import Mix from "../../Assets/Images/mix.svg";


const mixingTable = () => {
  const navigate = useNavigate();
  const listElems = elements.elements;

  //Data States
  const [ mixData, setMixData ] = useState([]);
  const [ selectedCompound, setSelectedCompound] = useState([]);
  const [ knownCompound, setKnownCompound ] = useState([]);
  const [ filterElems, setFilterElems ] = useState([]);

  //Conditional States
  const [ newDiscover, setNewDiscover ] = useState("");
  const [ isDragElem, setIsDragElem ] = useState(false); 
  const [ mixState, setMixState ] = useState("noDrag");
  
  // save user progress to the database
  const [access, setAccess] = useState('')

  //Modals
  const [ showModal, setShowModal ] = useState(false);
  const [ showDiscover, setShowDiscover ] = useState(false);
  const [ showNew, setShowNew ] = useState(false);

  //Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastState, setToastState ] = useState("");
  const [ toastMsg, setToastMsg ] = useState("");

  //Drop module
  const [{isOver}, drop ] = useDrop(() => ({
    accept: "element",
    drop: (item) => addElement(item.symbol),
    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
    })
  }))

  //localStorage
  useEffect (() => {
    const token = localStorage.getItem('token');
    if (token){
      const user = jwtDecode(token)                                
      if(!user){
        localStorage.clear()
        navigate('/login')
      }
      else{
        setAccess(user.id);
        (async () => {
          const progress = await getUserProgME(user.id);
          getKnownCompound(progress);
        })();
      }
    }
  }, [])

  useEffect(() => {
    if (mixState === "noElem") {
      setTimeout(() => { dragStateToggle() }, 3000);
    } else {
      dragStateToggle(isDragElem);
    }
    
  }, [isDragElem, mixState])

  useEffect(() => {
    GetFilterElems();
  }, [mixData])

  const dragStateToggle = (param) => {
     param ? setMixState("drag") : setMixState("noDrag")
  }

  //Function to format toast message
  const prepToast = (message, toastState) => {
    setToastState(toastState);
    setToastMsg(message);
    setShowToast(true);
  }

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
      setMixState("noElem");
  	} else {
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
        const element = mixed.map((comp) => comp.name);
        pushMixElems(element, access);
        setNewDiscover(mixed);
        setShowNew(true); 
      } else {
        prepToast("You already mixed that compound!", "warning");
      }
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


  //Extract data from JS File to sync progress
  const getKnownCompound = (knownElems) => {
    let knownData = knownElems.map((known) => {
      let filtered = recipe.filter((data) => {
        if(known === data.name){
          return data;
        }
      });
      return filtered[0];
    });
    setKnownCompound(knownData);
  }

  const removeElement = (element) => { 
    let newData = mixData.filter((cur) => cur !== element);
    setMixData(newData);
  }

  const mixContent = {
    drag: "Drop the element here",
    noDrag: "Click and Drag the Elements here in the box to discover a new composition",
    noElem: "There is no compound of this mixture.",
    doneCom: "You have already mixed this compound"
  }

  const GetFilterElems = () => {
    let filtered = [];
    recipe.filter((filter) => {
      if (mixData.every(data => filter.elements.includes(data))){
        return filter;
      }
    }).every(data => filtered.push(...data.elements));
    filtered = [...new Set(filtered)];
    setFilterElems(filtered);
  }

  return (
    <>
      <div className="main-header">
        <h1>Mixing Table</h1>
      </div>
      <div className="main-wrapper">
          <div className="icons-wrapper">
            <div className="icon" onClick={() => setShowDiscover(!showDiscover)}><img src={listIcon}/></div>
          </div>
        
          <div className="mixing-table">
            <div id="mixing-table" className={mixState === "noElem" ? "wrong-mix" : ""} ref={drop}>
                {mixData.length > 0 ? mixData.map(element => <div key={element} className="element" onClick={() => removeElement(element)}>{element}</div>) : <h2>{mixContent[mixState]}</h2>}
            </div>

            <button className="cta" onClick={() => {mixElems(mixData);}}><img src={Mix} alt="Mix Icon" /></button>
          </div>

          <div id="periodic-table">
            <Legend />

            {listElems.map(element =>
              filterElems.includes(element.symbol) ?
              <Elements 
                key={element.name}
                symbol={element.symbol}
                xpos={element.xpos}
                ypos={element.ypos}
                category={element.category}
                isDragElem={setIsDragElem}
                addElement={addElement}
              />
              :
              <NoDragElem 
                key={element.name}
                symbol={element.symbol}
                xpos={element.xpos}
                ypos={element.ypos}
                tag={"unavailable"}
              />)
              
              }
          </div>
          
          <DiscoverList knownCompound={knownCompound}
                        discoverState={showDiscover}
                        showDiscover={setShowDiscover}
                        selectedCompound={setSelectedCompound}
                        showModal={setShowModal} />

          {showModal && <CompoundModal showModal={setShowModal} data={selectedCompound} />}
          {showNew && <DiscoverModal showNew={setShowNew} data={newDiscover}/>}
          
          <Toast message={toastMsg}
                timer={3000}
                toastType={toastState}
                showToast={setShowToast}
                toastState={showToast}/>
      </div>
    </>
  )
}

export default mixingTable