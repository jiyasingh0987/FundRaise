
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AuthContext } from "../context/AuthContext";

function MyPledges() {
  const { accessToken } = useContext(AuthContext);

  const [pledges, setPledges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPledges = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/pledges/my-pledges",
          {
            headers: {
              Authorization: `Bearer ${accessToken}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Failed to load pledges");
        }

        setPledges(Array.isArray(data) ? data : data.pledges || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPledges();
  }, [accessToken]);

  return (
    <>
      <Navbar />

      <section className="campaign-section">
        <div className="section-heading">
          <span>YOUR CONTRIBUTIONS</span>
          <h2>My Pledges</h2>
          <p>Here are the campaigns you have supported.</p>
        </div>

        {loading && <p>Loading your pledges...</p>}

        {error && <p>{error}</p>}

        {!loading && !error && pledges.length === 0 && (
          <p>You haven't made any pledges yet.</p>
        )}

        <div className="campaign-grid">
          {pledges.map((pledge) => (
            <div className="campaign-card" key={pledge._id}>
              <div className="campaign-content">
                <h3>{pledge.campaign?.title || "Campaign"}</h3>
                <p>Amount: ₹{pledge.amount}</p>
                <p>Status: {pledge.status}</p>

                {pledge.campaign?._id && (
                  <Link
                    to={`/campaigns/${pledge.campaign._id}`}
                    className="campaign-button"
                  >
                    View Campaign
                  </Link>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default MyPledges;
