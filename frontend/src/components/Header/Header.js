import React from "react";
import { Link } from "react-router-dom";
import avt from "../../assets/images/avt/avt2.jpg";

const Header = () => {
  return (
    <div className="header-style2 fixed-top bg-menuDark">
      <div className="d-flex justify-content-between align-items-center gap-14">
        <div className="box-account style-2">
          <Link to="/home">
            <img src={avt} alt="img" className="avt" />
          </Link>
          <div className="search-box box-input-field style-2">
            <Link to="/home" className="icon-search"></Link>
            <input
              type="text"
              placeholder="Looking for crypto"
              required
              className="clear-ip"
            />
            <i className="icon-close"></i>
          </div>
        </div>
        <div className="d-flex align-items-center gap-8">
          <Link to="/home" className="icon-gift"></Link>
          <a
            href="#notification"
            className="icon-noti box-noti"
            data-bs-toggle="modal"
          ></a>
        </div>
      </div>
    </div>
  );
};

export default Header;
