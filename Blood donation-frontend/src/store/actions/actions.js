export const LOG_IN = "LOG_IN";
export const LOG_OUT = "LOG_OUT";

export const login = (token) => ({
  type: LOG_IN,
  payload: token,
});

export const logout = () => ({
  type: LOG_OUT,
});
