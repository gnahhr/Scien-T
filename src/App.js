import React from 'react';
import { ReactDOM } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Honeycombs from "./Assets/Images/honeycombs.svg";
import Navbar from './Components/Navbar';
import LandingPage from './Pages/Landing Page/landingPage';
import './App.css';

function App() {
  return (
    <div className="App">
      <img src={Honeycombs} alt="honeycombs" className="honeycombs"/>
      <Navbar />
      <LandingPage />
    </div>
  );
}

export default App;
