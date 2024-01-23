import React from "react";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import { Route, Routes } from "react-router-dom";
import Signup from "./components/Signup";
import Body from "./components/Body";
import './App.css';

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Homepage/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login/>} />
        <Route path="/user" element={<Body/>} />  
      </Routes>
    </>
  );
}

export default App;
