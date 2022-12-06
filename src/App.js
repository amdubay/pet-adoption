import "./App.css";
// importing components from react-router-dom package
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import React, { useState, useRef, useEffect } from "react";

import Search from "./Search";
import Home from "./Home";
import Header from "./Header";
import About from "./About";
import Footer from "./Footer";
// import ContactUs component
//import ContactUs from "./components/ContactUs";

function App() {
  return (
    <>
      <Header />
      {/* This is the alias of BrowserRouter i.e. Router */}
      <Router>
        <Routes>
          {/* This route is for home component
		with exact path "/", in component props
		we passes the imported component*/}
          <Route exact path="/" element={<Home />} />
          <Route exact path="/home" element={<Home />} />

          {/* This route is for search component
		with exact path "/search", in component
		props we passes the imported component*/}
          <Route exact path="/search" element={<Search />} />

          {/* This route is for about component
		with exact path "/about", in component
		props we passes the imported component*/}
          <Route exact path="/about" element={<About />} />
        </Routes>
      </Router>
      <Footer />
    </>
  );
}

export default App;
