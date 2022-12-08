import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PetCardData from "./components/petCardData";

let selectServer = 1;
let server =
  selectServer === 1
    ? "https://petfinderapi.addisondubay.com"
    : "http://localhost:4000";

export default function Petcard() {
  let { petid } = useParams();
  const [dogData, setDogData] = useState([]);
  const [orgData, setOrgData] = useState([]);
  /* Why did I need to make 'breedOf' to drill down to breed object? 
  dogData.breeds.primary would not load page, but it would work if I edit petCard.js
  after loading the page without the breeds.primary. 
  Creating the below state of breedOf, allows me to use breedOf.primary, and this works.*/
  const [breedOf, setBreedOf] = useState([]);

  const getDogDataApi = async () => {
    console.log("we're in making a DOG request");
    const resp = await axios.post(`${server}/getdogbyid`, {
      id: petid,
    });
    const respData = await resp.data;
    setDogData(respData);
    getOrgDataApi(respData.organization_id);
  };

  const getOrgDataApi = async (orgId) => {
    console.log("we're in making a ORG request");
    console.log(dogData.organization_id);
    const resp = await axios.post(`${server}/getorgbyid`, {
      id: orgId,
    });
    const respData = await resp.data.organization;
    setOrgData(respData);
  };

  useEffect(() => {
    getDogDataApi();
  }, []);

  useEffect(() => {
    console.log(dogData);
    setBreedOf(dogData.breeds);
  }, [dogData]);

  useEffect(() => {
    console.log(orgData);
    console.log(breedOf);
  }, [orgData]);

  return (
    <PetCardData
      dogData={dogData}
      breedOf={breedOf}
      orgData={orgData}
      petid={petid}
    />
  );
}
