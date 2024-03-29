import React from 'react';
import "./DiscoverList.css";

const DiscoverList = ({knownCompound, showDiscover, discoverState, selectedCompound, showModal}) => {
    
  const selected = (element) => {
    selectedCompound(element);
    showModal(true);
  }

  console.log(knownCompound);


  return (
    <div id="discover-list" className={discoverState ? "" : "hidden"}>
        <div id="exit-icon" onClick={() => showDiscover(false)}>X</div>
        <div id="total">{knownCompound.length}/273</div>
        <div className="title">
            <h2>Mix List</h2>
        </div>
        <div className="elements">
            {knownCompound.length > 0 ? knownCompound.map((element) => <div className="known-elem" key={element.name} onClick={() => selected(element)}>{element.name}</div>) : <div>"Discovered compounds will be found here."</div>}
        </div>
    </div>
  )
}

export default DiscoverList