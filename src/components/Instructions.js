import React from "react";

export const Instructions = ({ onStart }) => {
  return (
    <div>
      <p>You are going to be presented with a sequence of stimuli.</p>
      <p>
        You will have to react when the image is the same as the one presented
        before the previous one.
      </p>
      <p>
        <em onClick={onStart}>Click here to start</em>
      </p>
    </div>
  );
};
