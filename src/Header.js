//import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import logo from "./images/logo.png";

import "./App.css";

function App() {
  return (
    <>
      <img src={logo} className="dogThumbnail" />
      <h3>Adopt a dog!</h3>
      <ul>
        <li>
          <a href="/home">Home</a>
        </li>
        <li>
          <a href="/search">Adoptable Dogs</a>
        </li>
        <li>
          <a href="/about">About</a>
        </li>
      </ul>
    </>
  );
}

export default App;
