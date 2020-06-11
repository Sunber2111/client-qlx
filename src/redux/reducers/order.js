import * as order from "../constants/order";

const initialState = {
  orders: [],
  isSelect: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case order.GET_ALL_ORDER: {
      return {
        ...state,
        orders: payload,
      };
    }
    case order.ADD_ORDER: {
      state.orders.push(payload);
      return {
        ...state,
      };
    }
    case order.SET_SELECT_ORDER: {
      const index = state.orders.findIndex((x) => x.maHdx === payload);
      state.isSelect = state.orders[index];
      return {
        ...state,
      };
    }
    case order.DELETE_ORDER: {
      const index = state.orders.findIndex((x) => x.maHdx === payload);
      state.orders.splice(index, 1);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
