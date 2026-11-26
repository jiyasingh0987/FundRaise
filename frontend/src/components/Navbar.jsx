
import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const { notification, setNotification } = useContext(SocketContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="logo">FundRaise</Link>

        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/campaigns">Campaigns</Link>

          {user ? (
            <>
              {user.role === "creator" && (
                <>
                  <Link to="/create-campaign">Create Campaign</Link>
                  <Link to="/dashboard">Dashboard</Link>
                </>
              )}

              {user.role === "supporter" && (
                <>
                  <Link to="/supporter-dashboard">Dashboard</Link>
                  <Link to="/my-pledges">My Pledges</Link>
                </>
              )}

              {user.role === "admin" && (
                <Link to="/admin-dashboard">Admin Dashboard</Link>
              )}

              <Link to="/profile">Profile</Link>
              <span>Hi, {user.name}</span>
              <button onClick={handleLogout} className="nav-button">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register" className="nav-button">Get Started</Link>
            </>
          )}
        </div>
      </nav>

      {notification && (
        <div className="notification">
          <p>{notification}</p>
          <button onClick={() => setNotification("")}>✕</button>
        </div>
      )}
    </>
  );
}

export default Navbar;
