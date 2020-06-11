import * as store from "../constants/store";
import agent from "../../app/api/agent";
import { success, error as err } from "../../app/notify";
import { closeModal } from "./modal";
import { closeDialog } from "./dialog";

export const getAll = () => async (dispatch) => {
  const data = await agent.Store.getAll();
  dispatch({
    type: store.GET_ALL_STORE,
    payload: data,
  });
};

export const submit = (data) => async (dispatch) => {
  try {
    if (!data.maKho) {
      const newstore = await agent.Store.addStore({ ...data });
      dispatch({
        type: store.ADD_STORE,
        payload: newstore,
      });

      success("Thêm Thành Công");
    } else {
      await agent.Store.updateStore(data);
      dispatch({
        type: store.UPDATE_STORE,
        payload: data,
      });
      success("Sửa Thành Công");
    }
    dispatch(closeDialog());
  } catch (error) {
    err("Thất Bại");
    console.log(error);
  }
};

export const deleteStore = (id) => async (dispatch) => {
  try {
    await agent.Store.deleteStore(id);
    dispatch({
      type: store.DELETE_STORE,
      payload: id,
    });
    success("Xóa Thành Công");
  } catch (error) {
    err("Xóa Thất Bại");
  }
};

export const setSelectStore = (id) => (dispatch) => {
  dispatch({
    type: store.SET_SELECT_STORE,
    payload: id,
  });
};

export const submitDetailStore = (ctkho) => async (dispatch) => {
  try {
    ctkho.soluong = parseInt(ctkho.soluong);
    if (!ctkho.id) {

      const data = await agent.Store.addDetailStore(ctkho);

      dispatch({
        type: store.ADD_DETAIL_STORE,
        payload: { ctkho, data },
      });

      success("Thêm Thành Công");

    } else {

      await agent.Store.addDetailStore(ctkho);

      dispatch({
        type: store.UPDATE_DETAIL_STORE,
        payload: { ctkho },
      });

      success("Sửa Thành Công");
      
    }
  } catch (error) {
    err("Thất Bại");
  }
  
  dispatch(closeModal());
};

export const deleteDS = (id) => async (dispatch) => {
  try {
    await agent.Store.deleteDetailStore(id);

    dispatch({
      type: store.DELETE_STORE,
      payload: id,
    });
    success("Xóa Thành Công");
  } catch (error) {
    err("Thất Bại");
  }
};
