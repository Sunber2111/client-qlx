import {
  GET_ALL_CATEGORY,
  ADD_CATEGORY,
  DELETE_CATEGORY,
  UPDATE_CATEGORY,
  SET_SELECT_CATE,
  DELETE_SELECT_CATE,
} from "../constants/category";

const initialState = {
  categories: [],
  isSelect: null,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_CATEGORY: {
      return {
        ...state,
        categories: payload,
      };
    }
    case ADD_CATEGORY: {
      state.categories.push(payload);
      return {
        ...state,
      };
    }
    case UPDATE_CATEGORY: {
      const index = state.categories.findIndex(
        (x) => x.maLoaiXe === payload.maLoaiXe
      );
      state.categories[index].tenLoaiXe = payload.tenLoaiXe;
      return {
        ...state,
      };
    }
    case DELETE_CATEGORY: {
      const index = state.categories.findIndex((x) => x.maLoaiXe === payload);
      state.categories.splice(index, 1);
      return {
        ...state,
      };
    }
    case SET_SELECT_CATE: {
      const index = state.categories.findIndex((x) => x.maLoaiXe === payload);
      state.isSelect = state.categories[index];
      return {
        ...state,
      };
    }
    case DELETE_SELECT_CATE: {
      state.isSelect = null;
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
