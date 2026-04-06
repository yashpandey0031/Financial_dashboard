import React from "react";
import {
  MoreVertical,
  TrendingUp,
  TrendingDown,
  Sparkles,
  Bell,
} from "lucide-react";

const MetricsCard = () => {
  return (
    <div className="card metrics-card">
      <div className="card-header">
        <span>Stats</span>
        <div className="metrics-fun-actions">
          <button className="metrics-fun-btn" title="Highlights">
            <Sparkles size={18} />
          </button>
          <button className="metrics-fun-btn" title="Alerts">
            <Bell size={18} />
          </button>
        </div>
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

        <div className="stats-indicators">
          <div className="trend-indicator up" title="Growth trend">
            <TrendingUp size={25} />
            <span>+8.2%</span>
          </div>
          <div className="trend-indicator down" title="Drop trend">
            <TrendingDown size={25} />
            <span>-2.4%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;
