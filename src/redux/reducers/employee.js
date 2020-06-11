import {
  ADD_EMP,
  DELETE_EMP,
  UPDATE_EMP,
  GET_ALL_EMP,
} from "../constants/employee";
import { UPDATE_ACTIVE, REGIS_ACC } from "../constants/account";

const initialState = {
  emps: [],
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_ALL_EMP: {
      return {
        ...state,
        emps: payload,
      };
    }
    case ADD_EMP: {
      state.emps.push(payload);
      return {
        ...state,
      };
    }
    case UPDATE_EMP: {
      const index = state.emps.findIndex((x) => x.maNv === payload.maNv);
      state.emps.splice(index, 1, payload);
      return {
        ...state,
      };
    }
    case DELETE_EMP: {
      const index = state.emps.findIndex((x) => x.maNv === payload);
      state.emps.splice(index, 1);
      return {
        ...state,
      };
    }
    case UPDATE_ACTIVE: {
      const index = state.emps.findIndex((x) => x.maNv == payload.id);
      state.emps[index].kichHoat = !payload.stateAcive;
      return {
        ...state,
      };
    }
    case REGIS_ACC: {
      const index = state.emps.findIndex((x) => x.maNv == payload.maNv);
      state.emps.splice(index, 1, payload);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
