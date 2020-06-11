import agent from "app/api/agent";
import { GET_TOP_5, GET_12_MONTH, GET_FN, GET_TOP_3_CAR } from "redux/constants/doanhthu";

export const getTop5 = () => async (dispatch) => {
  try {
    const data = await agent.DoanhThu.getTop5();
    dispatch({
      type: GET_TOP_5,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};


export const get12Month = () => async (dispatch) => {
  try {
    const data = await agent.DoanhThu.get12Month();
    dispatch({
      type: GET_12_MONTH,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getFN = () => async (dispatch) => {
  try {
    const data = await agent.DoanhThu.getFastNew();
    dispatch({
      type: GET_FN,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getTop3Car = () => async (dispatch) => {
  try {
    const data = await agent.DoanhThu.getTop3Car();
    dispatch({
      type: GET_TOP_3_CAR,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};