import * as pur from "../constants/pur";

const initialState = {
  purs: [],
  pursFilter: [],
  isSelect: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case pur.GET_ALL_PUR: {
      return {
        ...state,
        purs: payload,
        isSelect: null,
      };
    }
    case pur.ADD_PUR: {
      state.purs.push(payload);
      return {
        ...state,
        isSelect: null,
      };
    }
    case pur.SET_SELECT_PUR: {
      const index = state.purs.findIndex((x) => x.maHdn === payload);

      state.isSelect = state.purs[index];

      return {
        ...state,
      };
    }
    case pur.DELETE_PUR: {
      const index = state.purs.findIndex((x) => x.maHdn === payload);
      state.purs.splice(index, 1);
      return {
        ...state,
        isSelect: null,
      };
    }
    default:
      return state
  }
};
