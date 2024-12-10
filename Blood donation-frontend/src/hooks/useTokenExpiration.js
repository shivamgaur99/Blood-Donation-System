import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  checkTokenExpiration,
  refreshToken,
  handleAutoLogout,
} from "../utils/authUtils";

const useTokenExpiration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    const refreshTokenValue = localStorage.getItem("refreshToken");

    if (checkTokenExpiration(token)) {
      if (refreshTokenValue) {
        refreshToken(refreshTokenValue).then((newToken) => {
          if (!newToken) {
            handleAutoLogout(dispatch, navigate);
          }
        });
      } else {
        handleAutoLogout(dispatch, navigate);
      }
    }
  }, [dispatch, navigate]);
};

export default useTokenExpiration;
