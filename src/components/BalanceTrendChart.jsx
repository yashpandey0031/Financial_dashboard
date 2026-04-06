import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BalanceTrendChart = ({ balanceTrendData }) => {
  return (
    <div className="card chart-card">
      <div className="card-header">
        <span>Balance Trend</span>
        <div className="chart-legend">
          <span className="legend-item">
            <span
              className="legend-dot"
              style={{ backgroundColor: "#ff9500" }}
            ></span>
            Monthly Balance
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <LineChart
          data={balanceTrendData}
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
        >
          <defs>
            <linearGradient id="balanceOrange" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ff9500" stopOpacity={0.35} />
              <stop offset="95%" stopColor="#ff9500" stopOpacity={0.03} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} width={30} />
          <Tooltip
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
            }}
          />
          <Line
            type="monotone"
            dataKey="balance"
            stroke="#ff9500"
            strokeWidth={4}
            strokeLinecap="round"
            strokeLinejoin="round"
            dot={{ fill: "#ff9500", r: 5 }}
            activeDot={{ r: 7 }}
            fill="url(#balanceOrange)"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
