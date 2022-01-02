import { Button } from '@material-ui/core';
import React from 'react';
import { Link } from 'react-router-dom';
import "../css/Home.css";
import { NavBar } from "./index";
const icon = require("../assets/copy.png");
const video = require("../assets/homepagevid.mp4")

export default function Home({userId}: any) {
  return (
    <div className="home-page">
      <section id="welcome-section">
        <NavBar userId={userId} />
        <video className="homepage-video" muted loop autoPlay>
          <source src={video} type="video/mp4"/>
          Your browser does not support the video tag.
        </video>
        <h1>Welcome to Coin trip</h1>
        <h2>Fast way to transfer money</h2>
      </section>
      <section id="money-section">
        <h1>&nbsp; Send money to friends</h1>
      </section>
      <section id="stripe-section">
          <h1>Payments powered by Stripe</h1>
          <p>*No credit card information stored on Cointrip*</p>
      </section>
      <section id="signup-section">
        <Link to="/register">
          <Button variant="outlined" color="primary" className="signup-btn">
            Sign Up!
          </Button>
        </Link>
        <div className="footer">
          <img className="copyright-img" src={icon} />
          <h2>Cointrip 2022</h2>
        </div>
      </section>
    </div>
  );
}