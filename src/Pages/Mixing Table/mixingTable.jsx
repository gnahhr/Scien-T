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
import sampleBGM from '../../Assets/Audio/sample-bgm.mp3'

//Components
import Elements from '../../Components/Elements.jsx';
import DiscoverList from '../../Components/DiscoverList.jsx';
import CompoundModal from '../../Components/CompoundModal.jsx';
import DiscoverModal from '../../Components/DiscoverModal.jsx';
import Toast from '../../Components/Toast.jsx';
import SideNav from '../../Components/SideNav.jsx';

//Design
import "./mixingTable.css";
import gear from "../../Assets/Images/gear.svg";
import listIcon from "../../Assets/Images/list-icon.svg";
import muted from "../../Assets/Images/muted.svg";
import unmuted from "../../Assets/Images/music.svg";
import ElemColors from '../../Data/ElemColors.js';


const mixingTable = () => {
  const navigate = useNavigate();
  const listElems = elements.elements;
  const bgm = useRef(new Audio(sampleBGM));
  const { familyBGs, familyBDs } = ElemColors;

  //Data States
  const [ mixData, setMixData ] = useState([]);
  const [ selectedCompound, setSelectedCompound] = useState([]);
  const [ knownCompound, setKnownCompound ] = useState([]);
  const [ newDiscover, setNewDiscover ] = useState("");

  // save user progress to the database
  const [access, setAccess] = useState('')

  //Modals
  const [ showModal, setShowModal ] = useState(false);
  const [ showDiscover, setShowDiscover ] = useState(false);
  const [ showNew, setShowNew ] = useState(false);
  const [ initMusic, setInitMusic ] = useState(false);
  const [ music, setMusic ] = useState(true);

  //Toast States
  const [ showToast, setShowToast ] = useState(false);
  const [ toastState, setToastState ] = useState("");
  const [ toastMsg, setToastMsg ] = useState("");


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
          //Change Known Compound to get data from something
          setKnownCompound(progress);
          getKnownCompound(progress);
        })();
      }
    }
  }, [])

  // useEffect(() => {
  //   console.log(mixData);
  // }, [mixData])

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
      prepToast("No compound of this mixture.", "warning");
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
        // pushMixElems(...mixed, access);
        // mixed.map((mixed)=>{
        //   console.log(mixed.name)
        // })
        // pushMixElems(...mixed.map((comp) => comp.name), access);
        const element = mixed.map((comp) => comp.name);
        console.log(element);
        pushMixElems(element, access);
        setNewDiscover(mixed);
        setShowNew(true); 
      } else {
        prepToast("You already discovered that compound!", "warning");
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

 //Start Music
  const startMusic = (bgm) => {
  //   if (!initMusic) {
  //     bgm.current.play()
  //     setInitMusic(true);
  //   }
  }

  // //Toggle Music
  const toggleMusic = (bgm) => {
  //   music ? bgm.current.pause() : bgm.current.play();
  //   setMusic(!music);
  }

  const removeElement = (element) => { 
    let newData = mixData.filter((cur) => cur !== element);
    setMixData(newData);
  }

  return (
    <main>
      <div className="main-header">
        <h1>Mixing Table</h1>
      </div>
      <div className="main-wrapper" onClick={() => startMusic(bgm)}>
          <div className="icons-wrapper">
            <div className="icon" onClick={() => toggleMusic(bgm)}><img src={music ? unmuted : muted}/></div>
            <div className="icon" onClick={() => setShowDiscover(!showDiscover)}><img src={listIcon}/></div>
            <div className="icon" ><img src={gear}/></div>
          </div>
        
          <div className="mixing-table">
            <div id="mixing-table" ref={drop}>
                {mixData.length > 0 ? mixData.map(element => <div key={element} className="element" onClick={() => removeElement(element)}>{element}</div>) : <h2>"Please drag elements here for mixing!"</h2>}
            </div>

            <button className="cta" onClick={() => {mixElems(mixData);}}>Mix</button>
          </div>

          <div id="periodic-table">

            {listElems.map(element => <Elements 
              key={element.name}
              symbol={element.symbol}
              xpos={element.xpos}
              ypos={element.ypos}
              category={element.category}
            />)}
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
    </main>
  )
}

export default mixingTable