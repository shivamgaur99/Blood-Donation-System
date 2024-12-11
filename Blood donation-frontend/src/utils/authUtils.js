import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { END_POINT } from "../config/api";

export const checkTokenExpiration = (token) => {
  if (!token) return false;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp < currentTime; // True if expired
};

export const refreshToken = async () => {
  try {
    const response = await axios.post(`${END_POINT}/auth/refresh`, null, {
      withCredentials: true,
    });

    if (response.status === 200 && response.data.accessToken) {
      const { accessToken } = response.data;
      localStorage.setItem("jwtToken", accessToken);
      return accessToken;
    } else {
      throw new Error("Refresh token failed");
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return null;
  }
};

export const logoutUser = async (dispatch, navigate) => {
  try {
    const response = await axios.post(`${END_POINT}/auth/logout`, null, {
      withCredentials: true,
    });

    if (response.status === 200) {
      handleAutoLogout(dispatch, navigate);
    }
  } catch (error) {
    console.error("Error logging out", error);
    handleAutoLogout(dispatch, navigate); // In case of error, still clear localStorage
  }
};

export const handleAutoLogout = (dispatch, navigate) => {
  localStorage.removeItem("email");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("LoggedIn");
  localStorage.removeItem("Roles");
  dispatch({ type: "LOG_OUT" }); // Redux action to update the state
  window.location.href = "/login";
};
