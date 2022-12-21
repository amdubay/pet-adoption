import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import PetCardData from "./components/petCardData";
import { server } from "./variables";

export default function Petcard() {
  let { petid, orgid } = useParams();
  console.log(`parameters ${petid} ${orgid}`);
  const [dogData, setDogData] = useState({ photos: [""] });
  const [orgData, setOrgData] = useState([]);
  const [photos, setPhotos] = useState([]);
  const [dogUrl, setDogUrl] = useState([]);
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
  };

  const getDogDescriptionByScraping = async () => {
    /*get description by scraping */
    console.log("we're sending a scrape request");
    const resp = await axios.post(`${server}/getdogdescription`, {
      url: dogData.url,
    });
    const respData = await resp.data;
    const description = respData.trim();
    const descriptionArray = description.split(`<br>`);
    const descArrayFiltered = descriptionArray.map((e) => {
      return e.replaceAll("\n", "");
    });

    setDogUrl(descArrayFiltered);
  };

  const getOrgDataApi = async () => {
    console.log("we're in making a ORG request");
    console.log(orgid);
    const resp = await axios.post(`${server}/getorgbyid`, {
      id: orgid,
    });
    const respData = await resp.data.organization;
    setOrgData(respData);
  };

  useEffect(() => {
    getDogDataApi();
    getOrgDataApi();
  }, []);

  useEffect(() => {
    console.log(dogData);
    console.log(dogData.photos);
    getDogDescriptionByScraping();

    setTimeout(() => {
      console.log(dogData.photos.length);
    }, 1500);

    setBreedOf(dogData.breeds);

    setTimeout(() => {
      let photosArray = [];
      for (let i = 0; i < dogData.photos.length; i++) {
        photosArray.push(dogData.photos[i].full);
      }
      console.log(photosArray);
      setPhotos(photosArray);
    }, 250);
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
      photos={photos}
      dogUrl={dogUrl}
    />
  );
}
