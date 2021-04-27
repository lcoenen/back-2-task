export const initialState = {
  keys: [],
  paused: false,
  history: [],
  finished: false,
};

export const reducer = (state, action) => {
  switch (action.type) {
    case "NextKey": {
      const { history } = state;
      const keys = [...state.keys, action.key];
      const missed = history.filter(({ key, strokes }, i) => {
        const target = i > 2 && history[i - 2];
        const positive = target && target.key === key;
        return positive && strokes.length === 0;
      }).length;
      const finished = keys.length >= 15 || missed > 1;
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
      const previous = history.splice(history.length - 1);
      const last = history[history.length - 1];
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
