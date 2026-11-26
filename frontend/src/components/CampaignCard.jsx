
import React from "react";
import { Link } from "react-router-dom";

function CampaignCard({ campaign }) {
  return (
    <div className="campaign-card">
      <div className="campaign-image">
        <span>{campaign.category}</span>
      </div>

      <div className="campaign-content">
        <h3>{campaign.title}</h3>

        <p>{campaign.description}</p>

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

        <div className="campaign-amount">
          <span>₹{campaign.raisedAmount} raised</span>
          <span>Goal: ₹{campaign.goal}</span>
        </div>

        <Link
          to={`/campaigns/${campaign._id}`}
          className="campaign-button"
        >
          View Campaign
        </Link>
      </div>
    </div>
  );
}

export default CampaignCard;
