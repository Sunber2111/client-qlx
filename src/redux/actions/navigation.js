import * as navi from "../constants/navigation";

export const changeState = () => (dispatch) => {
  dispatch({
    type: navi.CHANGE_STATE,
    payload: {},
  });
};
