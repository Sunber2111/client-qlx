import agent from "../../app/api/agent";
import * as account from "../constants/account";
import { history } from "../../";
import { closeDialog } from "./dialog";
import { success, error as err } from "../../app/notify";

export const login = (acc) => async (dispatch) => {
  try {
    const data = await agent.Account.login(acc);

    dispatch({
      type: account.LOGIN,
      payload: data,
    });

    dispatch(closeDialog());

    history.push("/car");
  } catch (error) {
    console.log(error);

    dispatch({
      type: account.ACCOUNT_ERRORS,
      payload: error,
    });
  }
};

export const getCurrentUser = () => async (dispatch) => {
  try {
    const data = await agent.Account.getCurrent();

    dispatch({
      type: account.GET_CURRENT_USER,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: account.LOGOUT,
      payload: "",
    });

    history.push("/");
  }
};

export const logout = () => async (dispatch) => {
  try {
    dispatch({
      type: account.LOGOUT,
      payload: "",
    });

    history.push("/");
  } catch (error) {
    dispatch({
      type: account.LOGOUT,
      payload: "",
    });
  }
};

export const setAppLoaded = () => (dispatch) => {
  dispatch({
    type: account.SET_APP_LOADED,
    payload: "",
  });
};

export const getAllAccount = () => async (dispatch) => {
  try {
    const data = await agent.Account.getAll();
    dispatch({
      type: account.GET_ALL_ACC,
      payload: data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateActiveAccount = (id, stateAcive) => async (dispatch) => {
  try {
    await agent.Account.updateActive(id);
    dispatch({
      type: account.UPDATE_ACTIVE,
      payload: { id, stateAcive },
    });
    !stateAcive
      ? success("Kích Hoạt Thành Công")
      : success("Vô Hiệu Hóa Thành Công");
  } catch (error) {
    console.log(error);
    stateAcive ? err("Kích Hoạt Thất Bại") : err("Vô Hiệu Hóa Thất Bại ");
  }
};

export const setSelectAcc = (username) => (dispatch) => {
  dispatch({
    type: account.SET_SELECT_ACC,
    payload: username,
  });
};

export const deleteAcc = (username) => async (dispatch) => {
  try {
    await agent.Account.deleteAcc(username);

    dispatch({
      type: account.DELETE_ACC,
      payload: username,
    });

    success("Xóa Thành Công");
  } catch (error) {
    console.log(error);
  }
};

export const regisAccount = (acc) => async (dispatch) => {
  try {
    await agent.Account.regis(acc);
    acc.kichHoat = true;
    dispatch({
      type: account.REGIS_ACC,
      payload: acc,
    });
    success("Tạo Tài Khoản Thành Công");
    dispatch(closeDialog());
  } catch (error) {
    err(error);
  }
};

export const resetPassword = (email) => async (dispatch) => {
  try {
    const data = await agent.Account.resetPassword(email);
    console.log(data);
    
    dispatch({
      type: account.ACCOUNT_ERRORS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: account.ACCOUNT_ERRORS,
      payload: error,
    });
  }
};