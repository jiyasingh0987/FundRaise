
import React, { useEffect, useState, useContext } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

function AdminDashboard() {
  const { accessToken } = useContext(AuthContext);

  const [campaigns, setCampaigns] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchPendingCampaigns = async () => {
    try {
      const response = await fetch(
        "http://localhost:5000/api/campaigns/pending",
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

  useEffect(() => {
    fetchPendingCampaigns();
  }, [accessToken]);

  const updateStatus = async (id, status) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/campaigns/${id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ status })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Unable to update campaign");
      }

      setCampaigns((previous) =>
        previous.filter((campaign) => campaign._id !== id)
      );
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <>
      <Navbar />

      <section className="campaign-section">
        <div className="section-heading">
          <span>ADMIN PANEL</span>
          <h2>Manage Campaigns</h2>
          <p>Review and manage campaign requests.</p>
        </div>

        {loading && <p>Loading pending campaigns...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && campaigns.length === 0 && (
          <p>No pending campaigns available.</p>
        )}

        <div className="campaign-grid">
          {campaigns.map((campaign) => (
            <div className="campaign-card" key={campaign._id}>
              <div className="campaign-content">
                <span>{campaign.category}</span>

                <h3>{campaign.title}</h3>

                <p>{campaign.description}</p>

                <p>Goal: ₹{campaign.goal}</p>

                <p>
                  Creator: {campaign.creator?.name || "Unknown"}
                </p>

                <p>
                  Deadline:{" "}
                  {new Date(campaign.deadline).toLocaleDateString()}
                </p>

                <div className="hero-buttons">
                  <button
                    className="primary-btn"
                    onClick={() =>
                      updateStatus(campaign._id, "approved")
                    }
                  >
                    Approve
                  </button>

                  <button
                    className="secondary-btn"
                    onClick={() =>
                      updateStatus(campaign._id, "rejected")
                    }
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default AdminDashboard;
