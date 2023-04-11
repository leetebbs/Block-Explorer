import React from 'react'
import { Network, Alchemy } from "alchemy-sdk";
import { useState, useEffect } from "react";
import "./GetBlocks.css";
import { TiClipboard } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

const settings = {
  apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
};
const alchemy = new Alchemy(settings);


const LatestTransactions = () => {

  const navigate = useNavigate();
    const [blockNumber, setBlockNumber] = useState();
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState([]);
    const [txns, setTxns] = useState([])
    const txs = []
  
    useEffect(() => {
      async function getBlockNumber() {
        setBlockNumber(await alchemy.core.getBlockNumber());
        setData( await alchemy.core.getBlockWithTransactions(blockNumber));
      }
      getBlockNumber();
      setLoading(false);
      
    }, []);

   
      async function getData() {
            for(let i =0; i < 6; i++){
                let tx = data.transactions[i];
                txs.push(tx)
                console.log("🚀 ~ file: LatestTransactions.js:32 ~ getData ~ tx:", txs)  
            }
              }
    
      getData();

      const handleTransactionClick = (event) => {
        navigate("/transactions", {
          state: {
            block: event,
          },
        });
      };
      const handleAddressClick = (event) => {
        navigate("/address", {
          state: {
            address: event,
          },
        });
      };
  

if (loading) {
    return <h2>Loading ... </h2>;
  }
// console.log(txns)
  return (
    <div className='getBlocksContainer'>
{/* {mapping} */}
<div className="latestBlocks">Latest Transactions</div>
{txs.map((item, i) => {
    return (
        <div className="row-container" key={i}>
          <div className="blockchain">
            <TiClipboard size={28}/>
          </div>
          <div className="blockNumbertx">
            <button className="block-btn" onClick={() => handleTransactionClick(item.hash)}>{item.hash.slice(0,14)}...</button>
            <div className="toFrom">
            <div className="miner">
             From: <button className="miner_address block-btn" onClick={() => handleAddressClick(item.from)}> {item.from.slice(0,14)}</button>
            </div>
            <div className="miner">To: <span className="miner_address"> {item.to.slice(0,14)}</span></div>
            </div>
            <div className="txns">{parseInt(item.value / 10 ** 18)} ETH</div>
          </div>
        </div>
      )
})}
<div className="latestBlocksBottom"></div>
    </div>
  )
}

export default LatestTransactions