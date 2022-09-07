import React from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { ReactDOM } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Honeycombs from "./Assets/Images/honeycombs.svg";
import Navbar from './Components/Navbar';
import LandingPage from './Pages/Landing Page/landingPage';
import LoginPage from './Pages/Login/loginPage';
import RegisterPage from './Pages/Register/registerPage';
import MixingTable from './Pages/Mixing Table/mixingTable';
import './App.css';

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
      </div>
    </DndProvider>
  );
}

export default App;
