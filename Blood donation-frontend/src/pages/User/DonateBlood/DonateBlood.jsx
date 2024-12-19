import React, { useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { END_POINT } from "../../../config/api";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "./DonateBlood.css"; 
import useToast from "../../../hooks/useToast";

const DonateBlood = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dark = props.theme;  

  const { showToast, SnackbarToast } = useToast();

  const validationSchema = Yup.object({
    name: Yup.string().required("* Name is required"),
    bloodGroup: Yup.string().required("* Blood group is required"),
    units: Yup.number().positive().integer().required("* Units are required"),
    mobile: Yup.string()
      .matches(/^(\+\d{1,3}[- ]?)?\d{10}$/, "* Invalid phone number")
      .required("* Mobile number is required"),
    gender: Yup.string().required("* Gender is required"),
    age: Yup.number()
      .positive("* Age must be a positive number")
      .min(18, "* Age must be at least 18")
      .required("* Age is required"),
    city: Yup.string().required("* City is required"),
    address: Yup.string().required("* Address is required"),
    date: Yup.date().required("* Date is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    const donorData = {
      name: values.name,
      bloodGroup: values.bloodGroup,
      units: values.units,
      mobile: values.mobile,
      gender: values.gender,
      age: values.age,
      city: values.city,
      address: values.address,
      date: values.date,
    };

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      showToast("User is not authenticated. Please login again.", "error");
      return;
    }

    setIsLoading(true); 

    axios
      .post(`${END_POINT}/add`, donorData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setIsLoading(false); 
        showToast("Donation data added successfully!", "success");
        resetForm();
      })
      .catch((error) => {
        setIsLoading(false); 
        console.error("Error:", error);
        showToast("Failed to add donation data. Please try again later.", "error");
      });
  };

  return (
    <div className={`donate-blood-container ${dark ? 'dark' : 'light'}`}>
      <div className="form-container">
        <div className="image-section">
          <img
            src="https://via.placeholder.com/500"
            alt="Donate Blood"
            className="img-fluid"
          />
        </div>
        <div className="form-section">
          <Formik
            initialValues={{
              name: "",
              bloodGroup: "",
              units: "",
              mobile: "",
              gender: "",
              age: "",
              city: "",
              address: "",
              date: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form className="donate-form">
                <h1>Donate Blood</h1>

                <div className="form-group">
                  <label htmlFor="name">Name:</label>
                  <Field
                    type="text"
                    id="name"
                    name="name"
                    placeholder="Enter your full name"
                    className={dark ? 'dark-input' : 'light-input'}
                  />
                  <ErrorMessage name="name" component="div" className="error-message" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="bloodGroup">Blood Group:</label>
                    <Field as="select" id="bloodGroup" name="bloodGroup" className={dark ? 'dark-input' : 'light-input'}>
                      <option value="">Select Blood Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                    </Field>
                    <ErrorMessage name="bloodGroup" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="units">Units:</label>
                    <Field
                      type="number"
                      id="units"
                      name="units"
                      placeholder="Enter the number of units"
                      className={dark ? 'dark-input' : 'light-input'}
                    />
                    <ErrorMessage name="units" component="div" className="error-message" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="mobile">Mobile:</label>
                  <Field
                    type="text"
                    id="mobile"
                    name="mobile"
                    placeholder="Enter your mobile number"
                    className={dark ? 'dark-input' : 'light-input'}
                  />
                  <ErrorMessage name="mobile" component="div" className="error-message" />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="gender">Gender:</label>
                    <Field as="select" id="gender" name="gender" className={dark ? 'dark-input' : 'light-input'}>
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </Field>
                    <ErrorMessage name="gender" component="div" className="error-message" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="age">Age:</label>
                    <Field
                      type="number"
                      id="age"
                      name="age"
                      placeholder="Enter your age"
                      className={dark ? 'dark-input' : 'light-input'}
                    />
                    <ErrorMessage name="age" component="div" className="error-message" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="city">City:</label>
                  <Field
                    type="text"
                    id="city"
                    name="city"
                    placeholder="Enter your city"
                    className={dark ? 'dark-input' : 'light-input'}
                  />
                  <ErrorMessage name="city" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address:</label>
                  <Field
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Enter your address"
                    className={dark ? 'dark-input' : 'light-input'}
                  />
                  <ErrorMessage name="address" component="div" className="error-message" />
                </div>

                <div className="form-group">
                  <label htmlFor="date">Date:</label>
                  <Field
                    type="date"
                    id="date"
                    name="date"
                    className={dark ? 'dark-input' : 'light-input'}
                  />
                  <ErrorMessage name="date" component="div" className="error-message" />
                </div>

                <div className="form-submit">
                  <button
                    type="submit"
                    className={`submit-btn ${dark ? 'btn-light' : 'btn-primary'}`}
                    disabled={isSubmitting || !isValid || !dirty || isLoading}
                  >
                    {isLoading ? <CircularProgress size={24} color="inherit" /> : "Submit"}
                  </button>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      {/* Using SnackbarToast from the custom hook */}
      <SnackbarToast />
    </div>
  );
};

export default DonateBlood;
