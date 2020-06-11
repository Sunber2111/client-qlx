import * as order from "../constants/order";
import agent from "../../app/api/agent";
import { success, error as err } from "../../app/notify";
import { closeModal } from "./modal";

export const getAll = () => async (dispatch) => {
  const data = await agent.Phieu.getAllPhieuXuat();
  dispatch({
    type: order.GET_ALL_ORDER,
    payload: data,
  });
};

export const createOrder = (data) => async (dispatch) => {
  try {
    await agent.Phieu.addPhieuXuat(data);
    success("Tạo Thành Công");

  } catch (error) {
    err("Thất Bại");

  }
};

export const deleteOrder = (id) => async (dispatch) => {
  try {
    await agent.Phieu.deletePhieuXuat(id);
    dispatch({
      type: order.DELETE_ORDER,
      payload: id,
    });
    success("Xóa Thành Công");
  } catch (error) {
    err("Xóa Thất Bại");
  }
};

export const setSelectOrder = (id) => (dispatch) => {
  dispatch({
    type: order.SET_SELECT_ORDER,
    payload: id,
  });
};
