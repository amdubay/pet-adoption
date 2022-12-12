//import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import logo from "./images/logo.png";
import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import { brand } from "./variables";

import "./App.css";

function App() {
  return (
    <div className="footer">
      <p>Copyright - {brand} - 2022</p>
      <ul>
        <li>
          <a href="/home">
            <FaFacebook />
          </a>
        </li>
        <li>
          <a href="/search">
            <FaInstagram />
          </a>
        </li>
        <li>
          <a href="/about">
            <FaTwitter />
          </a>
        </li>
      </ul>
    </div>
  );
}

export default App;
