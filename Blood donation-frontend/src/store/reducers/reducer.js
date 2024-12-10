import { LOG_IN, LOG_OUT } from "../actions/actions";

const initialState = {
  token: localStorage.getItem("jwtToken") || null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_IN:
      return {
        ...state,
        token: action.payload,
      };
    case LOG_OUT:
      return {
        ...state,
        token: null,
      };
    default:
      return state;
  }
};

export default reducer;
