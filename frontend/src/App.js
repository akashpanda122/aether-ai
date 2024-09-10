import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./components/onboarding/Welcome";
import Boarding from "./components/onboarding/Boarding";
import Boarding2 from "./components/onboarding/Boarding2";
import Login from "./components/onboarding/Login";
import Register from "./components/onboarding/Register";
import Otp from "./components/onboarding/Otp";
import Enterhome from "./components/onboarding/Enterhome";
import Home from "./components/Home";

import "./assets/css/styles.css";
import "./assets/css/swiper-bundle.min.css";
import "./assets/fonts/font-icons.css";
import "./assets/fonts/fonts.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/boarding" element={<Boarding />} />
        <Route path="/boarding2" element={<Boarding2 />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/otp" element={<Otp />} />
        <Route path="/enterhome" element={<Enterhome />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
