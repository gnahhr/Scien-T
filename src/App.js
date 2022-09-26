import React, { useEffect, useState } from 'react';
import { ReactDOM } from 'react';
import { Routes, Route } from "react-router-dom";
import jwtDecode from 'jwt-decode';

//Drag and Drop
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//Design
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
import Leaderboard from './Pages/Leaderboard/leaderboard';
import MainPage from './Pages/Main Page/mainPage';
import PeriodicTable from './Pages/Periodic Table/periodicTable';
import UserProfile from './Pages/User Profile/userProfile'

function App() {
  const [ user, setUser ] = useState(localStorage.token ? localStorage.token : null); //true

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">

        {/* <Navbar setUser={setUser}/> */}
        {!user && 
        <Routes>
          <Route index path="/" element={<LandingPage />} />
          <Route path="/register" element={<RegisterPage />}/>
          <Route path="/verify" element={<VerifyUser />} />
          <Route path="/login" element={<LoginPage setUser={setUser}/>} />
          <Route path="*" element={<LandingPage />}/> 
        </Routes>}
        
          
        {user &&
        <> 
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/mix" element={<MixingTable />} />
            <Route path="/intelliment" element={<Intelliment />} />
            <Route path="/electronConfiguration" element={<ElectronConfiguration />}/>
            <Route path="/periodicTable" element={<PeriodicTable />}/>
            <Route path="leaderboard" element={<Leaderboard />}/>
            {/* Placeholder for default logged in page */}
            <Route path="*" element={<MixingTable />}/> 
            <Route path="/profile" element={<UserProfile/>}/>
          </Routes>
          {/* <SideNav /> */}
        </>}
      </div>
    </DndProvider>
  );
}

export default App;
