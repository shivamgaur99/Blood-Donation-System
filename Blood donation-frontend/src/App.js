import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListDonorComponent from "./components/ListDonorComponent";
import Navbar from "./components/HeaderComponent";
import Home from "./pages/Home/Home";
import AboutUs from "./pages/About/AboutUs";
import ContactUs from "./pages/ContactUs/ContactUs";
import Footer from "./components/Footer";
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

function App() {
 
  return (

    <div>
      <Router>
        <Navbar />
        <ScrollToTop /> 
        <div>
          <Routes>
            <Route exact path="/" element={<Home />}></Route>{" "}
            <Route path="/home" element={<Home />}></Route>{" "}
            <Route path="/about" element={<AboutUs />}></Route>{" "}
            <Route path="/contact" element={<ContactUs />}></Route>{" "}
            <Route path="/donors" element={<ListDonorComponent />}></Route>{" "}
            <Route path="/register" element={<Register />}></Route>{" "}
            <Route path="/login" element={<CustomerLogin/>}></Route>{" "}
            <Route path="/userDashboard" element={<UserDashboard/>}></Route>{" "}
            <Route path="/makeRequest" element={<MakeRequest/>}></Route>{" "}
            <Route path="/requestHistory" element={<RequestHistory/>}></Route>{" "}
            <Route path="/donateBlood" element={<DonateBlood/>}></Route>{" "}
            <Route path="/availableDonors" element={<DonarList/>}></Route>{" "}
            {/* <Route path="/adminLogin" element={<AdminLogin/>}></Route>{" "} */}
            {/* <Route path="/userLogin" element={<UserLogin/>}></Route>{" "} */}
            <Route path="/userDashboard" element={<UserDashboard/>}></Route>{" "}
            <Route path="/adminDashboard" element={<AdminDashboard/>}></Route>{" "}
            <Route path="/addDonors" element={<AddDonors/>}></Route>{" "}
            <Route path="/users" element={<UserList/>}></Route>{" "}
            <Route path="/bloodRequests" element={<BloodRequestHistory/>}></Route>{" "}
          </Routes>
        </div>
      </Router>
      <Footer />
    </div>
  );
}

export default App;
