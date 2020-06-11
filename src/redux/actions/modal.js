import {
  CLOSE_MODAL_MRU,
  OPEN_MODAL_MRU,
} from "../constants/modal";

export const openModal = (body) => (dispatch) => {
  dispatch({
    type: OPEN_MODAL_MRU,
    payload: body,
  });
};

export const closeModal = () => (dispatch) => {
  dispatch({
    type: CLOSE_MODAL_MRU,
    payload: "",
  });
};
