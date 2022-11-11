//import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PetList from "./petList";

function App() {
  const [pets, setPets] = useState([]);
  const [zipcode, setZipcode] = useState();
  const [distance, setDistance] = useState();
  const zipcodeRef = useRef();
  const distanceRef = useRef();

  const getPetsFromApi = async () => {
    console.log("we're in making a request");
    const resp = await axios.post("http://localhost:4000/getPets", {
      zip: zipcode,
      dist: distance,
    });
    const respData = await resp.data;

    setPets(respData);
  };

  useEffect(() => {
    getPetsFromApi();
  }, []);

  //getPetsFromApi();

  setTimeout(() => {
    console.log(pets);
  }, 3000);

  const handleSearch = () => {
    if (zipcodeRef.current.value) {
      handleZipcodeChange();
    }
    if (distanceRef.current.value) {
      handleDistanceChange();
    }
    getPetsFromApi();
  };

  const handleZipcodeChange = () => {
    setZipcode(zipcodeRef.current.value);
  };

  const handleDistanceChange = () => {
    setDistance(distanceRef.current.value);
  };

  return (
    <>
      <div className="header">
        <h1>Dogs for adoption!</h1>
        <p>Search for dogs in your area!</p>
        <div>
          <input ref={zipcodeRef} type="number" name="zipcode" />
          <label for="zipcode">Zip Code</label>
        </div>
        <div>
          <input ref={distanceRef} type="text" name="distance" />
          <label for="distance">Distance</label>
        </div>
        <button onClick={handleSearch}>Search</button>

        {zipcode ? (
          <p>
            Searching for dogs within {distance ? distance : "50"} miles of{" "}
            {zipcode}
          </p>
        ) : (
          <p>Viewing national results</p>
        )}
      </div>
      <div className="pets">
        <PetList pets={pets} distance={distance} />
      </div>
    </>
  );
}

export default App;
