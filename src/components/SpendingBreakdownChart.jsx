import React from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

const SpendingBreakdownChart = ({ spendingBreakdownData }) => {
  const COLORS = ["#ff6b6b", "#ff9500", "#00c851", "#4a90e2", "#9013fe"];

  return (
    <div className="card chart-card spending-breakdown-card">
      <div className="card-header">
        <span>Spending Breakdown</span>
      </div>
      <div className="chart-container-narrow">
        <ResponsiveContainer width="100%" height={280}>
          <PieChart>
            <Pie
              data={spendingBreakdownData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) =>
                `${name} ${(percent * 100).toFixed(0)}%`
              }
              outerRadius={70}
              fill="#8884d8"
              dataKey="value"
            >
              {spendingBreakdownData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#fff",
                border: "1px solid #e0e0e0",
                borderRadius: "8px",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SpendingBreakdownChart;
