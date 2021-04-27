import React from "react";

export const Item = ({ paused, keys }) => (
  <p>{paused ? <></> : keys[keys.length - 1]} </p>
);
