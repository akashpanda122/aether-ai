import React from "react";

const Footer = () => {
  return (
    <div className="menubar-footer footer-fixed">
      <ul className="inner-bar">
        <li className="active">
          <a href="/home">
            <i className="icon icon-home2"></i>
            Home
          </a>
        </li>
        <li>
          <a href="/home">
            <i className="icon icon-exchange"></i>
            Exchange
          </a>
        </li>
        <li>
          <a href="/home">
            <i className="icon icon-earn"></i>
            Earn
          </a>
        </li>
        <li>
          <a href="/home">
            <i className="icon icon-wallet"></i>
            Wallet
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Footer;
