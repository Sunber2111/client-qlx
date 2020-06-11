import * as supplier from "../constants/supplier";
import agent from "../../app/api/agent";
import { success, error as err } from "../../app/notify";
import { closeDialog } from "./dialog";

export const getAll = () => async (dispatch) => {
  const data = await agent.Supplier.getAll()
  dispatch({
    type: supplier.GET_ALL_SUP,
    payload: data,
  });
};

export const submit = (data) => async (dispatch) => {
  try {
      if (!data.maNcc) {
        const emp = await agent.Supplier.addSup({ ...data });
        dispatch({
          type: supplier.ADD_SUP,
          payload: emp,
        });
  
        success("Thêm Thành Công");
      } else {
        await agent.Supplier.updateSup(data);
        dispatch({
          type: supplier.UPDATE_SUP,
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

export const deleteSup = (id) => async (dispatch) => {
  try {
    await agent.Supplier.deleteSup(id);
    dispatch({
      type: supplier.DELETE_SUP,
      payload: id,
    });
    success("Xóa Thành Công");
  } catch (error) {
    err("Xóa Thất Bại");
  }
};

export const getHdn = id => async dispatch =>{
  try {
    const data = await agent.Supplier.gethdn(id);
    dispatch({
      type:supplier.GET_HDN_SUP,
      payload:{data,id}
    })
  } catch (error) {
    console.log(error);
    
  }
}