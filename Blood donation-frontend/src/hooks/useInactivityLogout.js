import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { logout } from "../store/actions/actions";
import { useNavigate } from "react-router-dom";

const useInactivityLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    let timer;

    const resetTimer = () => {
      clearTimeout(timer);
      timer = setTimeout(() => {
        dispatch(logout());
        localStorage.removeItem("email");
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("LoggedIn");
        localStorage.removeItem("Role");
        window.location.href = "/login";
      }, 1000 * 60 * 30); // 30 minutes of inactivity
    };

    window.addEventListener("mousemove", resetTimer);
    window.addEventListener("keypress", resetTimer);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("mousemove", resetTimer);
      window.removeEventListener("keypress", resetTimer);
    };
  }, [dispatch, navigate]);
};

export default useInactivityLogout;
