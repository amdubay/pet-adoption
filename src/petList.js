import React from "react";

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

  // running array of pets with cards already created
  // pagination results from petfinder resulting in duplicate results
  const petsDisplayed = [];

  return filteredPets.map((pet) => {
    if (petsDisplayed.includes(pet.id)) {
      return;
    } else {
      petsDisplayed.push(pet.id);

      return (
        <div className="petCard">
          <div className="petDataimgDiv">
            <Link
              to={`../petcard/${pet.organization_id}/${pet.id}`}
              target="_blank"
            >
              <img
                src={isPhotoNull(pet.primary_photo_cropped)}
                className="dogThumbnail"
              />
            </Link>
          </div>
          <div className="petData">
            <h5>Name: {pet.name}</h5>
            <p>
              Location:{" "}
              {pet.contact.address.city + "," + pet.contact.address.state}
            </p>
            <p>Age: {pet.age}</p>
            <p>Gender: {pet.gender}</p>
            <p>
              Breed: {pet.breeds.primary}{" "}
              {pet.breeds.mixed == true || pet.breeds.secondary ? " - mix" : ""}
            </p>

            {pet.distance ? (
              <p>Distance {Math.round(pet.distance)} miles</p>
            ) : (
              <p></p>
            )}
            <Link
              to={`../petcard/${pet.organization_id}/${pet.id}`}
              target="_blank"
            >
              More details about {pet.name}
            </Link>
          </div>
        </div>
      );
    }
  });
}
