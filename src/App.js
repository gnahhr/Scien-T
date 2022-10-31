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
import FindYourAccount from './Pages/Find Your Account/findYourAccount'
import ForgotPasswordOTP from './Pages/Forgot Password - OTP/forgotPasswordOTP';
import ForgotPassword from './Pages/Forgot Password/forgotPassword'
import MixingTable from './Pages/Mixing Table/mixingTable';
import Intelliment from './Pages/Intelliment/Intelliment';
import ElectronConfiguration from './Pages/Electron Configuration/electronConfiguration'
import VerifyUser from './Pages/Verify User/verifyUser'
import SideNav from './Components/SideNav';
import Leaderboard from './Pages/Leaderboard/leaderboard';
import MainPage from './Pages/Main Page/mainPage';
import PeriodicTable from './Pages/Periodic Table/periodicTable';
import UserProgress from './Pages/User Progress/userProgress';
import Trivias from './Pages/Trivias/Trivias';
import UserProfile from './Pages/User Profile/userProfile';
import AboutUs from './Pages/About Us/aboutUs';
import TestBattle from './Pages/Test-Battle/TestBattle';
import MixDash from './Pages/MixDash/MixDash';

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
          <Route path="/forgotPassword" element={<ForgotPassword/>} />
          <Route path="/forgotPasswordOTP" element ={<ForgotPasswordOTP/>} />
          <Route path="/findYourAccount" element={<FindYourAccount/>} />
          <Route path="*" element={<LandingPage />}/> 
        </Routes>}
        
          
        {user &&
        <> 
          <SideNav >
            <Routes>
              <Route path="/" element={<MainPage />} />
              <Route path="/mix" element={<MixingTable />} />
              <Route path="/intellimentCategory" element={<Intelliment mode="learn"/>} />
              <Route path="/intelliment" element={<Intelliment mode="game"/>} />
              <Route path="/electronConfiguration" element={<ElectronConfiguration />}/>
              <Route path="/periodicTable" element={<PeriodicTable />}/>
              <Route path="/trivias/" element={<Trivias/>}/>
              <Route path="/trivias/:element" element={<Trivias/>}/>
              <Route path="/leaderboard" element={<Leaderboard />}/>
              <Route path="/testBattle" element={<TestBattle />}/>
              <Route path="/profile" element={<UserProfile />}/>
              <Route path="/progress" element={<UserProgress/>}/>
              <Route path="/about" element={<AboutUs/>}/>
              <Route path="/mixDash" element={<MixDash />}/> 
              <Route path="*" element={<MixingTable />}/> 
            </Routes>
          </SideNav>
          {/* <SideNav /> */}
        </>}
      </div>
    </DndProvider>
  );
}

export default App;
