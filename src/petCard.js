import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

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

  const isPhotoNull = (url) => {
    return url
      ? url.small
      : "https://static.vecteezy.com/system/resources/previews/004/342/484/original/silhouette-of-a-dog-s-head-free-vector.jpg";
  };

  return (
    <div>
      <h2>{dogData.name}</h2>
      <p>ID: {petid}</p>
      <img
        src={isPhotoNull(dogData.primary_photo_cropped)}
        className="dogThumbnail"
      />
      <p>Name: {dogData.name}</p>
      <p>Age: {dogData.age}</p>
      <p>Gender: {dogData.gender}</p>
      <p>Primary Breed: {breedOf ? breedOf.primary : "n/a"}</p>
      <p>Secondary Breed: {breedOf ? breedOf.secondary : "n/a"}</p>
      <p>
        Is Mixed Breed? {breedOf ? (breedOf.mixed ? "True" : "False") : "n/a"}
      </p>
      <p>
        Breed Unknown? {breedOf ? (breedOf.unknown ? "True" : "False") : "n/a"}
      </p>

      <p>Adoption Organization: {orgData.name}</p>
      <a href={dogData.url} target="_blank">
        See more details on PetFinder.com!
      </a>
      <p>
        About {dogData.name}: {dogData.description}
      </p>
    </div>
  );
}
