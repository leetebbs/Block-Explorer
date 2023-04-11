import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Network, Alchemy } from "alchemy-sdk";
import './Transactions.css'
import success from '../Assets/success.JPG'
import moment from "moment";
// let response = await alchemy.core.getTransactionReceipt(tx)
moment().format();


const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

function Transactions() {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  let block = location.state.block;

  useEffect(() => {
    async function getData() {
      let result = await alchemy.core.getTransactionReceipt(block);
      setData(result);
      setLoading(false);
    }
    getData();
  }, [block]);

  // let lasttime = moment(data.timestamp, "X").fromNow();
  console.log("TX receipt ", data)


  if (loading) {
    return <h2 className="loading">Loading ... </h2>;
  }

  return (
    <div className="container_trans">
      <div className="wrapper">
      <p>Transaction Details</p>
      <div className="trans-container">
        <div className="trans-content">
        <p>Transaction Hash:<span>{block}</span></p>
      <p className="status">Status: <span>{data.confirmations > 3 ? <p className="status"><img src={success} alt=""/> {data.confirmations} confirmations</p> : <p>waiting</p>}</span></p>
      <p>Block: <span>{data.blockNumber}</span></p>
      <p>Timestamp</p>
      <p>From: <span>{data.from}</span></p>
      <p>To:<span>{data.to}</span></p>
      <p>Value</p>
      <p>Transaction Fee: <span>{parseInt(data.gasUsed._hex)}</span></p>
      <p>Gas Price: <span>{parseInt(data.effectiveGasPrice)}</span></p>
        </div>
      </div>
      </div>
    </div>
  );
}

export default Transactions;
