import React from "react";
import { Link } from "react-router-dom";

const MarketOverview = ({ marketData }) => {
  return (
    <div className="bg-menuDark tf-container">
      <div className="pt-12 pb-12 mt-4">
        <h5>Market</h5>
        <div
          className="swiper tf-swiper swiper-wrapper-r mt-16"
          data-space-between="16"
          data-preview="2.8"
          data-tablet="2.8"
          data-desktop="3"
        >
          <div className="swiper-wrapper">
            {marketData.map((token, index) => (
              <div className="swiper-slide" key={index}>
                <Link to="/home" className="coin-box d-block">
                  <div className="coin-logo">
                    <img src={token.imgSrc} alt={token.name} className="logo" />
                    <div className="title">
                      <p>{token.name}</p>
                      <span>{token.id.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="mt-8 mb-8 coin-chart">
                    <div id={`line-chart-${index + 1}`}></div>
                  </div>
                  <div className="coin-price d-flex justify-content-between">
                    <span>${token.price}</span>
                    <span
                      className={`${token.changeColorClass} d-flex align-items-center gap-2`}
                    >
                      <i className={token.changeClass}></i> {token.change}%
                    </span>
                  </div>
                  <div className={`blur bg${index + 1}`}></div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketOverview;
