import * as customer from "../constants/customer";

const initialState = {
  cuses: [],
  cusFilter:{}

};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case customer.GET_ALL_CUSTOMER: {
      return {
        ...state,
        cuses: payload,
      };
    }
    case customer.ADD_CUSTOMER: {
      state.cuses.push(payload);
      return {
        ...state,
      };
    }
    case customer.UPDATE_CUSTOMER: {
      const index = state.cuses.findIndex((x) => x.maKh === payload.maKh);
      state.cuses.splice(index, 1);
      state.cuses.push(payload);
      return {
        ...state,
      };
    }
    case customer.DELETE_CUSTOMER: {
      const index = state.cuses.findIndex((x) => x.maKh === payload.maKh);
      state.cuses.splice(index, 1);
      return {
        ...state,
      };
    }
    case customer.GET_ORDERS_OF_CUS: {
      const cus = state.cuses.find((x) => x.maKh === payload.id);
      const { data } = payload;
      return {
        ...state,
        orders: { data, cus },
      };
    }
    default:
      return state;
  }
};
