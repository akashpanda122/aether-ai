import React from "react";
import { Link } from "react-router-dom";
import Favourite from "../Homecategories/Favourite";
import Top from "../Homecategories/Top";
import Popular from "../Homecategories/Popular";
import TokenPrice from "../Homecategories/Tokenprice";
import Newtoken from "../Homecategories/Newtoken";

const TabContent = ({ marketData }) => {
  return (
    <div className="bg-menuDark tf-container">
      <div className="pt-12 pb-12 mt-4">
        <div className="wrap-filter-swiper">
          <h5>
            <Link to="/cryptex-rating" className="cryptex-rating">
              <i className="icon-star"></i>Aether Rating
            </Link>
          </h5>
          <div className="swiper-wrapper1 menu-tab-v3 mt-12" role="tablist">
            <div
              className="swiper-slide1 nav-link active"
              data-bs-toggle="tab"
              data-bs-target="#favorites"
              role="tab"
              aria-controls="favorites"
              aria-selected="true"
            >
              Favorites
            </div>
            <div
              className="swiper-slide1 nav-link"
              data-bs-toggle="tab"
              data-bs-target="#top"
              role="tab"
              aria-controls="top"
              aria-selected="false"
            >
              Top
            </div>
            <div
              className="swiper-slide1 nav-link"
              data-bs-toggle="tab"
              data-bs-target="#popular"
              role="tab"
              aria-controls="popular"
              aria-selected="false"
            >
              Popular
            </div>
            <div
              className="swiper-slide1 nav-link"
              data-bs-toggle="tab"
              data-bs-target="#price"
              role="tab"
              aria-controls="price"
              aria-selected="false"
            >
              Token price
            </div>
            <div
              className="swiper-slide1 nav-link"
              data-bs-toggle="tab"
              data-bs-target="#new"
              role="tab"
              aria-controls="new"
              aria-selected="false"
            >
              New token
            </div>
          </div>
        </div>
        <div className="tab-content mt-8">
          <div
            className="tab-pane fade show active"
            id="favorites"
            role="tabpanel"
          >
            <Favourite />
          </div>
          <div className="tab-pane fade" id="top" role="tabpanel">
            <Top />
          </div>
          <div className="tab-pane fade" id="popular" role="tabpanel">
            <Popular />
          </div>
          <div className="tab-pane fade" id="price" role="tabpanel">
            <TokenPrice tokenIds={marketData.map((token) => token.id)} />
          </div>
          <div className="tab-pane fade" id="new" role="tabpanel">
            <Newtoken />
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabContent;
