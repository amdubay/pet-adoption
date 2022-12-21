import React from "react";

export default function DogBreedBoxList({ breedList }) {
  return breedList.map((breed) => {
    return (
      <div className="breedChoice">
        <p>{breed.name}</p>
        <div className="selectionButtons">
          <p>v</p>
          <p>x</p>
        </div>
      </div>
    );
  });
}
