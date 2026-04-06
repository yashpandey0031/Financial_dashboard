import React from "react";
import { Plus } from "lucide-react";

const SpendingLimitCard = () => {
  const spendingLimits = [
    {
      category: "Shopping",
      spent: "$1,600.00 spent out of",
      limit: "$2,000.00",
      progress: "80%",
    },
    {
      category: "Groceries",
      spent: "$920.00 spent out of",
      limit: "$1,200.00",
      progress: "76%",
    },
    {
      category: "Transport",
      spent: "$510.00 spent out of",
      limit: "$800.00",
      progress: "64%",
    },
    {
      category: "Utilities",
      spent: "$430.00 spent out of",
      limit: "$700.00",
      progress: "61%",
    },
    {
      category: "Entertainment",
      spent: "$300.00 spent out of",
      limit: "$500.00",
      progress: "60%",
    },
  ];

  return (
    <div className="card">
      <h4 className="card-title">Monthly Spending Limit</h4>
      {spendingLimits.map((item) => (
        <div className="spending-item" key={item.category}>
          <div className="spending-info">
            <span>{item.category}</span>
            <span className="spending-amount">{item.spent}</span>
          </div>
          <div className="spending-bar">
            <div
              className="spending-progress"
              style={{ width: item.progress }}
            ></div>
          </div>
          <div className="spending-footer">
            <span>{item.limit}</span>
          </div>
        </div>
      ))}
      <button className="add-limit-btn">
        <Plus size={16} /> Add new
      </button>
    </div>
  );
};

export default SpendingLimitCard;
