import React, { useState, useEffect } from "react";
import "./NavbarOne.css";

const NavbarOne = () => {
  const [price, setPrice] = useState();
  const [gas, setGas] = useState();
  const [res, setRes] = useState(0);
  const [colour, setColour] = useState("red");

  const url =
    "https://api.coingecko.com/api/v3/coins/ethereum?localization=false&tickers=false&community_data=false&developer_data=false&sparkline=false";

  useEffect(() => {
    fetch(url)
      .then((response) => response.json())
      .then((data) => setPrice(data.market_data.current_price.gbp));

    try {
      fetch(url)
        .then((response) => response.json())
        .then((data) => setRes(data.market_data.price_change_percentage_24h));
      // price_change_24h_in_currency
      if (res > 0) {
        setColour("green");
      }
    } catch (error) {
      console.log(error);
    }
  }, [res]);

  console.log(res);
  return (
    <div className="navbar_main">
      <div className="nav_cont">
        <div className="eth_price">
          ETH Price: <span className="price">£{price}</span>
          <span className={colour}>
            (<span className="percentage">{res.toFixed(2)}</span>%)
          </span>
        </div>
      </div>
    </div>
  );
};

export default NavbarOne;
