//import logo from "./logo.svg";
import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./App.css";
import PetList from "./petList";
import BreedList from "./breedList";
import VisibilitySensor from "react-visibility-sensor";
import { server } from "./variables";

function App() {
  const [pets, setPets] = useState([]);
  const [page, setPage] = useState(1);
  const [zipcode, setZipcode] = useState();
  const [distance, setDistance] = useState(50);
  const [genderRadio, setGenderRadio] = useState();
  const [gender, setGender] = useState();
  const [breedList, setBreedList] = useState([]);
  const [selectedBreed, setSelectedBreed] = useState([]);
  //const [breedChoice, setBreedChoice] = useState([]);
  const zipcodeRef = useRef();
  const distanceRef = useRef();
  const genderRef = useRef();
  const breedRef = useRef();

  const getPetsFromApi = async () => {
    console.log("we're in making a request");
    const resp = await axios.post(`${server}/getPets`, {
      //const resp = await axios.post("http://localhost:4000/getPets", {
      zip: zipcode,
      dist: distance,
      pg: page,
      gen: gender,
      breed: selectedBreed,
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

  const getBreedsFromApi = async () => {
    console.log("we're in making a breed request");
    const resp = await axios.get(`${server}/getBreeds`, {});
    const respData = await resp.data;
    setBreedList(respData);
  };

  useEffect(() => {
    getPetsFromApi();
    getBreedsFromApi();
  }, [zipcode, distance, page, gender, selectedBreed]);

  setTimeout(() => {
    console.log(pets);
    console.log(breedList);
    console.log(`Number of search results ${pets.length}`);

    // Find duplicates in pets list ******************************************
    let petids = pets.map((pet) => {
      return pet.id;
    });
    let findDuplicates = (arr) =>
      arr.filter((item, index) => arr.indexOf(item) != index);
    let numOfDuplicates = findDuplicates(petids);
    console.log(numOfDuplicates);
    for (let i = 0; i < numOfDuplicates.length; i++) {
      console.log(
        `i=${i} id=${numOfDuplicates[i]} first index match= ${petids.indexOf(
          numOfDuplicates[i]
        )}`
      );
    }
    // ************************* end of debugging duplicates
  }, 6000);

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
    processBreedField();
  };

  /*
  setInterval(function () {
    console.log("time to get a new token");
    getToken();
  }, 3000000);
*/

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

  const processBreedField = () => {
    setSelectedBreed([]);
    for (let option of document.getElementById("breedSelected").options) {
      if (option.selected) {
        setSelectedBreed((prevSelectedBreed) => {
          const addSelectedBreed = [...prevSelectedBreed, option.value];
          return addSelectedBreed;
        });
      }
    }
    setPage(1);
  };

  const loadNextPage = () => {
    let currentPage = page;
    setPage(currentPage + 1);
  };

  const visibilityChange = (isVisible) => {
    if (isVisible) {
      loadNextPage();
    }
  };

  return (
    <>
      <div className="filters">
        <p>Search for adoptable dogs in your area!</p>
        <p>Total search results {pets.length}</p>
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

        <select ref={breedRef} name="breeds" id="breedSelected" multiple>
          <BreedList breedList={breedList} />
        </select>
        <label for="breeds">Breed</label>
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

      <VisibilitySensor onChange={visibilityChange}>
        <button onClick={loadNextPage}>Load More!</button>
      </VisibilitySensor>
    </>
  );
}

export default App;
