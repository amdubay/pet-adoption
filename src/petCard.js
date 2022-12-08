import React, { useState, useRef, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function Petcard() {
  let { petid } = useParams();

  return (
    <div>
      <h2>test pass params</h2>
      <p>ID: {petid}</p>
    </div>
  );
}
