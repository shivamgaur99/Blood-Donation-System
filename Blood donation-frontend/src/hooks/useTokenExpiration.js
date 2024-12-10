import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  checkTokenExpiration,
  refreshToken,
  logoutUser,
} from "../utils/authUtils";

const useTokenExpiration = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    
    if (token && checkTokenExpiration(token)) {
      refreshToken().then((newToken) => {
        if (!newToken) {
          Swal.fire({
            icon: "warning",
            title: "Session Expired",
            text: "Your session has expired. Please log in again.",
            confirmButtonText: "OK",
          }).then(() => {
            logoutUser(dispatch, navigate);
          });
        }
      });
    }
  }, [dispatch, navigate]);
};

export default useTokenExpiration;
