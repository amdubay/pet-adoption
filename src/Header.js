//import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import logo from "./images/logo.png";

import "./App.css";

function App() {
  return (
    <div className="header">
      <img src={logo} className="headerLogo" />
      <p>website/project under construction</p>

      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/search">Find A Dog</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </div>
  );
}

export default App;
