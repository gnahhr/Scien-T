import React from 'react';
import { ReactDOM } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";

//Drag and Drop
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

//Design
import Honeycombs from "./Assets/Images/honeycombs.svg";
import './App.css';

//Components
import Navbar from './Components/Navbar';

//Pages
import LandingPage from './Pages/Landing Page/landingPage';
import LoginPage from './Pages/Login/loginPage';
import RegisterPage from './Pages/Register/registerPage';
import MixingTable from './Pages/Mixing Table/mixingTable';
import Intelliment from './Pages/Intelliment/Intelliment';

function App() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <img src={Honeycombs} alt="honeycombs" className="honeycombs"/>
        <Navbar />
        {/* <MixingTable /> */}
        {/* <RegisterPage /> */}
        {/* <LoginPage /> */}
        <LandingPage />
        {/* <Intelliment /> */}
      </div>
    </DndProvider>
  );
}

export default App;
