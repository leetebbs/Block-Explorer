import React from "react";
// import ReactModal from "react-modal";
import { Network, Alchemy } from "alchemy-sdk";
import { useState, useEffect } from "react";
import "./GetBlocks.css";
import { RxCube } from "react-icons/rx";
import { useNavigate } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);

const GetBlocks = () => {
  const [blockNumber, setBlockNumber] = useState();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    async function getBlockNumber() {
      setBlockNumber(await alchemy.core.getBlockNumber());
    }
    getBlockNumber();
  }, []);

  useEffect(() => {
    async function getData() {
      for (let i = 0; i < 6; i++) {
        let number = blockNumber - i;
        let result = await alchemy.core.getBlockWithTransactions(number);
        if (result.number !== 0) {
          setData((data) => [...data, result]);
        }

        // console.log(result);
      }
      setLoading(false);
    }
    getData();
  }, [blockNumber]);

  const handleBlockClick = (event) => {
    navigate("/blocks", {
      state: {
        block: event,
      },
    });
  };

  if (loading) {
    return <h2 className="loading">Loading ... </h2>;
  }

  return (
    <div className="getBlocksContainer">
      <div className="latestBlocks">Latest Blocks</div>
      {data.map((item, i) => {
        return (
          <div className="row-container" key={i}>
            <div className="blockchain">
              <RxCube size={28} />
            </div>
            <div className="blockNumber">
              <button
                className="block-btn"
                onClick={() => handleBlockClick(item.number)}
              >
                {item.number}
              </button>
              <div className="miner">
                Miner: <span className="miner_address">{item.miner}</span>
              </div>
              <div className="txns">{item.transactions.length} Txns</div>
            </div>
          </div>
        );
      })}
      <div className="latestBlocksBottom"></div>
    </div>
  );
};

export default GetBlocks;
