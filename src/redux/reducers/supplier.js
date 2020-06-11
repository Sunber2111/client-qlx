import * as supplier from "../constants/supplier";

const initialState = {
  sups: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case supplier.GET_ALL_SUP: {
      return {
        ...state,
        sups: payload,
      };
    }
    case supplier.ADD_SUP: {
      state.sups.push(payload);
      return {
        ...state,
      };
    }
    case supplier.UPDATE_SUP: {
      const index = state.sups.findIndex((x) => x.maNcc === payload.maNcc);
      state.sups.splice(index, 1);
      state.sups.push(payload);
      return {
        ...state,
      };
    }
    case supplier.DELETE_SUP: {
      const index = state.sups.findIndex((x) => x.maNcc === payload.maNcc);
      state.sups.splice(index, 1);
      return {
        ...state,
      };
    }
    case supplier.GET_HDN_SUP: {
      const { data, id } = payload;
      const index = state.sups.findIndex((x) => x.maNcc === id);
      const sup = state.sups[index];
      return {
        ...state,
        hdn: data,
        selectSup: sup,
      };
    }
    default:
      return state;
  }
};
