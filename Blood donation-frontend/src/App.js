import { Fragment, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import "./App.css";
import ListDonorComponent from "./components/ListDonorComponent";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/About/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Register from "./register/register";
import UserDashboard from "./components/UserDashboard";
import CustomerLogin from "./login/Login";
import MakeRequest from "./components/MakeRequest";
import RequestHistory from "./components/RequestHistory";
import DonateBlood from "./components/DonateBlood";
import DonarList from "./components/DonarList";
import AdminDashboard from "./components/AdminDashboard";
import AddDonors from "./components/AddDonors";
import UserList from "./components/UserList";
import BloodRequestHistory from "./components/BloodRequestHistory";
import ScrollToTop from "./components/util/ScrollToTop/ScrollToTop";
import { Navbar } from "./components/Navbar/Navbar";
import GetInvolved from "./pages/GetInvolved/GetInvolved";
import Footer from "./components/Footer/Footer";

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
          <Route path="/donors" element={<ListDonorComponent />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<CustomerLogin />} />
          <Route path="/userDashboard" element={<UserDashboard />} />
          <Route path="/makeRequest" element={<MakeRequest />} />
          <Route path="/requestHistory" element={<RequestHistory />} />
          <Route path="/donateBlood" element={<DonateBlood />} />
          <Route path="/availableDonors" element={<DonarList />} />
          <Route path="/user-dashboard" element={<UserDashboard />} />
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
