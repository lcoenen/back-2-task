import React from "react";
import styled from "styled-components";

const Box = styled.div`
  min-width: 400px;
  width: 800px;
  border: 1px solid white;
  margin: auto;
  padding: 1em;
  border-radius: 1em;
`;

const Button = styled.button`
  border: 1px solid white;
  border-radius: 1em;
  width: 100%;
  padding: 1em;
`;

export const Instructions = ({ onStart }) => {
  return (
    <Box>
      <p>You are going to be presented with a sequence of stimuli.</p>
      <p>
        You will have to react when the image is the same as the one presented
        before the previous one.
      </p>
      <p>
        For example, you should push on any button when the following sequence
        appears:
      </p>
      <p>
        <strong>AAA</strong>
      </p>
      <p>
        <strong>ABA</strong>
      </p>
      <p>
        For example, you should NOT push any button when a sequence does not
        fill this criteria, for example:
      </p>
      <p>
        <strong>BBA</strong>
      </p>
      <p>
        <strong>BAA</strong>
      </p>
      <p>
        <Button onClick={onStart}>Start</Button>
      </p>
    </Box>
  );
};
