import React from "react";

export default function SelectedFilters({
  zipcode,
  setZipcode,
  gender,
  setGender,
  selectedBreed,
  setSelectedBreed,
}) {
  const onClickZip = () => {
    setZipcode();
  };

  const onClickGender = () => {
    setGender();
  };

  return (
    <>
      <div className="searchCriteriaSelected" onClick={onClickZip}>
        {zipcode ? (
          <>
            <p>{zipcode}</p>
            <p>x</p>
          </>
        ) : (
          ""
        )}
      </div>

      <div className="searchCriteriaSelected" onClick={onClickGender}>
        {gender ? (
          <>
            <p>{gender}</p>
            <p>x</p>
          </>
        ) : (
          ""
        )}
      </div>
    </>
  );
}
