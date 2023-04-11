import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Alchemy, Network } from "alchemy-sdk";
import "./Address.css";

function Address() {
  const location = useLocation();
  let address = location.state.address;

  const settings = {
    apiKey: process.env.REACT_APP_ALCHEMY_API_KEY,
    network: Network.ETH_MAINNET,
  };
  const alchemy = new Alchemy(settings);

  const [loading, setLoading] = useState(true);
  const [inData, setInData] = useState([]);
  const [outData, setOutData] = useState([]);

  useEffect(() => {
    async function getdata() {
      const outData = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        fromAddress: address,
        category: ["external", "internal", "erc20", "erc721", "erc1155"],
      });
      const inData = await alchemy.core.getAssetTransfers({
        fromBlock: "0x0",
        toAddress: address,
        category: ["external", "internal", "erc20", "erc721", "erc1155"],
      });
      setInData(inData);
      setOutData(outData);
      setLoading(false);
      console.log(outData, "in : ", inData);
    }
    getdata();
  }, []);

  if (loading) {
    return <h2 className="loading">Loading ... </h2>;
  }

  return (
    <div>
      <h1>Address Page</h1>
      <p>This is the About page.</p>
      <h1>{address}</h1>
      <div className="wrapper">
        <table>
          <thead>
            <tr>
              <th>Hash</th>
              <th>from</th>
              <th>Value</th>
              <th>Asset</th>
            </tr>
          </thead>

          {inData.transfers.slice(0, 10).map((r, i) => {
            return (
              <div key={i}>
                <tbody>
                <tr>
                  <td>{r?.hash.slice(0,8)}...</td>
                  <td>{r.from.slice(0,8)}...</td>
                  <td>{r.value}</td>
                  <td>{r.asset}</td>
                </tr>
                </tbody>

                {/* <div>{r.hash}</div>
            <div>{r.asset}</div>
            <div>{r.from}</div>
            <div>{r.value}</div> */}
              </div>
            );
          })}
        </table>
      </div>
    </div>
  );
}

export default Address;
