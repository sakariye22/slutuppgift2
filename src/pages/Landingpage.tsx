import React from 'react';
import { Link } from 'react-router-dom';
import Footer from './Footer';
import Footer2 from './Footer.js';
import Header from './Header';
import './Landing.css';

function LandingPage() {
  return (
    <><div className="LandingPage">
      <Header />
     
      <h1>Welcome to CleanBooking!</h1>
      <p>Book your cleaning appointment today!</p>
    </div><Footer /> <Footer2></Footer2></>
  );
}

export default LandingPage;
