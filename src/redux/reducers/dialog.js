import { OPEN_DIALOG, CLOSE_DIALOG } from "../constants/dialog";
import { OPEN_MODAL_MRU, CLOSE_MODAL_MRU } from "../constants/modal";

const initialState = {
  body: null,
  open: false,
  title: "",
  openMRU: false,
  bodyMRU: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case OPEN_DIALOG: {
      return {
        ...state,
        open: true,
        body: payload.body,
        title: payload.title,
      };
    }
    case CLOSE_DIALOG: {
      return {
        ...state,
        open: false,
        body: null,
        title: null,
      };
    }
    case OPEN_MODAL_MRU: {
      return {
        ...state,
        openMRU: true,
        bodyMRU: payload,
      };
    }
    case CLOSE_MODAL_MRU: {
      return {
        ...state,
        openMRU: false,
        bodyMRU: null,
      };
    }
    default:
      return state;
  }
};
