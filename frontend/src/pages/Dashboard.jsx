
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Dashboard() {
  const { accessToken } = useContext(AuthContext);

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMyCampaigns = async () => {
      try {
        const response = await fetch(
          "https://fundraise-backend-6o4a.onrender.com/api/campaigns/my-campaigns",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load campaigns");
        }

        setCampaigns(data.campaigns || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMyCampaigns();
  }, [accessToken]);

  const totalRaised = campaigns.reduce(
    (total, campaign) => total + campaign.raisedAmount,
    0
  );

  return (
    <>
      <Navbar />

      <section className="dashboard-section">
        <div className="section-heading">
          <span>CREATOR PANEL</span>
          <h2>My Dashboard</h2>
          <p>Track your campaigns and fundraising progress.</p>
        </div>

        <div className="dashboard-grid">
          <div className="dashboard-card">
            <h3>{campaigns.length}</h3>
            <p>Total Campaigns</p>
          </div>

          <div className="dashboard-card">
            <h3>₹{totalRaised}</h3>
            <p>Total Amount Raised</p>
          </div>

          <div className="dashboard-card">
            <h3>
              {campaigns.filter((c) => c.status === "approved").length}
            </h3>
            <p>Approved Campaigns</p>
          </div>

          <div className="dashboard-card">
            <h3>
              {campaigns.filter((c) => c.status === "pending").length}
            </h3>
            <p>Pending Campaigns</p>
          </div>
        </div>

        <div className="section-heading">
          <h2>My Campaigns</h2>
        </div>

        {loading && <p>Loading campaigns...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && campaigns.length === 0 && (
          <p>You haven't created any campaigns yet.</p>
        )}

        <div className="campaign-grid">
          {campaigns.map((campaign) => (
            <div className="campaign-card" key={campaign._id}>
              <div className="campaign-content">
                <span>{campaign.category}</span>

                <h3>{campaign.title}</h3>

                <p>{campaign.description}</p>

                <p>Goal: ₹{campaign.goal}</p>
                <p>Raised: ₹{campaign.raisedAmount}</p>

                <p>
                  Status: <strong>{campaign.status.toUpperCase()}</strong>
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Dashboard;
