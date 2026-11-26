
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import CampaignCard from "../components/CampaignCard";
import Footer from "../components/Footer";

function Home() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(
          "https://fundraise-backend-6o4a.onrender.com/api/campaigns"
        );

        if (!response.ok) {
          throw new Error("Failed to load campaigns");
        }

        const data = await response.json();

        setCampaigns(
          Array.isArray(data) ? data : data.campaigns || []
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <>
      <Navbar />
      <Hero />

      <section className="campaign-section">
        <div className="section-heading">
          <span>MAKE AN IMPACT</span>
          <h2>Featured Campaigns</h2>
          <p>Discover causes that need your support.</p>
        </div>

        {loading && <p>Loading campaigns...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && campaigns.length === 0 && (
          <p>No campaigns available yet.</p>
        )}

        <div className="campaign-grid">
          {campaigns.map((campaign) => (
            <CampaignCard
              key={campaign._id}
              campaign={campaign}
            />
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Home;
