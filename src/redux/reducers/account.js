import * as account from "../constants/account";

const initialState = {
  error: "",
  currentUser: {},
  isLogged: false,
  loading: true,
  accs: [],
  isSelect: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case account.GET_CURRENT_USER:
    case account.LOGIN: {
      window.localStorage.setItem("x-auth", payload.token);
      return {
        ...state,
        currentUser: payload,
        isLogged: true,
        loading: false,
      };
    }
    case account.LOGOUT: {
      window.localStorage.removeItem("x-auth");
      return {
        ...state,
        currentUser: {},
        isLogged: false,
        loading: false,
        error: "",
      };
    }
    case account.ACCOUNT_ERRORS: {
      return {
        ...state,
        error: payload,
      };
    }
    case account.SET_NONE_ERRORS: {
      return {
        ...state,
        error: "",
      };
    }
    case account.SET_APP_LOADED: {
      return {
        ...state,
        loading: false,
      };
    }
    case account.GET_ALL_ACC: {
      return {
        ...state,
        accs: payload,
      };
    }
    case account.SET_SELECT_ACC: {
      const index = state.accs.findIndex((t) => t.userName === payload);
      state.isSelect = state.accs[index];
      return {
        ...state,
      };
    }
    case account.DELETE_ACC: {
      const index = state.accs.findIndex((t) => t.userName === payload);
      state.accs.splice(index, 1);
      return {
        ...state,
      };
    }
    default:
      return state;
  }
};
