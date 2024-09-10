import React from "react";
import { Link } from "react-router-dom";

const Newtoken = () => {
  const tokens = [
    {
      href: "/home",
      imgSrc: "images/coin/coin-6.jpg",
      title: "ETH",
      secondaryText: "$360,6M",
      price: "$1.878,80",
      change: "-1,62%",
      btnClass: "decrease",
    },
    {
      href: "/home",
      imgSrc: "images/coin/coin-7.jpg",
      title: "arb_ETH",
      secondaryText: "$132,18M",
      price: "$1.878,80",
      change: "+1,62%",
      btnClass: "increase",
    },
    {
      href: "/home",
      imgSrc: "images/coin/coin-8.jpg",
      title: "WBTC",
      secondaryText: "$50,56M",
      price: "$30.001,96",
      change: "-1,64%",
      btnClass: "decrease",
    },
    {
      href: "/home",
      imgSrc: "images/coin/coin-3.jpg",
      title: "ARB",
      secondaryText: "$31,55M",
      price: "$1,11",
      change: "+3,71%",
      btnClass: "increase",
    },
    {
      href: "/home",
      imgSrc: "images/coin/coin-9.jpg",
      title: "WETH",
      secondaryText: "$24,34M",
      price: "$1.878,56",
      change: "-1,62%",
      btnClass: "decrease",
    },
    {
      href: "/home",
      imgSrc: "images/coin/coin-10.jpg",
      title: "MATIC",
      secondaryText: "$19,36M",
      price: "$0,666",
      change: "-4,42%",
      btnClass: "decrease",
    },
  ];

  return (
    <div>
      <div className="d-flex justify-content-between">
        <span>Name</span>
        <p className="d-flex gap-8">
          <span>Last price</span>
          <span>Change</span>
        </p>
      </div>
      <ul className="mt-16">
        {tokens.map((token, index) => (
          <li key={index} className="mt-16">
            <Link to={token.href} className="coin-item style-2 gap-12">
              <img src={token.imgSrc} alt="img" className="img" />
              <div className="content">
                <div className="title">
                  <p className="mb-4 text-button">{token.title}</p>
                  <span className="text-secondary">{token.secondaryText}</span>
                </div>
                <div className="d-flex align-items-center gap-12">
                  <span className="text-small">{token.price}</span>
                  <span className={`coin-btn ${token.btnClass}`}>
                    {token.change}
                  </span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Newtoken;
