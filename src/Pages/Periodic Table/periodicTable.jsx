import React from 'react';
import SideNav from '../../Components/SideNav';
import Peekaboo from '../../Components/Peekaboo';
import './periodicTable.css';

const periodicTable = () => {
  return (
    <>
        <SideNav />
        <div className="pTable">
            <Peekaboo />
            <Peekaboo />
            <Peekaboo />
        </div>
    </>
  )
}

export default periodicTable