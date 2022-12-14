import React from "react";
import ConvertDescription from "./convertDescriptionToHTML";

export default function PetCardData({
  dogData,
  breedOf,
  orgData,
  petid,
  photos,
  dogUrl,
}) {
  const isPhotoNull = (url) => {
    return url
      ? url.small
      : "https://static.vecteezy.com/system/resources/previews/004/342/484/original/silhouette-of-a-dog-s-head-free-vector.jpg";
  };
  console.log(dogData);
  return (
    <div className="petCardPage">
      <h2>{dogData.name}</h2>
      <p>ID: {petid}</p>
      {/*<img
        src={isPhotoNull(dogData.primary_photo_cropped)}
        className="dogThumbnail"
  />*/}
      <div className="dogPhotos">
        {photos.map((photo) => {
          return <img src={photo} className="dogPicture" />;
        })}
      </div>
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

      <ConvertDescription dogUrl={dogUrl} />
      <p>
        See more about {dogData.name} on{" "}
        <a href={dogData.url} target="_blank">
          PetFinder.com!
        </a>
      </p>
    </div>
  );
}
