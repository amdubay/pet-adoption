import React from "react";

export default function ConvertDescription({ dogUrl }) {
  return dogUrl.map((e) => {
    return (
      <>
        {e}
        <br />
        <br />
      </>
    );
  });
}
