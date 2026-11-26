
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function SupporterDashboard() {
  const { accessToken } = useContext(AuthContext);

  const [dashboard, setDashboard] = useState({
    totalPledges: 0,
    totalContributed: 0,
    totalCampaignsSupported: 0
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        const response = await fetch(
          "https://fundraise-backend-6o4a.onrender.com/api/dashboard/supporter",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load dashboard");
        }

        setDashboard(data.dashboard);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [accessToken]);

  return (
    <>
      <Navbar />

      <section className="dashboard-section">
        <div className="section-heading">
          <span>SUPPORTER PANEL</span>
          <h2>My Dashboard</h2>
          <p>See the difference your contributions are making.</p>
        </div>

        {loading && <p>Loading dashboard...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && (
          <div className="dashboard-grid">
            <div className="dashboard-card">
              <h3>{dashboard.totalPledges}</h3>
              <p>Total Pledges</p>
            </div>

            <div className="dashboard-card">
              <h3>₹{dashboard.totalContributed}</h3>
              <p>Total Contributed</p>
            </div>

            <div className="dashboard-card">
              <h3>{dashboard.totalCampaignsSupported}</h3>
              <p>Campaigns Supported</p>
            </div>
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default SupporterDashboard;
