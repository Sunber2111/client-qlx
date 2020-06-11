import {
  ADD_EMP,
  DELETE_EMP,
  UPDATE_EMP,
  GET_ALL_EMP,
  SET_FILTER,
} from "../constants/employee";
import agent from "../../app/api/agent";
import { success, error as err } from "../../app/notify";
import { closeModal } from "./modal";

export const getAll = () => async (dispatch) => {
  const data = await agent.Employee.getAll();
  dispatch({
    type: GET_ALL_EMP,
    payload: data,
  });
};

export const submit = (data) => async (dispatch) => {
  try {
    if (data.hinhMoi) {
      data.hinh = await agent.Photo.addPhoto(data.hinhMoi);
    }
    if (!data.maNv) {
      const emp = await agent.Employee.addEmp({ ...data });
      dispatch({
        type: ADD_EMP,
        payload: emp,
      });

      success("Thêm Thành Công");
    } else {
      await agent.Employee.updateEmp(data);
      dispatch({
        type: UPDATE_EMP,
        payload: data,
      });
      success("Sửa Thành Công");
    }
    dispatch(closeModal());
  } catch (error) {
    err("Thất Bại");
    console.log(error);
  }
};

export const deleteEmp = (id) => async (dispatch) => {
  try {
    await agent.Employee.deleteEmp(id);
    dispatch({
      type: DELETE_EMP,
      payload: id,
    });
    success("Xóa Thành Công");
  } catch (error) {
    err("Xóa Thất Bại");
  }
};

export const getById = async (id) =>  {
 return new Promise(async(res,rej)=>{
   try {
     const data = await agent.Employee.getById(id);
     res(data)
   } catch (error) {
     res("Thất Bại")
   }
 })
};
