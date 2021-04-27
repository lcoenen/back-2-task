import { ITEM_LIMIT, MISSED_LIMIT, BACK_N } from "./constants";

export const initialState = {
  keys: [],
  paused: false,
  history: [],
  finished: false,
  started: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "Start": {
      return {
        ...state,
        started: true,
      };
    }
    case "NextKey": {
      const { history } = state;
      const keys = [...state.keys, action.key];
      const missed = history.filter(({ key, strokes }, i) => {
        const target = i > BACK_N && history[i - BACK_N];
        const positive = target && target.key === key;
        return positive && strokes.length === 0;
      }).length;
      const finished = keys.length >= ITEM_LIMIT || missed > MISSED_LIMIT;
      return state.finished
        ? state
        : {
            ...state,
            keys,
            paused: false,
            history: [
              ...state.history,
              {
                key: action.key,
                strokes: [],
                start: action.now,
              },
            ],
            finished,
          };
    }
    case "Pause": {
      return {
        ...state,
        paused: true,
      };
    }
    case "Press": {
      const { history, finished } = state;
      const previous = history.splice(0, history.length - 1);
      const last = history.length
        ? history[history.length - 1]
        : { strokes: [] };
      return finished
        ? state
        : {
            ...state,
            history: [
              ...previous,
              {
                ...last,
                strokes: [...last.strokes, action.now],
              },
            ],
          };
    }
    default: {
      return state;
    }
  }
};
