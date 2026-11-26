import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function CreateCampaign() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    goal: "",
    category: "Education",
    deadline: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("accessToken");

      const response = await fetch("http://localhost:5000/api/campaigns", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Campaign creation failed");
      }

      alert("Campaign submitted for admin approval!");

      setFormData({
        title: "",
        description: "",
        goal: "",
        category: "Education",
        deadline: ""
      });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <>
      <Navbar />

      <section className="auth-container">
        <div className="auth-card">
          <h2>Start a Campaign</h2>
          <p>Share your cause and make a difference.</p>

          <form onSubmit={handleSubmit}>
            <label>Campaign Title</label>
            <input
              type="text"
              name="title"
              placeholder="Enter campaign title"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <label>Description</label>
            <textarea
              name="description"
              placeholder="Describe your campaign"
              value={formData.description}
              onChange={handleChange}
              required
            />

            <label>Fundraising Goal (₹)</label>
            <input
              type="number"
              name="goal"
              placeholder="Enter target amount"
              min="1"
              value={formData.goal}
              onChange={handleChange}
              required
            />

            <label>Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option>Education</option>
              <option>Medical</option>
              <option>Environment</option>
              <option>Technology</option>
              <option>Community</option>
              <option>Other</option>
            </select>

            <label>Campaign Deadline</label>
            <input
              type="date"
              name="deadline"
              min={new Date().toISOString().split("T")[0]}
              value={formData.deadline}
              onChange={handleChange}
              required
            />

            <button type="submit">Submit Campaign</button>
          </form>
        </div>
      </section>

      <Footer />
    </>
  );
}

export default CreateCampaign;