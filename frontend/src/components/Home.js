import React, { useState, useEffect } from "react";
import logo144 from "../assets/images/logo/144.png";
import Header from "./Header/Header";
import WalletOverview from "./Wallet/Wallet";
import TabContent from "./TabContent/TabContent";
import Footer from "./Footer/Footer";
import MarketOverview from "./MarketOverview/MarketOverview";

const Home = () => {
  const [loading, setLoading] = useState(true);
  const [marketData, setMarketData] = useState([]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    const fetchMarketData = async () => {
      const tokenIds = ["bitcoin", "ethereum", "binancecoin"];
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds.join(
          ","
        )}&vs_currencies=usd&include_24hr_change=true`
      );
      const data = await response.json();
      const formattedData = tokenIds.map((id) => ({
        id,
        name: id.charAt(0).toUpperCase() + id.slice(1),
        price: data[id].usd,
        change: data[id].usd_24h_change.toFixed(2),
        imgSrc: `images/coin/market-${tokenIds.indexOf(id) + 1}.jpg`,
        changeClass:
          data[id].usd_24h_change >= 0 ? "icon-select-up" : "icon-select-down",
        changeColorClass:
          data[id].usd_24h_change >= 0 ? "text-primary" : "text-danger",
      }));
      setMarketData(formattedData);
    };

    fetchMarketData();

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="preload preload-container">
        <div
          className="preload-logo"
          style={{ backgroundImage: `url(${logo144})` }}
        >
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  return (
    <>
      <Header />
      <WalletOverview />
      <MarketOverview marketData={marketData} />
      <TabContent marketData={marketData} />
      <Footer />
    </>
  );
};

export default Home;
