import React, { useState } from 'react';
import { ReactDOM } from 'react';
import { Routes, Route } from "react-router-dom";

//Drag and Drop
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//Design
import Honeycombs from "./Assets/Images/honeycombs.svg";
import './Pages/global.css';
import './App.css';

//Components
import Navbar from './Components/Navbar';

//Pages
import LandingPage from './Pages/Landing Page/landingPage';
import LoginPage from './Pages/Login/loginPage';
import RegisterPage from './Pages/Register/registerPage';
import MixingTable from './Pages/Mixing Table/mixingTable';
import Intelliment from './Pages/Intelliment/Intelliment';
import ElectronConfiguration from './Pages/Electron Configuration/electronConfiguration'
import VerifyUser from './Pages/Verify User/verifyUser'
import SideNav from './Components/SideNav';


function App() {
  const [ user, setUser ] = useState(false);

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <img src={Honeycombs} alt="honeycombs" className="honeycombs"/>

        <Navbar />
        {!user && 
        <Routes>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/verify" element={<VerifyUser />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<LandingPage />}/> 
        </Routes>}
        
        
        {user &&
        <>
          <SideNav />
          <Routes>
            <Route path="/mix" element={<MixingTable />} />
            <Route path="/intelliment" element={<Intelliment />} />
            <Route path="/electronConfiguration" element={<ElectronConfiguration />}/>
            <Route path="/electronConfiguration" element={<ElectronConfiguration />}/>
            {/* Placeholder for default logged in page */}
            <Route path="*" element={<MixingTable />}/> 
          </Routes>
        </>}
      </div>
    </DndProvider>
  );
}

export default App;
