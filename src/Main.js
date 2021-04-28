import React, { useReducer, useEffect } from "react";
import { sample } from "lodash";
import saveAs from "save-as";

import { reducer, initialState } from "./reducer";
import { NextKey, Pause, Press, Start, Reset } from "./actions";

import { Item, Result, Instructions } from "./components";

import { KEYS, ITEM_PRESENTATION_DELAY, INTERITEM_DELAY } from "./constants";

import styled from "styled-components";

export const MainBox = styled.div`
  width: 100%;
  height: 100%;
  background-color: black;
  margin: 0;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Main = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
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

  const saveHistory = () =>
    saveAs(
      new Blob([JSON.stringify(history)], { type: "text/plain;charset=utf-8" }),
      "result.json"
    );
  const reset = () => dispatch(Reset());

  return (
    <MainBox>
      {!started ? (
        <Instructions onStart={onStart} />
      ) : finished ? (
        <Result history={history} onDownload={saveHistory} onReset={reset} />
      ) : (
        <Item keys={keys} paused={paused} />
      )}{" "}
    </MainBox>
  );
};
