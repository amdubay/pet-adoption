import React from "react";

export default function PetCardData({ dogData, breedOf, orgData, petid }) {
  const isPhotoNull = (url) => {
    return url
      ? url.small
      : "https://static.vecteezy.com/system/resources/previews/004/342/484/original/silhouette-of-a-dog-s-head-free-vector.jpg";
  };
  console.log(dogData.description);
  return (
    <div className="petCardPage">
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
