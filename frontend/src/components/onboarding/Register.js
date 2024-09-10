import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "Tony Nguyen",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "12345",
    termsAccepted: true,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your registration logic here

    // Redirect to the OTP page
    navigate("/otp");
  };

  return (
    <div className="register-page">
      <div className="header fixed-top bg-surface">
        <Link to="#" className="left back-btn">
          <i className="icon-left-btn"></i>
        </Link>
      </div>
      <div className="pt-45">
        <div className="tf-container">
          <form onSubmit={handleSubmit} className="mt-32 mb-16">
            <h2 className="text-center">Register Aether</h2>
            <fieldset className="mt-40">
              <label className="label-ip">
                <p className="mb-8 text-small">Name</p>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </label>
            </fieldset>
            <fieldset className="mt-16">
              <label className="label-ip">
                <p className="mb-8 text-small">Email</p>
                <input
                  type="text"
                  name="email"
                  placeholder="Example@gmail"
                  value={formData.email}
                  onChange={handleChange}
                />
              </label>
            </fieldset>
            <fieldset className="mt-16">
              <label className="label-ip">
                <p className="mb-8 text-small">Phone Number</p>
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                />
              </label>
            </fieldset>
            <fieldset className="mt-16">
              <label className="label-ip">
                <p className="mb-8 text-small">Password</p>
                <div className="box-auth-pass">
                  <input
                    type={passwordVisible ? "text" : "password"}
                    name="password"
                    required
                    placeholder="6 -20 characters"
                    className="password-field"
                    value={formData.password}
                    onChange={handleChange}
                  />
                  <span
                    className="show-pass"
                    onClick={togglePasswordVisibility}
                  >
                    <i
                      className={
                        passwordVisible ? "icon-view-hide" : "icon-view"
                      }
                    ></i>
                  </span>
                </div>
              </label>
            </fieldset>
            <fieldset className="mt-16">
              <label className="label-ip">
                <p className="mb-8 text-small">Confirm Password</p>
                <div className="box-auth-pass">
                  <input
                    type={confirmPasswordVisible ? "text" : "password"}
                    name="confirmPassword"
                    required
                    placeholder="confirm password"
                    className="password-field2"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                  <span
                    className="show-pass2"
                    onClick={toggleConfirmPasswordVisibility}
                  >
                    <i
                      className={
                        confirmPasswordVisible ? "icon-view-hide" : "icon-view"
                      }
                    ></i>
                  </span>
                </div>
              </label>
            </fieldset>
            <fieldset className="group-cb cb-signup mt-12">
              <input
                type="checkbox"
                className="tf-checkbox"
                id="cb-ip"
                name="termsAccepted"
                checked={formData.termsAccepted}
                onChange={handleChange}
              />
              <label htmlFor="cb-ip">
                I agree to{" "}
                <span className="text-white">Terms and condition</span>
              </label>
            </fieldset>
            <button type="submit" className="mt-40">
              Create an account
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
