import React from "react";
import { Send, Download, ChevronDown } from "lucide-react";

const BalanceCard = ({ showBalance, setShowBalance, wallets }) => {
  return (
    <div className="card balance-card">
      <div className="card-header">
        <span className="card-label">Total Balance</span>
        <button className="currency-btn">
          USD <ChevronDown size={14} />
        </button>
      </div>
      <h3 className="balance-amount">
        {showBalance ? "$689,372.00" : "••••••••"}
      </h3>
      <p className="balance-subtitle">You are at the top 30%</p>
      <div className="card-actions">
        <button className="btn btn-primary">
          <Send size={16} /> Transfer
        </button>
        <button className="btn btn-secondary">
          <Download size={16} /> Request
        </button>
      </div>

      <div className="wallets-section">
        <h4 className="card-title">Wallets | Total 6 wallets</h4>
        <div className="wallets-grid">
          {wallets.map((wallet, idx) => (
            <div
              key={idx}
              className={`wallet-item ${wallet.active ? "active" : ""}`}
            >
              <span className="wallet-flag">{wallet.flag}</span>
              <span className="wallet-name">{wallet.name}</span>
              <span className="wallet-amount">{wallet.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BalanceCard;
