import { GET_ALL_CAR, UPDATE_CAR, DELETE_CAR } from "../constants/car";
import agent from "../../app/api/agent";
import { success, error as err } from "../../app/notify";
import { closeDialog } from "./dialog";

export const getAll = () => async (dispatch) => {
  return new Promise(async (res,rej)=>{
    try { 
      const data = await agent.Product.getAll();
      dispatch({
        type: GET_ALL_CAR,
        payload: data,
      });
      res(data)
    } catch (error) {
      err("Có Lỗi")
    }
  })
};

export const submit = (data) => async (dispatch) => {
  try {
    const { maXe, maLoaiXe, tenXe } = data;
    await agent.Product.updateCar({ maXe, maLoaiXe, tenXe });
    dispatch({
      type: UPDATE_CAR,
      payload: data,
    });
    success("Sửa Thành Công");
    dispatch(getAll());
    dispatch(closeDialog());
  } catch (error) {
    err(error);
  }
};

export const deleteCar = (id) => async (dispatch) => {
  try {
    await agent.Product.deleteCar(id);
    dispatch({
      type: DELETE_CAR,
      payload: id,
    });
    success("Xóa Thành Công");
  } catch (error) {
    err("Xóa Thất Bại");
  }
};
