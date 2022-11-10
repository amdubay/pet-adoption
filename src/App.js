//import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PetList from "./petList";

// see todo.todo for general tasks to be completed.

function App() {
  const [pets, setPets] = useState([]); // this will become an array or object of pets. type to be decided
  const [zipcode, setZipcode] = useState(); // self explanitory, this will manage user zipcode state
  //const [distance, setDistance] = useState("");
  const zipcodeRef = useRef();
  //const distanceRef = useRef();

  // useState to query pets on page load, but will also query pets whenever the user enters their zipcode
  // url format for .get is "https://api.petfinder.com/v2/animals?type=dog&size=medium"
  // bulk of url will be kept on server side, and will concat with passed through parameters from this module.
  // "https://api.petfinder.com/v2/animals?type=dog" will be server side. (including dog on server, since this project is currently only looking for dogs)
  // the zip code query will be passed through to the server as a parameter. default zipcode state is "", so no logic for a null zipcode is needed
  // returned results will be stored into setPets

  // cancel this plan

  useEffect(() => {
    const getPetsFromApi = async () => {
      const resp = await axios.post("http://localhost:4000/getPets", {
        zip: zipcode,
      });
      const respData = await resp.data;
      //const parseData = JSON.parse(respData);

      setPets(respData);
    };
    getPetsFromApi();
  }, [zipcode]);

  setTimeout(() => {
    console.log(pets);
  }, 3000);

  const handleZipcodeChange = () => {
    setZipcode(zipcodeRef.current.value);
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
