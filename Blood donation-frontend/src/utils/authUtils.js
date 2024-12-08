import { jwtDecode } from "jwt-decode";
import axios from "axios";
import { END_POINT } from "../config/api";

// Check if the token is expired
export const checkTokenExpiration = (token) => {
  if (!token) return false;

  const decodedToken = jwtDecode(token);
  const currentTime = Date.now() / 1000;

  return decodedToken.exp < currentTime; // True if expired
};

// Function to refresh the token
export const refreshToken = async (refreshTokenValue) => {
  try {
    // Make the refresh token request to the backend
    const response = await axios.post(`${END_POINT}/auth/refresh`, null, {
      params: { refreshToken: refreshTokenValue },
    });

    if (response.status === 200) {
      // Check if the response contains accessToken
      const { accessToken } = response.data;
      if (accessToken) {
        // Store the new access token in local storage
        localStorage.setItem("jwtToken", accessToken);
        return accessToken;
      } else {
        console.error("Access token is missing in the response.");
        return null;
      }
    } else {
      // Clear the local storage if refresh failed
      clearLocalStorage();
      return null;
    }
  } catch (error) {
    console.error("Error refreshing token", error);
    clearLocalStorage(); // Clear local storage on error
    return null;
  }
};

// Function to clear local storage
const clearLocalStorage = () => {
  localStorage.removeItem("email");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("LoggedIn");
  localStorage.removeItem("Role");
};

export const handleAutoLogout = (dispatch, navigate) => {
  localStorage.removeItem("email");
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("LoggedIn");
  localStorage.removeItem("Role");
  dispatch({ type: "LOG_OUT" }); // Redux action to update the state
  window.location.href = "/login";
};
