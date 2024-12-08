import { LOG_OUT } from "../actions/actions";

const initialState = {
  token: localStorage.getItem("jwtToken") || null,
  refreshToken: localStorage.getItem("refreshToken") || null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOG_OUT:
      return {
        ...state,
        token: null,
        refreshToken: null,
      };
    default:
      return state;
  }
};

export default reducer;
