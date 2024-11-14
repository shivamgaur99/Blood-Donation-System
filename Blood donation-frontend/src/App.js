import { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/About/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Register from "./register/register";
import ScrollToTop from "./components/util/ScrollToTop/ScrollToTop";
import { Navbar } from "./components/Navbar/Navbar";
import GetInvolved from "./pages/GetInvolved/GetInvolved";
import Footer from "./components/Footer/Footer";
import AdminDashboard from "./pages/Admin/AdminDashboard/AdminDashboard";
import DonorList from "./pages/Admin/DonorList/DonorList";
import BloodRequestHistory from "./pages/Admin/BloodRequestHistory/BloodRequestHistory";
import AddDonors from "./pages/Admin/AddDonors/AddDonors";
import UserList from "./pages/Admin/UserList/UserList";
import UserDashboard from "./pages/User/UserDashboard/UserDashboard";
import MakeRequest from "./pages/User/MakeRequest/MakeRequest";
import DonateBlood from "./pages/User/DonateBlood/DonateBlood";
import RequestHistory from "./pages/User/RequestHistory/RequestHistory";
import Login from "./pages/Login/Login";
import DonorLists from "./pages/User/DonorLists/DonorLists";

function ScrollToTopOnRouteChange() {
  const location = useLocation();

  function getTheme() {
    return JSON.parse(localStorage.getItem("dark")) || false;
  }
  const [theme, setTheme] = useState(getTheme());
  const [toast, setToast] = useState(false);

  function toggleTheme() {
    setTheme((prevTheme) => !prevTheme);
    setToast(true);

    setTimeout(() => {
      setToast(false);
    }, 3000);

    localStorage.setItem("dark", !theme);
  }
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTopOnRouteChange />
      <Navbar />
      <ScrollToTop />
      <div>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/donorlist" element={<DonorList />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
          <Route path="/makeRequest" element={<MakeRequest />} />
          <Route path="/requestHistory" element={<RequestHistory />} />
          <Route path="/donateBlood" element={<DonateBlood />} />
          <Route path="/donors" element={<DonorLists />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/addDonors" element={<AddDonors />} />
          <Route path="/users" element={<UserList />} />
          <Route path="/bloodRequests" element={<BloodRequestHistory />} />
          <Route path="/get-involved" element={<GetInvolved />} />
        </Routes>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
