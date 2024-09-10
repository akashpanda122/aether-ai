import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Otp = () => {
  const navigate = useNavigate();
  const [digits, setDigits] = useState({
    digit2: "3",
    digit3: "6",
    digit4: "",
    digit5: "",
  });
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDigits({
      ...digits,
      [name]: value,
    });
  };

  const handleConfirm = () => {
    // Add your confirmation logic here
    navigate("/enterhome");
  };

  return (
    <div className="otp-page">
      {/* Header */}
      <div className="header fixed-top bg-surface d-flex justify-content-center align-items-center">
        <Link to="#" className="left back-btn">
          <i className="icon-left-btn"></i>
        </Link>
        <h3>OTP</h3>
      </div>
      <div className="pt-45 pb-20">
        <div className="tf-container">
          <form className="mt-32">
            <div className="digit-group mt-12">
              <input
                required
                type="text"
                id="digit-2"
                name="digit2"
                value={digits.digit2}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                id="digit-3"
                name="digit3"
                value={digits.digit3}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                id="digit-4"
                name="digit4"
                value={digits.digit4}
                onChange={handleChange}
              />
              <input
                required
                type="text"
                id="digit-5"
                name="digit5"
                value={digits.digit5}
                onChange={handleChange}
              />
            </div>
            <p className="text-center text-small text-white mt-16">
              A code has been sent to your mail
            </p>
            <p className="d-flex justify-content-center mt-4 text-center text-button text-primary fw-6">
              Resend in&nbsp;<span className="js-countdown">{countdown}</span>
            </p>
            <button
              type="button"
              className="mt-40 tf-btn lg primary"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Otp;
