import * as store from "../constants/store";

const initialState = {
  stores: [],
  storesFilter: [],
  isSelect: {},
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case store.GET_ALL_STORE: {
      return {
        ...state,
        stores: payload,
      };
    }
    case store.ADD_STORE: {
      state.stores.push(payload);
      return {
        ...state,
      };
    }
    case store.UPDATE_STORE: {
      const index = state.stores.findIndex((x) => x.maKh === payload.maKho);
      state.stores.splice(index, 1);
      state.stores.push(payload);
      return {
        ...state,
      };
    }
    case store.SET_SELECT_STORE: {
      const store = state.stores.find((x) => x.maKho === payload);
      return {
        ...state,
        isSelect: store,
      };
    }
    case store.ADD_DETAIL_STORE: {
      const { ctkho, data } = payload;
      // lấy store
      const indexStore = state.stores.findIndex((x) => x.maKho === ctkho.maKho);
      let store = state.stores[indexStore];
      store.ctKho.push(data);
      return {
        ...state,
      };
    }
    case store.UPDATE_DETAIL_STORE: {
      const { ctkho } = payload;

      console.log(ctkho);
      
      // lấy store
      const indexStore = state.stores.findIndex((x) => x.maKho === ctkho.maKho);
      let store = state.stores[indexStore];

      console.log(store);
      
      // lấy ctkho
      const indexCtkho = store.ctKho.findIndex((x) => x.maXe === ctkho.maXe);
      store.ctKho[indexCtkho].soluong = ctkho.soluong;

      console.log(store);
      
      return {
        ...state,
      };
    }
    case store.DELETE_STORE:{
      const indexStore = state.stores.findIndex(x=>x.maKho === state.isSelect.maKho);
      const indexSD = state.stores[indexStore].ctKho.findIndex(t=>t.maXe === payload);
      state.stores[indexStore].ctKho.splice(indexSD,1);
      return {
        ...state
      }
    }
    default:
      return state
  }
};
