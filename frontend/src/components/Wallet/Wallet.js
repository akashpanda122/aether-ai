import React from "react";
import { Link } from "react-router-dom";

const WalletOverview = () => {
  return (
    <div className="bg-menuDark tf-container">
      <div className="pt-12 pb-12 mt-4">
        <h5>
          <span className="text-primary">My Wallet</span> -{" "}
          <a
            href="#"
            className="choose-account"
            data-bs-toggle="modal"
            data-bs-target="#accountWallet"
          >
            <span className="dom-text">Account 1 </span>{" "}
            <i className="icon-select-down"></i>
          </a>
        </h5>
        <h1 className="mt-16">
          <a href="#">$0.00</a>
        </h1>
        <ul className="mt-16 grid-4 m--16">
          <li>
            <Link
              to="/home"
              className="tf-list-item d-flex flex-column gap-8 align-items-center"
            >
              <span className="box-round bg-surface d-flex justify-content-center align-items-center">
                <i className="icon icon-way"></i>
              </span>
              Send
            </Link>
          </li>
          <li>
            <Link
              to="/home"
              className="tf-list-item d-flex flex-column gap-8 align-items-center"
            >
              <span className="box-round bg-surface d-flex justify-content-center align-items-center">
                <i className="icon icon-way2"></i>
              </span>
              Receive
            </Link>
          </li>
          <li>
            <Link
              to="/home"
              className="tf-list-item d-flex flex-column gap-8 align-items-center"
            >
              <span className="box-round bg-surface d-flex justify-content-center align-items-center">
                <i className="icon icon-wallet"></i>
              </span>
              Buy
            </Link>
          </li>
          <li>
            <Link
              to="/home"
              className="tf-list-item d-flex flex-column gap-8 align-items-center"
            >
              <span className="box-round bg-surface d-flex justify-content-center align-items-center">
                <i className="icon icon-exchange"></i>
              </span>
              Earn
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default WalletOverview;
