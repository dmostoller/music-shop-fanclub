import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import './semantic/dist/semantic.css'

import Nav from './components/Nav'
import Footer from './components/Footer'
import Shop from "./components/Shop";
import HomePage from "./components/HomePage";


function App() {
  return (
//   <div className="ui inverted segment">

  <div style={{backgroundColor: "#303030"}} className="App">
    <Nav />
    <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/shop" element={<Shop/>}/>
    </Routes>
    <Footer />
  </div>
  );
}

export default App;
