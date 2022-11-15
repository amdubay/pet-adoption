import React from "react";

export default function BreedList({ breedList }) {
  return breedList.map((breed) => {
    return <option value={breed.name}>{breed.name}</option>;
  });
}
