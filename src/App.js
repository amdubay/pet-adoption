import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [pets, setPets] = useState(null); // this will become an array or object of pets. type to be decided
  const [zipcode, setZipcode] = useState(null); // self explanitory, this will manage user zipcode state

  // useState to query pets on page load, but will also query pets whenever the user enters their zipcode

  return <div className="App"></div>;
}

export default App;
