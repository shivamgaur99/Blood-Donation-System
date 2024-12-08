import { Fragment, useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import "./App.css";
import {
  checkTokenExpiration,
  refreshToken,
  handleAutoLogout,
} from "./utils/authUtils";
import useInactivityLogout from "./hooks/useInactivityLogout";

import Home from "./pages/Home/Home";
import AboutUs from "./pages/About/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
import GetInvolved from "./pages/GetInvolved/GetInvolved";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import DonorList from "./pages/Admin/DonorList/DonorList";
import BloodRequestHistory from "./pages/Admin/BloodRequestHistory/BloodRequestHistory";
import AddDonors from "./pages/Admin/AddDonors/AddDonors";
import UserList from "./pages/Admin/UserList/UserList";
import UserDashboard from "./pages/User/UserDashboard/UserDashboard";
import MakeRequest from "./pages/User/MakeRequest/MakeRequest";
import DonateBlood from "./pages/User/DonateBlood/DonateBlood";
import RequestHistory from "./pages/User/RequestHistory/RequestHistory";
import { NotFound } from "./components/ErrorHandlerPages/404/NotFound";

import ScrollToTop from "./components/util/ScrollToTop/ScrollToTop";
import { Navbar } from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import { SimpleToast } from "./components/util/Toast/Toast";
import { useToast } from "./services/toastService";
import EventManagement from "./pages/Admin/EventManagement/EventManagement";
import Event from "./pages/Event/Event";
import Donations from "./pages/User/Donations/Donations";
import CreateEvent from "./pages/Admin/EventManagement/CreateEvent/CreateEvent";
import ManageEvents from "./pages/Admin/EventManagement/ManageEvents/ManageEvents";

function App() {
  const getTheme = () => JSON.parse(localStorage.getItem("dark")) || false;
  const [theme, setTheme] = useState(getTheme());

  const { toast, showToast, hideToast } = useToast();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem("dark", newTheme);
      showToast(`switched to ${newTheme ? "dark" : "light"} theme.`, "info");
      return newTheme;
    });
  };

  useInactivityLogout();

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

  return (
    <Fragment>
      <Navbar handleClick={toggleTheme} theme={theme} />
      <main>
        <Routes>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/about-us" element={<AboutUs theme={theme} />} />
          <Route path="/contact-us" element={<ContactUs theme={theme} />} />
          <Route path="/register" element={<Register theme={theme} />} />
          <Route path="/login" element={<Login theme={theme} />} />
          <Route path="/donorlist" element={<DonorList theme={theme} />} />
          <Route
            path="/user-dashboard"
            element={<UserDashboard theme={theme} />}
          />
          <Route path="/makeRequest" element={<MakeRequest theme={theme} />} />
          <Route
            path="/requestHistory"
            element={<RequestHistory theme={theme} />}
          />
          <Route path="/donateBlood" element={<DonateBlood theme={theme} />} />
          <Route path="/user-donors" element={<Donations theme={theme} />} />
          <Route
            path="/admin-dashboard"
            element={<AdminDashboard theme={theme} />}
          />
          <Route path="/addDonors" element={<AddDonors theme={theme} />} />
          <Route path="/users" element={<UserList theme={theme} />} />
          <Route
            path="/bloodRequests"
            element={<BloodRequestHistory theme={theme} />}
          />
          <Route path="/get-involved" element={<GetInvolved theme={theme} />} />
          <Route
            path="/event-management"
            element={<EventManagement theme={theme} />}
          />
          <Route path="/events" element={<Event theme={theme} />} />
          <Route path="/create-event" element={<CreateEvent theme={theme} />} />
          <Route
            path="/manage-events"
            element={<ManageEvents theme={theme} />}
          />
          {/* NotFound Route */}
          <Route path="*" element={<NotFound theme={theme} />} />
        </Routes>
      </main>
      <Footer />
      <ScrollToTop />
      <SimpleToast
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        handleCloseToast={hideToast}
      />
    </Fragment>
  );
}

export default App;
