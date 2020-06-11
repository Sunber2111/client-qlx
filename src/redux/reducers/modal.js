import { OPEN_MODAL, CLOSE_MODAL } from "../constants/modal";

const initialState = {
  body: null,
  open: false,
  size:"tiny"
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_MODAL: {
      return {
        ...state,
        open: true,
        body: payload.body,
        size:payload.size
      };
    }
    case CLOSE_MODAL: {
      return {
        ...state,
        open: false,
        body: null,
        size:"tiny"
      };
    }

    default:
      return state;
  }
};
