import React from "react";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Network, Alchemy } from "alchemy-sdk";
import "./Blockspage.css";
import { useState } from "react";
import moment from "moment";
import { FaRegClock } from "react-icons/fa";

moment().format();

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function BlocksPage() {
  const location = useLocation();
  let block = location.state.block;

  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getData() {
      let result = await alchemy.core.getBlockWithTransactions(block);
      setData(result);
      setLoading(false);
    }
    getData();
  }, [block]);
  console.log("blocksPage data", data);

  //   const percentDifference =  parseInt(data.gasUsed._hex) / parseInt(data.gasLimit._hex) * 100;

  let lasttime = moment(data.timestamp, "X").fromNow();

  if (loading) {
    return <h2 className="loading">Loading ... </h2>;
  }

  return (
    <div className="container">
      <div className="wrapper">
        <p className="block">Block #{block}</p>
        <div className="block-container">
          <div className="block-contents">
            <p>
              Block Height:<span>{block}</span>
            </p>
            <p>
              Timestamp:{" "}
              <span>
                <FaRegClock size={13} />
                {data.timestamp} {lasttime}
              </span>
            </p>
            <p>
              Transactions:{" "}
              <span>
                {data.transactions.length} transactions in this block.
              </span>
            </p>
            <p>
              Fee Recipient:
              <span>
                {data.miner.slice(0, 8)}...{data.miner.slice(34)}
              </span>
            </p>
            <p>
              Gas Used: <span>{parseInt(data.gasUsed._hex)} </span>
            </p>
            <p>
              Gas Limit: <span>{parseInt(data.gasLimit._hex)}</span>
            </p>
            <p>
              Base Fee For Gas:{" "}
              <span>{parseInt(data.baseFeePerGas._hex) / 10 ** 16}ETH</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlocksPage;
