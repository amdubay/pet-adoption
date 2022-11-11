//import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PetList from "./petList";

function App() {
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const [zipcode, setZipcode] = useState();
  const [distance, setDistance] = useState();
  const zipcodeRef = useRef();
  const distanceRef = useRef();

  const getPetsFromApi = async () => {
    console.log("we're in making a request");
    const resp = await axios.post("http://localhost:4000/getPets", {
      zip: zipcode,
      dist: distance,
      pg: page,
    });
    const respData = await resp.data;
    if (page == "1") {
      setPets(respData);
    } else {
      setPets((prevPets) => {
        const currentPets = [...prevPets];
        const addPets = currentPets.concat(respData);
        return addPets;
      });
    }
  };

  useEffect(() => {
    getPetsFromApi();
  }, [zipcode, distance, page]);

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
  };

  const handleZipcodeChange = () => {
    setZipcode(zipcodeRef.current.value);
    setPage(1);
    return;
  };

  const handleDistanceChange = () => {
    setDistance(distanceRef.current.value);
    setPage(1);
    return;
  };

  const loadNextPage = () => {
    let currentPage = page;
    setPage(currentPage + 1);
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
      <button onClick={loadNextPage}>Load More!</button>
    </>
  );
}

export default App;
