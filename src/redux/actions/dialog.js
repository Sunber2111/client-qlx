import { OPEN_DIALOG, CLOSE_DIALOG } from "../constants/dialog";

export const openDialog = (body, title="") => (dispatch) => {
  dispatch({
    type: OPEN_DIALOG,
    payload: {body,title}
  });
};

export const closeDialog = () => (dispatch) => {
  dispatch({
    type: CLOSE_DIALOG,
    payload: null,
  });
};
