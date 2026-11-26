import React from "react";

function Hero() {
  return (
    <section className="hero">
      <div className="hero-content">
        <span className="hero-tag">MAKE A DIFFERENCE TODAY</span>

        <h1>
          Small Help.
          <br />
          <span>Big Changes.</span>
        </h1>

        <p>
          Support meaningful causes, help people in need, and turn
          dreams into reality with FundRaise.
        </p>

        <div className="hero-buttons">
          <a href="/campaigns" className="primary-btn">
            Explore Campaigns
          </a>

          <a href="/register" className="secondary-btn">
            Start a Campaign
          </a>
        </div>
      </div>
    </section>
  );
}

export default Hero;