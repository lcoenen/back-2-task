export const initialState = {
  letters: [],
  paused: false,
};

export const reducer = (state, action) => {
  console.log("applying", state, action);
  switch (action.type) {
    case "NextLetter": {
      return {
        ...state,
        letters: [...state.letters, action.letter],
        paused: false,
      };
    }
    case "Pause": {
      return {
        ...state,
        paused: true,
      };
    }
    default: {
      return state;
    }
  }
};
