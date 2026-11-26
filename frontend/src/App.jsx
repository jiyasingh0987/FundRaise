
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Campaigns from "./pages/Campaigns";
import CampaignDetails from "./pages/CampaignDetails";
import CreateCampaign from "./pages/CreateCampaign";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import MyPledges from "./pages/MyPledges";
import AdminDashboard from "./pages/AdminDashboard";
import SupporterDashboard from "./pages/SupporterDashboard";

import ProtectedRoute from "./routes/ProtectedRoute";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/campaigns" element={<Campaigns />} />
        <Route path="/campaigns/:id" element={<CampaignDetails />} />

        {/* Logged-in Users */}
        <Route element={<ProtectedRoute />}>
          <Route path="/profile" element={<Profile />} />
        </Route>

        {/* Supporter Only */}
        <Route element={<ProtectedRoute allowedRoles={["supporter"]} />}>
          <Route path="/my-pledges" element={<MyPledges />} />
          <Route path="/supporter-dashboard" element={<SupporterDashboard />} />
        </Route>

        {/* Creator Only */}
        <Route element={<ProtectedRoute allowedRoles={["creator"]} />}>
          <Route path="/create-campaign" element={<CreateCampaign />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Admin Only */}
        <Route element={<ProtectedRoute allowedRoles={["admin"]} />}>
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
