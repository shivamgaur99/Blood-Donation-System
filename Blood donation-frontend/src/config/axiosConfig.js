// axiosConfig.js
import axios from "axios";
import {
  checkTokenExpiration,
  refreshToken,
  handleAutoLogout,
} from "./utils/authUtils";

const axiosInstance = axios.create({
  baseURL: "https://your-api.com",
  timeout: 10000,
});

// Request Interceptor to check token expiration before making an API request
axiosInstance.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("jwtToken");

    if (checkTokenExpiration(token)) {
      const refreshTokenValue = localStorage.getItem("refreshToken");

      if (refreshTokenValue) {
        const newToken = await refreshToken(refreshTokenValue);
        if (newToken) {
          config.headers["Authorization"] = `Bearer ${newToken}`;
        } else {
          handleAutoLogout(); // Auto logout if token refresh fails
        }
      } else {
        handleAutoLogout(); // Auto logout if no refresh token
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
