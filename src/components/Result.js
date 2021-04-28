import React from "react";
import styled from "styled-components";

const Button = styled.button`
  border: 1px solid white;
  border-radius: 1em;
  width: 100%;
  padding: 1em;
`;

export const Result = ({ history, onReset, onDownload }) => {
  const correct = history.filter(({ key, strokes }, i) => {
    const target = i > 2 && history[i - 2];
    const positive = target && target.key === key;
    return (
      (positive && strokes.length !== 0) || (!positive && strokes.length === 0)
    );
  }).length;
  const missed = history.filter(({ key, strokes }, i) => {
    const target = i > 2 && history[i - 2];
    const positive = target && target.key === key;
    return positive && strokes.length === 0;
  }).length;
  const falsePositives = history.filter(({ key, strokes }, i) => {
    const target = i > 2 && history[i - 2];
    const positive = target && target.key === key;
    return !positive && strokes.length !== 0;
  }).length;
  return (
    <div>
      <p>Total: {history.length}</p>
      <p>Correct: {correct} </p>
      <p>Missed: {missed}</p>
      <p>False positive: {falsePositives} </p>
      <button onClick={onDownload}>Download results</button>
      <button onClick={onReset}>Start over</button>
    </div>
  );
};
