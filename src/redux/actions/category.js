import {
  GET_ALL_CATEGORY,
  ADD_CATEGORY,
  UPDATE_CATEGORY,
  DELETE_CATEGORY,
  SET_SELECT_CATE,
  DELETE_SELECT_CATE,
} from "../constants/category";
import {
  GET_ALL_CAR
} from "../constants/car";
import agent from "../../app/api/agent";
import { success, error as err } from "../../app/notify";
import { closeDialog } from "./dialog";

export const getAll = () => async (dispatch) => {
  try {
    const data = await agent.Product.getAllCategory();

    dispatch({
      type: GET_ALL_CATEGORY,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const submit = (loaixe) => async (dispatch) => {
  try {
    if (!loaixe.maLoaiXe) {
      const data = await agent.Product.addCategory({
        tenLoaiXe: loaixe.tenLoaiXe,
      });

      dispatch({
        type: ADD_CATEGORY,
        payload: data,
      });

      success("Thêm Thành Công");
    } else {
      await agent.Product.updateCategory(loaixe);

      dispatch({
        type: UPDATE_CATEGORY,
        payload: loaixe,
      });

      success("Sửa Thành Công");
    }
    dispatch(closeDialog());
  } catch (error) {
    err(error);
  }
};

export const deleteCategory = (id) => async (dispatch) => {
  try {
    await agent.Product.deleteCategory(id);
    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    });

    success("Xóa Thành Công");
  } catch (error) {
    err("Xóa thất bại");
  }
};

export const setSelect = (id) => async (dispatch) => {
  try {
    const data = await agent.Product.getByCategory(id);
    dispatch({
      type:GET_ALL_CAR,
      payload:data
    })
  } catch (error) {
    
  }
  dispatch({
    type: SET_SELECT_CATE,
    payload: id,
  });
};

export const deleteSelect = () => async (dispatch) => {
  try {
    const data = await agent.Product.getAll();
    dispatch({
      type:GET_ALL_CAR,
      payload:data
    })
  } catch (error) {
    
  }
  dispatch({
    type: DELETE_SELECT_CATE,
    payload: null,
  });
};
