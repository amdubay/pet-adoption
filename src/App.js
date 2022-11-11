//import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PetList from "./petList";

function App() {
  const [pets, setPets] = useState([]);
  const [zipcode, setZipcode] = useState();
  //const [distance, setDistance] = useState("");
  const zipcodeRef = useRef();
  //const distanceRef = useRef();

  const getPetsFromApi = async () => {
    const resp = await axios.post("http://localhost:4000/getPets", {
      zip: zipcode,
    });
    const respData = await resp.data;

    setPets(respData);
  };
  getPetsFromApi();

  setTimeout(() => {
    console.log(pets);
  }, 3000);

  const handleZipcodeChange = () => {
    setZipcode(zipcodeRef.current.value);
    getPetsFromApi();
  };

  return (
    <>
      <div className="header">
        <h1>Dogs for adoption!</h1>
        <p>Search for dogs within 50 miles.</p>
        <div>
          <input ref={zipcodeRef} type="text" name="zipcode" />
          <label for="zipcode">Zip Code</label>
        </div>
        <button onClick={handleZipcodeChange}>Search Zip Code</button>

        {zipcode ? (
          <p>Searching for dogs within 50 miles of {zipcode}</p>
        ) : (
          <p>Viewing national results</p>
        )}
      </div>
      <div className="pets">
        <PetList pets={pets} />
      </div>
    </>
  );
}

export default App;
