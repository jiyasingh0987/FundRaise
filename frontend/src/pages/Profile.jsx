import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function Profile() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("accessToken");

        const response = await fetch(
          "https://fundraise-backend-6o4a.onrender.com/api/users/profile",
          {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || "Unable to load profile");
        }

        setUser(data.user || data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  return (
    <>
      <Navbar />

      <section className="profile-section">
        <div className="section-heading">
          <span>YOUR ACCOUNT</span>
          <h2>My Profile</h2>
        </div>

        <div className="profile-card">
          {loading ? (
            <p>Loading profile...</p>
          ) : error ? (
            <p>{error}</p>
          ) : (
            <>
              <h3>{user?.name}</h3>
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Role:</strong> {user?.role}</p>
            </>
          )}
        </div>
      </section>

      <Footer />
    </>
  );
}

export default Profile;