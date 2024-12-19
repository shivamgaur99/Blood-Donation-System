import React, { useState } from "react";
import axios from "axios";
import { CircularProgress } from "@mui/material";
import { END_POINT } from "../../../config/api";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import useToast from "../../../hooks/useToast";
import "./MakeRequest.css"; // Ensure this has the same styling as DonateBlood

const MakeRequest = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dark = props.theme; // Get the current theme from props

  const { showToast, SnackbarToast } = useToast();

  // Validation schema using Yup
  const validationSchema = Yup.object({
    name: Yup.string().required("* Name is required"),
    email: Yup.string().email("* Invalid email address").required("* Email is required"),
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
  });

  const handleSubmit = (values, { resetForm }) => {
    const requestData = {
      name: values.name,
      email: values.email,
      bloodGroup: values.bloodGroup,
      units: values.units,
      mobile: values.mobile,
      gender: values.gender,
      age: values.age,
      disease: values.disease || "",
      status: false,
    };

    const token = localStorage.getItem("jwtToken");
    if (!token) {
      showToast("User is not authenticated. Please login again.", "error");
      return;
    }

    setIsLoading(true); 

    axios
      .post(`${END_POINT}/blood-requests`, requestData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setIsLoading(false);
        showToast("Blood request added successfully!", "success");
        resetForm();
      })
      .catch((error) => {
        setIsLoading(false); // Reset loading state
        console.error("Error:", error);
        showToast("Failed to add blood request. Please try again later.", "error");
      });
  };

  return (
    <div className={`make-request-container ${dark ? 'dark' : 'light'}`}>
      <div className="form-container">
        <div className="image-section">
          <img
            src="/images/request1.png"
            alt="Make Request"
            className="img-fluid"
          />
        </div>
        <div className="form-section">
          <Formik
            initialValues={{
              name: "",
              email: "",
              bloodGroup: "",
              units: "",
              mobile: "",
              gender: "",
              age: "",
              disease: "",
            }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
          >
            {({ isSubmitting, isValid, dirty }) => (
              <Form className="request-form">
                <h1>Make Blood Request</h1>

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

                <div className="form-group">
                  <label htmlFor="email">Email:</label>
                  <Field
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    className={dark ? 'dark-input' : 'light-input'}
                  />
                  <ErrorMessage name="email" component="div" className="error-message" />
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
                    type="tel"
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
                  <label htmlFor="disease">Disease (Optional):</label>
                  <Field
                    type="text"
                    id="disease"
                    name="disease"
                    placeholder="Any known disease (optional)"
                    className={dark ? 'dark-input' : 'light-input'}
                  />
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

export default MakeRequest;
