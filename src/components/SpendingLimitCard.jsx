import React from "react";
import { Plus } from "lucide-react";

const SpendingLimitCard = () => {
  return (
    <div className="card">
      <h4 className="card-title">Monthly Spending Limit</h4>
      <div className="spending-item">
        <div className="spending-info">
          <span>Shopping</span>
          <span className="spending-amount">$1,600.00 spent out of</span>
        </div>
        <div className="spending-bar">
          <div className="spending-progress" style={{ width: "80%" }}></div>
        </div>
        <div className="spending-footer">
          <span>$2,000.00</span>
        </div>
      </div>
      <button className="add-limit-btn">
        <Plus size={16} /> Add new
      </button>
    </div>
  );
};

export default SpendingLimitCard;
