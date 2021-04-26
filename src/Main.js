import React, { useReducer, useEffect } from "react";
import { sample } from "lodash";

import { reducer, initialState } from "./reducer";
import { NextLetter, Pause } from "./actions";

const LETTERS = [
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
];
const INTERITEM_DELAY = 5000;
const ITEM_PRESENTATION_DELAY = 1000;

const log = (reducer) => (state, action) => {
  console.log("state", state);
  console.log("action", action);
  const result = reducer(state, action);
  console.log("result", result);
  return result;
};

export const Main = () => {
  const [state, dispatch] = useReducer(log(reducer), initialState);
  const { letters, paused } = state;
  const nextLetter = () => {
    dispatch(NextLetter(sample(LETTERS)));
    setTimeout(() => {
      dispatch(Pause());
    }, ITEM_PRESENTATION_DELAY);
  };
  useEffect(() => {
    nextLetter();
    setInterval(() => nextLetter(), INTERITEM_DELAY);
  }, []);
  return <p>{paused ? <></> : letters[letters.length - 1]} </p>;
};
