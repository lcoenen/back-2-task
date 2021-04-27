import React from "react";

export const Result = ({ history }) => {
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
      <p>Correct: {correct} </p>
      <p>Missed: {missed}</p>
      <p>False positive: {falsePositives} </p>
    </div>
  );
};
