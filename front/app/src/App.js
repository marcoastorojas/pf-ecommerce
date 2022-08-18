// import logo from './logo.svg';
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import LogIn from "./pages/LogIn"
import React from "react";

function App() {
 return (
  <div className="App">
   <Routes>
    <Route exact path="/" element={<Landing />} />
    <Route path="/log-in" exact element={<LogIn />} />
   </Routes>
  </div>
 );
}

export default App;
