import {
  GET_TOP_5,
  GET_12_MONTH,
  GET_FN,
  GET_TOP_3_CAR,
} from "redux/constants/doanhthu";

const initialState = {
  dataDonus: [],
  data12M: [],
  fn: {},
  dataTop3: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_TOP_5: {
      return {
        ...state,
        dataDonus: payload,
      };
    }
    case GET_12_MONTH: {
      return {
        ...state,
        data12M: payload,
      };
    }
    case GET_FN: {
      return {
        ...state,
        fn: payload,
      };
    }
    case GET_TOP_3_CAR: {
      return {
        ...state,
        dataTop3: payload,
      };
    }
    default:
      return state;
  }
};
