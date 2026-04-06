import React from "react";
import {
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const IncomeChart = ({ profitLossData }) => {
  return (
    <div className="card profit-card">
      <div className="card-header">
        <span>Total Income</span>
        <div className="chart-legend">
          <span className="legend-item">
            <span
              className="legend-dot"
              style={{ backgroundColor: "#FF6B6B" }}
            ></span>
            Profit and Loss
          </span>
        </div>
      </div>
      <ResponsiveContainer width="100%" height={240}>
        <ComposedChart
          data={profitLossData}
          margin={{ top: 5, right: 10, left: 10, bottom: 5 }}
        >
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
          <Bar
            dataKey="profit"
            stackId="a"
            fill="#FF6B6B"
            radius={[12, 12, 0, 0]}
          />
          <Bar
            dataKey="loss"
            stackId="a"
            fill="#1a1a1a"
            radius={[12, 12, 0, 0]}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeChart;
