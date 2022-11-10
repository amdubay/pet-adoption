//import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PetList from "./petList";

// see todo.todo for general tasks to be completed.

function App() {
  const [pets, setPets] = useState([]); // this will become an array or object of pets. type to be decided
  //const [zipcode, setZipcode] = useState(""); // self explanitory, this will manage user zipcode state

  // useState to query pets on page load, but will also query pets whenever the user enters their zipcode
  // url format for .get is "https://api.petfinder.com/v2/animals?type=dog&size=medium"
  // bulk of url will be kept on server side, and will concat with passed through parameters from this module.
  // "https://api.petfinder.com/v2/animals?type=dog" will be server side. (including dog on server, since this project is currently only looking for dogs)
  // the zip code query will be passed through to the server as a parameter. default zipcode state is "", so no logic for a null zipcode is needed
  // returned results will be stored into setPets

  // change of plan - pet query will be a function that gets called once, on page load
  // then, when submitting a zipcode and radius, the onSubmit button can just call the pet query function.

  useEffect(() => {
    const getPetsFromApi = async () => {
      const resp = await axios.get("http://localhost:4000/getPets");
      const respData = await resp.data;
      //const parseData = JSON.parse(respData);

      setPets(respData);
    };
    getPetsFromApi();
  }, []);

  setTimeout(() => {
    console.log(pets);
  }, 3000);

  return (
    <div className="pets">
      <PetList pets={pets} />
    </div>
  );
}

export default App;
