import React from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/Homepage";
import AboutPage from "./components/Aboutpage";
import BlocksPage from "./components/Blockspage";
import NavbarOne from "./components/Navbar/NavbarOne";
import NavbarTwo from "./components/Navbar/NavbarTwo";
import Transactions from "./components/Transactions";
import Address from "./components/Address"
import Footer from "./Assets/footer.JPG";

function App() {

  return (
    <>
      <div className="container">
        <div className="navone">
          <NavbarOne />
        </div>
        <div className="navtwo">
          {" "}
          <NavbarTwo />
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/blocks" element={<BlocksPage />} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/address" element={<Address />} />
          </Routes>
        </Router>
        <img claaName="footer" src={Footer} alt="" />
      </div>
    </>
  );
}

export default App;
