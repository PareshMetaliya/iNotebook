import "./App.css";

import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Navbar from "./components/Navbar";
import NoteState from "./context/notes/NoteState";
import UserLogin from "./components/UserLogin";
import SignUp from "./components/SignUp";
import { Toaster } from 'react-hot-toast';
function App() {
  return (
    <>
    
      <NoteState>
        <Router>
          <div className="NavBar"><Navbar /></div>
          
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/login" element={<UserLogin />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </Router>
      </NoteState>
      <Toaster/>
    </>
  );
}

export default App;
