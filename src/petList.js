import React from "react";
import petCard from "./petCard";

export default function PetList({ pets, distance, zipcode }) {
  const isPhotoNull = (url) => {
    return url
      ? url.small
      : "https://www.kindpng.com/picc/m/36-366584_dog-puppy-silhouette-clip-art-dog-silhouette-no.png";
  };

  const isDistanceNull = (criteria) => {
    return criteria ? Math.round(criteria) : "";
  };

  if (zipcode) {
    console.log(pets);
    var filteredPets = pets.filter((pet) => {
      return pet.distance < distance;
    });
    console.log(filteredPets);
  } else {
    var filteredPets = pets;
  }

  return filteredPets.map((pet) => {
    return (
      <div className="petCard">
        <div className="petData">
          <h5>Name: {pet.name}</h5>
          <p>Age: {pet.age}</p>
          <p>Gender: {pet.gender}</p>
          <p>Primary Breed: {pet.breeds.primary}</p>
          <p>Secondary Breed: {pet.breeds.secondary}</p>
          <p>Is Mixed Breed? {pet.breeds.mixed ? "True" : "False"}</p>
          <p>Breed Unknown? {pet.breeds.unknown ? "True" : "False"}</p>

          {pet.distance ? (
            <p>Distance {Math.round(pet.distance)} miles</p>
          ) : (
            <p></p>
          )}
          <a href={pet.url} target="_blank">
            See me on PetFinder.com!
          </a>
        </div>
        <img
          src={isPhotoNull(pet.primary_photo_cropped)}
          className="dogThumbnail"
        />
      </div>
    );
  });
}
