import React, { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CampaignDetails() {
  const { id } = useParams();
  const { user, accessToken } = useContext(AuthContext);

  const [campaign, setCampaign] = useState(null);
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const fetchCampaign = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/campaigns");
        const data = await response.json();

        if (!response.ok) {
          throw new Error("Unable to load campaign");
        }

        const campaigns = Array.isArray(data)
          ? data
          : data.campaigns || [];

        const selectedCampaign = campaigns.find(
          (item) => item._id === id
        );

        setCampaign(selectedCampaign || null);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [id]);

  const handlePledge = async (e) => {
    e.preventDefault();
    setMessage("");

    try {
      const response = await fetch(
        `http://localhost:5000/api/pledges/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${accessToken}`
          },
          body: JSON.stringify({ amount: Number(amount) })
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Pledge failed");
      }

      setCampaign((previous) => ({
        ...previous,
        raisedAmount: previous.raisedAmount + Number(amount)
      }));

      setAmount("");
      setMessage("Pledge successful! Thank you for your support.");
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <section className="campaign-section">
        {loading ? (
          <p>Loading campaign...</p>
        ) : !campaign ? (
          <p>{message || "Campaign not found."}</p>
        ) : (
          <div className="auth-card" style={{ maxWidth: "700px", margin: "auto" }}>
            <span className="hero-tag">{campaign.category}</span>

            <h2 style={{ margin: "15px 0" }}>{campaign.title}</h2>

            <p>{campaign.description}</p>

            <h3 style={{ marginTop: "25px" }}>
              ₹{campaign.raisedAmount} raised of ₹{campaign.goal}
            </h3>

            <div className="campaign-progress">
              <div
                className="progress-fill"
                style={{
                  width: `${Math.min(
                    (campaign.raisedAmount / campaign.goal) * 100,
                    100
                  )}%`
                }}
              ></div>
            </div>

            <p>
              Deadline: {new Date(campaign.deadline).toLocaleDateString()}
            </p>

            {user?.role === "supporter" && (
              <form onSubmit={handlePledge} style={{ marginTop: "25px" }}>
                <label>Enter Pledge Amount (₹)</label>

                <input
                  type="number"
                  min="1"
                  max={campaign.goal - campaign.raisedAmount}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  required
                />

                <button type="submit">Support Campaign</button>
              </form>
            )}

            {!user && (
              <p style={{ marginTop: "20px" }}>
                <Link to="/login">Login</Link> to support this campaign.
              </p>
            )}

            {message && (
              <p style={{ marginTop: "15px" }}>{message}</p>
            )}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
}

export default CampaignDetails;