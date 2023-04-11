import React from "react";
import "../App.css";
import GetBlocks from "./GetBlocks";
import LatestTransactions from "./LatestTransactions";
// import { FaSearch } from 'react-icons/fa'

function HomePage() {
  return (
    <>
      <div>
        <div className="bkg_img"></div>
        <div className="title">
          <h3>The Ethereum Blockchain Explorer</h3>
          <div className="input_container">
            All Filters
            <input className="input"></input>
            <button className='search-btn'></button>
          </div>
        </div>
      </div>
      <div className="blocks">
        <GetBlocks />
        <LatestTransactions />
      </div>
    </>
  );
}

export default HomePage;
