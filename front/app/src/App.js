// import logo from './logo.svg';
import "./App.css";
import React from "react";
import { Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing";

import Details from "./pages/Details/Details";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" exact element={<Landing />} />
        <Route path="/product/details/:id" exact element={<Details />} />
      </Routes>
    </div>
  );

}

export default App;
