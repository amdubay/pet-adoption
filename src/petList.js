import React from "react";
import petCard from "./petCard";
import { Link } from "react-router-dom";

export default function PetList({ pets, distance, zipcode }) {
  const isPhotoNull = (url) => {
    return url
      ? url.small
      : "https://static.vecteezy.com/system/resources/previews/004/342/484/original/silhouette-of-a-dog-s-head-free-vector.jpg";
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
          <p>
            Location:{" "}
            {pet.contact.address.city + "," + pet.contact.address.state}
          </p>
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
          <Link to={`../petcard/${pet.id}`}>See {pet.id}</Link>
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
