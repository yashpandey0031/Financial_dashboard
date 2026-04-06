import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const BalanceTrendChart = ({ balanceTrendData }) => {
  const formatAxisValue = (value) => `${Math.round(value / 1000)}k`;
  const formatTooltipValue = (value) =>
    `$${new Intl.NumberFormat("en-US").format(value)}`;

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
      <ResponsiveContainer width="100%" height={330}>
        <BarChart
          data={balanceTrendData}
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
            width={54}
            tickFormatter={formatAxisValue}
          />
          <Tooltip
            formatter={formatTooltipValue}
            cursor={false}
            contentStyle={{
              backgroundColor: "#fff",
              border: "1px solid #e0e0e0",
              borderRadius: "8px",
            }}
          />
          <Bar
            dataKey="balance"
            fill="#ff9500"
            radius={[6, 6, 0, 0]}
            maxBarSize={36}
          />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
