import React from "react";
import styled from "styled-components";

const Big = styled.p`
  font-size: 3em;
`;

export const Item = ({ paused, keys }) => (
  <Big>{paused ? <></> : keys[keys.length - 1]} </Big>
);
