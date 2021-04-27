import React, { useReducer, useEffect } from "react";
import { sample } from "lodash";

import { reducer, initialState } from "./reducer";
import { NextKey, Pause, Press, Start } from "./actions";

import { Item, Result, Instructions } from "./components";

import { KEYS, ITEM_PRESENTATION_DELAY, INTERITEM_DELAY } from "./constants";

// TODO remove
const log = (reducer) => (state, action) => {
  console.log("state", state);
  console.log("action", action);
  const result = reducer(state, action);
  console.log("result", result);
  return result;
};

export const Main = () => {
  const [state, dispatch] = useReducer(log(reducer), initialState);
  const { keys, paused, history, started, finished } = state;

  const nextKey = () => {
    dispatch(NextKey(sample(KEYS)));
    setTimeout(() => {
      dispatch(Pause());
    }, ITEM_PRESENTATION_DELAY);
  };

  useEffect(() => {
    if (started) {
      nextKey();
      const id = setInterval(() => nextKey(), INTERITEM_DELAY);
      return () => clearInterval(id);
    }
  }, [started]);

  const onStart = () => {
    dispatch(Start());
  };

  document.addEventListener("keyup", (e) => {
    dispatch(Press(new Date()));
  });
  return !started ? (
    <Instructions onStart={onStart} />
  ) : finished ? (
    <Result history={history} />
  ) : (
    <Item keys={keys} paused={paused} />
  );
};
