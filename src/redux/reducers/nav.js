import * as nav from "../constants/navigation";

const initialState = {
  open: true,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case nav.CHANGE_STATE: {
      return {
        ...state,
        open: !state.open,
      };
    }

    default:
      return state;
  }
};
