import { configureStore } from "@reduxjs/toolkit";

const initialState = {
  dados: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "GRAVAR_DADOS":
      return {
        ...state,
        dados: action.payload,
      };
    case "LER_DADOS":
      return state.dados;
    default:
      return state;
  }
};

const store = configureStore({
  reducer,
});

export default store;
