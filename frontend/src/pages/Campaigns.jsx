import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import CampaignCard from "../components/CampaignCard";

function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/campaigns");

        if (!response.ok) {
          throw new Error("Unable to load campaigns");
        }

        const data = await response.json();
        setCampaigns(Array.isArray(data) ? data : data.campaigns || []);
      } catch (err) {
        setError("Could not connect to the server. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <>
      <Navbar />

      <section className="campaign-section">
        <div className="section-heading">
          <span>EXPLORE AND SUPPORT</span>
          <h2>All Campaigns</h2>
          <p>Discover causes and help make a difference.</p>
        </div>

        {loading && <p>Loading campaigns...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && campaigns.length === 0 && (
          <p>No approved campaigns available yet.</p>
        )}

        {!loading && !error && campaigns.length > 0 && (
          <div className="campaign-grid">
            {campaigns.map((campaign) => (
              <CampaignCard
                key={campaign._id}
                campaign={campaign}
              />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default Campaigns;