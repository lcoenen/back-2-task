import React, { useReducer, useEffect } from "react";
import { sample } from "lodash";

import { reducer, initialState } from "./reducer";
import { NextKey, Pause, Press } from "./actions";

import { Item, Result } from "./components";

const KEYS = ["A", "B", "C", "D", "E", "F"];
const INTERITEM_DELAY = 2500;
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
  const { keys, paused, history, finished } = state;
  const nextKey = () => {
    dispatch(NextKey(sample(KEYS)));
    setTimeout(() => {
      dispatch(Pause());
    }, ITEM_PRESENTATION_DELAY);
  };
  useEffect(() => {
    nextKey();
    const id = setInterval(() => nextKey(), INTERITEM_DELAY);
    return () => clearInterval(id);
  }, []);
  document.addEventListener("keyup", (e) => {
    dispatch(Press(new Date()));
  });
  return finished ? (
    <Result history={history} />
  ) : (
    <Item keys={keys} paused={paused} />
  );
};
