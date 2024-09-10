import React, { useState, useEffect } from "react";

// images
import eth from "../../assets/images/coin/coin-6.jpg";
import wbtc from "../../assets/images/coin/coin-8.jpg";
import arb from "../../assets/images/coin/coin-3.jpg";
import weth from "../../assets/images/coin/coin-9.jpg";

const Favourite = () => {
  const [coins, setCoins] = useState([
    {
      id: 1,
      name: "ETH",
      image: eth,
      trend: "decrease",
    },
    {
      id: 2,
      name: "WBTC",
      image: wbtc,
      trend: "decrease",
    },
    {
      id: 3,
      name: "ARB",
      image: arb,
      trend: "increase",
    },
    {
      id: 4,
      name: "Litecoin",
      image: wbtc,
      trend: "decrease",
    },
    {
      id: 5,
      name: "WETH",
      image: weth,
      trend: "decrease",
    },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=ethereum,arbitrum-wbtc,wrapped-bitcoin,arbitrum,wrapped-ether,litecoin"
        );
        const data = await response.json();

        const updatedCoins = coins.map((coin) => {
          const liveData = data.find(
            (item) =>
              item.symbol.toLowerCase() ===
              coin.name.toLowerCase().replace("_", "")
          );

          if (liveData) {
            return {
              ...coin,
              marketCap: `$${(liveData.market_cap / 1e6).toFixed(2)}M`,
              price: `$${liveData.current_price.toLocaleString()}`,
              change: `${liveData.price_change_percentage_24h.toFixed(2)}%`,
              trend:
                liveData.price_change_percentage_24h >= 0
                  ? "increase"
                  : "decrease",
            };
          }

          return coin;
        });

        setCoins(updatedCoins);
      } catch (error) {
        console.error("Error fetching the market data", error);
      }
    };

    fetchData();
  }, []);

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
        {coins.map((coin) => (
          <li key={coin.id} className="mt-16">
            <a
              href="/home"
              className={`coin-item style-2 gap-12`}
            >
              <img src={coin.image} alt={coin.name} className="img" />
              <div className="content">
                <div className="title">
                  <p className="mb-4 text-button">{coin.name}</p>
                  <span className="text-secondary">{coin.marketCap}</span>
                </div>
                <div className="d-flex align-items-center gap-12">
                  <span className="text-small">{coin.price}</span>
                  <span className={`coin-btn ${coin.trend}`}>
                    {coin.change}
                  </span>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Favourite;
