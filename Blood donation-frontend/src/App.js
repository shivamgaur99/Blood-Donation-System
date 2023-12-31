import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ListDonorComponent from "./components/ListDonorComponent";
import CreateDonorComponent from "./components/CreateDonorComponent";
import UpdateDonorComponent from "./components/UpdateDonorComponent.js";
import NavScrollExample from "./components/HeaderComponent";
import Home from "./components/Home";
import AboutUs from "./components/AboutUs";
import ContactUs from "./components/ConatactUs";
import Footer from "./components/Footer";
import Register from "./register/register";
import UserDashboard from "./components/UserDashboard";
// import { useState, useEffect } from 'react';
import CustomerLogin from "./login/Login";
import MakeRequest from "./components/MakeRequest";
import RequestHistory from "./components/RequestHistory";
import DonateBlood from "./components/DonateBlood";
import DonarList from "./components/DonarList";
import AdminDashboard from "./components/AdminDashboard";
import AddDonors from "./components/AddDonors";
import UserList from "./components/UserList";
import BloodRequestHistory from "./components/BloodRequestHistory";
function App() {
  // const [loggedin, setloggedin] = useState(false)
  // const [loggedinuser, setloggedinuser] = useState("")
  // // let loggedin = false;

  return (

    <div>
      <Router>
        <NavScrollExample />
        {/* <HeaderComponent/>    */}
        <div className="container-fluid">
          <Routes>
            <Route exact path="/" element={<Home />}></Route>{" "}
            {/* http://localhost:3000/ */}
            <Route path="/home" element={<Home />}></Route>{" "}
            <Route path="/about" element={<AboutUs />}></Route>{" "}
            <Route path="/contact" element={<ContactUs />}></Route>{" "}
            <Route path="/donors" element={<ListDonorComponent />}></Route>{" "}
            {/* http://localhost:3000/donors */}
            <Route
              path="/add-donor/"
              element={<CreateDonorComponent />}
            ></Route>{" "}
            {/* http://localhost:3000/add-donor */}
            <Route
              path="/update-donor/:id"
              element={<UpdateDonorComponent />}
            ></Route>{" "}
            {/* http://localhost:3000/update-donor/2 */}
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
