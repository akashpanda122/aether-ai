import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const TokenItem = ({
  href,
  imgSrc,
  title,
  secondaryText,
  price,
  change,
  btnClass,
}) => (
  <li className="mt-16">
    <Link to={href} className="coin-item style-2 gap-12">
      <img src={imgSrc} alt={title} className="img" />
      <div className="content">
        <div className="title">
          <p className="mb-4 text-button">{title}</p>
          <span className="text-secondary">{secondaryText}</span>
        </div>
        <div className="d-flex align-items-center gap-12">
          <span className="text-small">{price}</span>
          <span className={`coin-btn ${btnClass}`}>
            {change > 0 ? `+${change}%` : `${change}%`}
          </span>
        </div>
      </div>
    </Link>
  </li>
);

const TokenPrice = ({ tokenIds }) => {
  const [tokens, setTokens] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(
        `https://api.coingecko.com/api/v3/simple/price?ids=${tokenIds.join(
          ","
        )}&vs_currencies=usd&include_24hr_change=true`
      );
      const data = await response.json();

      const tokenData = tokenIds.map((id) => ({
        href: "/home",
        imgSrc: `images/coin/${id}.jpg`, // Assuming you have images named after the token IDs
        title: id.toUpperCase(),
        secondaryText: "", // If you have additional data, you can update this field
        price: `$${data[id].usd}`,
        change: data[id].usd_24h_change.toFixed(2),
        btnClass: data[id].usd_24h_change >= 0 ? "increase" : "decrease",
      }));

      setTokens(tokenData);
    };

    fetchData();
  }, [tokenIds]);

  return (
    <div>
      <div className="d-flex justify-content-between">
        <span>Name</span>
        <div className="d-flex gap-8">
          <span>Last price</span>
          <span>Change</span>
        </div>
      </div>
      <ul className="mt-16">
        {tokens.map((token, index) => (
          <TokenItem key={index} {...token} />
        ))}
      </ul>
    </div>
  );
};

export default TokenPrice;
