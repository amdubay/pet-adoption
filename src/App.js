//import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PetList from "./petList";
import VisibilitySensor from "react-visibility-sensor";

function App() {
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const [zipcode, setZipcode] = useState();
  const [distance, setDistance] = useState(50);
  const [genderRadio, setGenderRadio] = useState();
  const [gender, setGender] = useState();
  const zipcodeRef = useRef();
  const distanceRef = useRef();
  const genderRef = useRef();

  const getPetsFromApi = async () => {
    console.log("we're in making a request");
    //const resp = await axios.post("http://23.94.202.180:4000/getPets", {
    const resp = await axios.post("http://localhost:4000/getPets", {
      zip: zipcode,
      dist: distance,
      pg: page,
      gen: gender,
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
  }, [zipcode, distance, page, gender]);

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
    if (genderRadio != gender) {
      handleGenderChange();
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

  const handleGenderChange = () => {
    setGender(genderRadio);
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

        <div>
          <input
            ref={genderRef}
            type="radio"
            name="gender"
            id="male"
            value="male"
            onClick={() => setGenderRadio("male")}
          />
          <label for="male">Male</label>
          <input
            ref={genderRef}
            type="radio"
            name="gender"
            id="female"
            value="female"
            onClick={() => setGenderRadio("female")}
          />
          <label for="female">Female</label>

          <input
            ref={genderRef}
            type="radio"
            name="gender"
            id="none"
            value="none"
            onClick={() => setGenderRadio("")}
          />
          <label for="female">All</label>
          <label for="gender"> Gender</label>
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
        <PetList pets={pets} distance={distance} zipcode={zipcode} />
      </div>
      <VisibilitySensor onChange={loadNextPage}>
        <button onClick={loadNextPage}>Load More!</button>
      </VisibilitySensor>
    </>
  );
}

export default App;
