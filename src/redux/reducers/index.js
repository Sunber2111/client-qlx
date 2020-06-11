import { combineReducers } from "redux";
import category from "./category";
import modal from "./modal";
import car from "./car";
import employee from "./employee";
import customer from "./customer";
import store from "./store";
import order from "./order";
import pur from "./pur";
import dialog from "./dialog";
import account from "./account";
import supplier from "./supplier";
import nav from "./nav";
import doanhthu from "./doanhthu";

export default combineReducers({
  category,
  modal,
  car,
  nav,
  employee,
  customer,
  store,
  order,
  pur,
  dialog,
  account,
  supplier,
  doanhthu,
});
