import React, { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { END_POINT } from "../../config/api";
import { SimpleToast } from "../../components/util/Toast/Toast";
import { useToast } from "../../services/toastService";
import axios from "axios";
import "./contact-us.css";

const ContactUs = (props) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const { toast, showToast, hideToast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  let dark = props.theme;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCaptchaChange = (token) => {
    if (!token) {
      setErrorMessage("reCAPTCHA validation failed, please try again.");
      return;
    }
    console.log("Generated Captcha Token:", token);
    setCaptchaToken(token);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (!captchaToken) {
    //   setErrorMessage("Please complete the CAPTCHA");
    //   showToast("Please complete the CAPTCHA", "error");
    //   return;
    // }

    setIsLoading(true);

    try {
      const response = await axios.post(`${END_POINT}/contact-us`, {
        ...formData,
        captchaToken,
      });

      if (response.status === 200) {
        setFormData({ name: "", email: "", subject: "", message: "" });
        setCaptchaToken(null);
        showToast(
          "Thank you for your message! We'll get back to you soon.",
          "success"
        );
        setErrorMessage("");
      } else {
        showToast(
          response.data.message || "Failed to submit the form.",
          "error"
        );
      }
    } catch (error) {
      if (error.response) {
        showToast(
          error.response.data.message || "An error occurred. Please try again.",
          "error"
        );
      } else {
        showToast("An error occurred. Please try again.", "error");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div
        className={`contact-section ${
          dark ? "contact-section-dark" : "contact-section-light"
        }`}
      >
        <div className={"contact-parent"}>
          <div className={`contact-child child1`}>
            <img
              src="/images/contact-image.png"
              alt="contact-image"
              className={"contact-image"}
            />
          </div>
          <div className={`contact-child child2`}>
            <div
              className={`contact-card ${
                dark ? "contact-card-dark" : "contact-card-light"
              }`}
            >
              <h2
                className={`contact-header-text ${
                  dark
                    ? "contact-header-text-dark"
                    : "contact-header-text-light"
                }`}
              >
                Get In Touch
              </h2>
              <form onSubmit={handleSubmit} className="inside-card">
                <div
                  className={`contact-input ${
                    dark ? "contact-input-dark" : "contact-input-light"
                  }`}
                >
                  <i className="fas fa-user"></i>
                  <label htmlFor="name">Name:</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    required
                  />
                </div>
                <div
                  className={`contact-input ${
                    dark ? "contact-input-dark" : "contact-input-light"
                  }`}
                >
                  <i className="fas fa-envelope"></i>
                  <label htmlFor="email">Email:</label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Your email"
                    required
                  />
                </div>
                <div
                  className={`contact-input ${
                    dark ? "contact-input-dark" : "contact-input-light"
                  }`}
                >
                  <i className="fas fa-comment-dots"></i>
                  <label htmlFor="subject">Subject:</label>
                  <input
                    id="subject"
                    type="text"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Subject"
                    required
                  />
                </div>
                <div
                  className={`contact-input ${
                    dark ? "contact-input-dark" : "contact-input-light"
                  }`}
                >
                  <i className="fas fa-paper-plane"></i>
                  <label htmlFor="message">Message:</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message"
                    required
                  />
                </div>

                {/* CAPTCHA Section */}
                {/* You can uncomment the below section for reCAPTCHA integration */}
                {/* <div className={"text-xs-center"}>
                  <div className={"g-recaptcha"}>
                    <ReCAPTCHA
                      sitekey="your-site-key"
                      onChange={handleCaptchaChange}
                    />
                  </div>
                </div> */}

                <div className="submit-btns">
                  <button
                    type="submit"
                    className="submit-button primary signup-btn"
                    disabled={isLoading}
                  >
                    {isLoading ? "Submitting..." : "Let's Talk!"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <SimpleToast
        open={toast.open}
        severity={toast.severity}
        message={toast.message}
        handleCloseToast={hideToast}
      />
    </>
  );
};

export default ContactUs;
