/* eslint-disable jsx-a11y/alt-text */
import React from "react";

function Image({ number, text, ...imgProps }) {
  return (
    <span className="image-container">
      <img {...imgProps} />
      <span className="after right">{text}</span>
      <span className="after left">{number}</span>
    </span>
  );
}

export default Image;
