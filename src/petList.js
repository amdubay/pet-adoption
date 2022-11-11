import React from "react";
import petCard from "./petCard";

export default function PetList({ pets }) {
  const isPhotoNull = (url) => {
    return url
      ? url.small
      : "https://www.kindpng.com/picc/m/36-366584_dog-puppy-silhouette-clip-art-dog-silhouette-no.png";
  };

  const isDistanceNull = (criteria) => {
    return criteria ? Math.round(criteria) : "";
  };

  return pets.map((pet) => {
    return (
      <div className="petCard">
        <div className="petData">
          <h5>Name: {pet.name}</h5>
          <p>Age: {pet.age}</p>
          <p>Gender: {pet.gender}</p>
          <p>Primary Breed: {pet.breeds.primary}</p>

          {pet.distance ? (
            <p>Distance {Math.round(pet.distance)} miles</p>
          ) : (
            <p></p>
          )}
        </div>
        <img
          src={isPhotoNull(pet.primary_photo_cropped)}
          className="dogThumbnail"
        />
      </div>
    );
  });
}
