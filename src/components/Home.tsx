import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";
import "../css/Home.css";
import { NavBar } from "./index";
const icon = require("../assets/copy.png");
const video = require("../assets/homepagevid.mp4");

export default function Home({ userId }: any) {
  return (
    <div className="home-page">
      <section id="welcome-section">
        <NavBar />
        <video
          className="homepage-video"
          title="Video of girl using phone and laughing with friends"
          muted
          loop
          autoPlay
        >
          <source src={video} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <h1>Welcome to Cointrip!</h1>
        <h2>Fast way to transfer money</h2>
      </section>
      <section id="money-section" aria-label="two girls using ipads">
        <h1>&nbsp; Send money to friends</h1>
      </section>
      <section
        id="dwolla-section"
        aria-label="image of payment system Dwolla.js"
      >
        <h1>Payment system powered by Dwolla.js</h1>
      </section>
      <section id="signup-section">
        <Link to="/register">
          <Button variant="outlined" color="primary" className="signup-btn">
            Sign Up!
          </Button>
        </Link>
        <div className="footer">
          <img className="copyright-img" src={icon} alt="copyright logo" />
          <h2>Cointrip 2022</h2>
        </div>
      </section>
    </div>
  );
}
