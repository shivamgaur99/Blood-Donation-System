import { Fragment, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import useInactivityLogout from "./hooks/useInactivityLogout";
import useTokenExpiration from "./hooks/useTokenExpiration";

import Home from "./pages/Home/Home";
import AboutUs from "./pages/About/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Register from "./pages/Register/Register";
import Login from "./pages/Login/Login";
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
import AllEvents from "./pages/Event/Components/AllEvents/AllEvents";
import Contacts from "./pages/Admin/Contacts/Contacts";
import VolunteerList from "./pages/Admin/Volunteers/VolunteerList";
import Volunteer from "./pages/Volunteer/VolunteerForm";
import Faq from "./pages/FAQs/Faq";
import Terms from "./pages/Terms/Terms";
import PrivacyPolicy from "./pages/PrivacyPolicy/PrivacyPolicy";

function App() {
  const getTheme = () => JSON.parse(localStorage.getItem("dark")) || false;
  const [theme, setTheme] = useState(getTheme());

  const { toast, showToast, hideToast } = useToast();

  const toggleTheme = () => {
    setTheme((prevTheme) => {
      const newTheme = !prevTheme;
      localStorage.setItem("dark", newTheme);
      showToast(`switched to ${newTheme ? "dark" : "light"} theme.`, "info");
      return newTheme;
    });
  };

  useTokenExpiration();
  // useInactivityLogout();

  // Access token (user authentication check)
  const token = useSelector((state) => state.auth.token);

  return (
    <Fragment>
      <Navbar handleClick={toggleTheme} theme={theme} />
      <main>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/about-us" element={<AboutUs theme={theme} />} />
          <Route path="/contact-us" element={<ContactUs theme={theme} />} />
          <Route path="/register" element={<Register theme={theme} />} />
          <Route path="/login" element={<Login theme={theme} />} />
          <Route path="/events" element={<Event theme={theme} />} />
          <Route path="/all-events" element={<AllEvents theme={theme} />} />
          <Route path="/faqs" element={<Faq theme={theme} />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy theme={theme} />} />
          <Route path="/terms" element={<Terms theme={theme} />} />

          {/* Protected Routes - Accessible only if the user is authenticated */}
          <Route
            path="/user-dashboard"
            element={
              token ? <UserDashboard theme={theme} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/makeRequest"
            element={
              token ? <MakeRequest theme={theme} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/requestHistory"
            element={
              token ? (
                <RequestHistory theme={theme} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/donateBlood"
            element={
              token ? <DonateBlood theme={theme} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/user-donors"
            element={
              token ? <Donations theme={theme} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/admin-dashboard"
            element={
              token ? (
                <AdminDashboard theme={theme} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/addDonors"
            element={
              token ? <AddDonors theme={theme} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/users"
            element={
              token ? <UserList theme={theme} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/bloodRequests"
            element={
              token ? (
                <BloodRequestHistory theme={theme} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/donorlist"
            element={
              token ? <DonorList theme={theme} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/get-involved"
            element={
              token ? <Volunteer theme={theme} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/event-management"
            element={
              token ? (
                <EventManagement theme={theme} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/create-event"
            element={
              token ? <CreateEvent theme={theme} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/manage-events"
            element={
              token ? <ManageEvents theme={theme} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/contacts"
            element={
              token ? <Contacts theme={theme} /> : <Navigate to="/login" />
            }
          />
          <Route
            path="/volunteers"
            element={
              token ? <VolunteerList theme={theme} /> : <Navigate to="/login" />
            }
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
