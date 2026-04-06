import React from "react";
import { MoreVertical, TrendingUp } from "lucide-react";

const MetricsCard = () => {
  return (
    <div className="card metrics-card">
      <div className="card-header">
        <span>Stats</span>
      </div>
      <div className="metrics-grid">
        <div className="metric-item">
          <div className="metric-header">
            <span>Total Earnings</span>
            <button className="metric-menu">
              <MoreVertical size={16} />
            </button>
          </div>
          <h3 className="metric-value earning">$950</h3>
          <p className="metric-change">
            <TrendingUp size={14} /> 7% this month
          </p>
        </div>

        <div className="metric-item">
          <div className="metric-header">
            <span>Total Spending</span>
            <button className="info-btn">
              <span>ⓘ</span>
            </button>
          </div>
          <h3 className="metric-value spending">$700</h3>
          <p className="metric-change">1.5% this month</p>
        </div>

        <div className="metric-item">
          <div className="metric-header">
            <span>Total Income</span>
            <button className="metric-menu">
              <MoreVertical size={16} />
            </button>
          </div>
          <h3 className="metric-value income">$1,050</h3>
          <p className="metric-change">
            <TrendingUp size={14} /> 7.6% this month
          </p>
        </div>

        <div className="metric-item">
          <div className="metric-header">
            <span>Total Revenue</span>
            <button className="info-btn">
              <span>ⓘ</span>
            </button>
          </div>
          <h3 className="metric-value revenue">$850</h3>
          <p className="metric-change">
            <TrendingUp size={14} /> 3.4% this month
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
