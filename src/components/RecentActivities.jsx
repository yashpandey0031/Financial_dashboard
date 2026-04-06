import React, { useEffect, useRef, useState, useContext } from "react";
import {
  Filter,
  ChevronDown,
  Trash2,
  Plus,
  CarFront,
  Plane,
  ShoppingCart,
  Wallet,
  ReceiptText,
  CirclePlus,
} from "lucide-react";
import { AppContext } from "../context/AppContext";

const RecentActivities = () => {
  const {
    activities,
    filters,
    setFilters,
    userRole,
    addTransaction,
    deleteTransaction,
    getStatusColor,
    getStatusIcon,
  } = useContext(AppContext);

  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const filterContainerRef = useRef(null);
  const [newTransaction, setNewTransaction] = useState({
    activity: "",
    amount: "",
    category: "Other",
    type: "expense",
    date: new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    }),
  });

  const categories = [...new Set(activities.map((a) => a.category))];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        filterContainerRef.current &&
        !filterContainerRef.current.contains(event.target)
      ) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const renderActivityIcon = (activity) => {
    const iconProps = { size: 16, strokeWidth: 2.2 };

    switch (activity.category) {
      case "Transport":
        return <CarFront {...iconProps} />;
      case "Travel":
        return <Plane {...iconProps} />;
      case "Food":
        return <ShoppingCart {...iconProps} />;
      case "Salary":
        return <Wallet {...iconProps} />;
      case "Subscriptions":
        return <ReceiptText {...iconProps} />;
      default:
        return <CirclePlus {...iconProps} />;
    }
  };

  const handleAddTransaction = () => {
    if (!newTransaction.activity || !newTransaction.amount) return;

    const transaction = {
      id: `INV-${String(activities.length + 1).padStart(6, "0")}`,
      activity: newTransaction.activity,
      amount: parseFloat(newTransaction.amount),
      price: `$${parseFloat(newTransaction.amount).toFixed(2)}`,
      category: newTransaction.category,
      type: newTransaction.type,
      date: newTransaction.date,
      status: "Completed",
      icon: "circle-plus",
    };

    addTransaction(transaction);
    setNewTransaction({
      activity: "",
      amount: "",
      category: "Other",
      type: "expense",
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    });
    setShowAddModal(false);
  };

  return (
    <div className="card activities-card">
      <div className="card-header">
        <div className="activities-header-top">
          <span>Recent Transactions</span>
          {userRole === "admin" && (
            <button
              className="add-transaction-btn"
              onClick={() => setShowAddModal(true)}
            >
              <Plus size={14} />
              Add Transaction
            </button>
          )}
        </div>
        <div className="activities-controls">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search activity, category, or ID"
              className="search-input"
              value={filters.searchQuery}
              onChange={(e) =>
                setFilters({ ...filters, searchQuery: e.target.value })
              }
            />
          </div>
          <div className="filter-container" ref={filterContainerRef}>
            <button
              className="filter-btn"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Filter size={14} />
              <span>Filter</span>
              <ChevronDown size={16} />
            </button>
            {showFilterMenu && (
              <div className="filter-menu">
                <div className="filter-section">
                  <span className="filter-label">TYPE</span>
                  <div className="filter-options">
                    {["All", "Income", "Expense"].map((type) => (
                      <button
                        key={type}
                        className={`filter-option ${
                          filters.type === type ? "active" : ""
                        }`}
                        onClick={() => setFilters({ ...filters, type })}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="filter-section">
                  <span className="filter-label">SORT BY</span>
                  <div className="filter-options">
                    {["Date", "Amount", "Activity Name"].map((sortBy) => (
                      <button
                        key={sortBy}
                        className={`filter-option ${
                          filters.sortBy === sortBy ? "active" : ""
                        }`}
                        onClick={() => setFilters({ ...filters, sortBy })}
                      >
                        {sortBy}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="activities-table">
        <div className="table-header">
          <div className="table-cell">Date</div>
          <div className="table-cell">Activity</div>
          <div className="table-cell">Category</div>
          <div className="table-cell">Amount</div>
          <div className="table-cell">Type</div>
          <div className="table-cell">Status</div>
          {userRole === "admin" && <div className="table-cell">Actions</div>}
        </div>
        {activities.map((activity) => (
          <div className="table-row" key={activity.id}>
            <div className="table-cell">{activity.date}</div>
            <div className="table-cell">
              <span
                className="activity-icon activity-icon-svg"
                style={{ color: getStatusColor(activity.status) }}
              >
                {renderActivityIcon(activity)}
              </span>
              {activity.activity}
            </div>
            <div className="table-cell">
              <span className="category-badge">{activity.category}</span>
            </div>
            <div className="table-cell">{activity.price}</div>
            <div
              className="table-cell"
              style={{
                color: activity.type === "income" ? "#00c851" : "#ff6b6b",
              }}
            >
              {activity.type === "income" ? "+ Income" : "- Expense"}
            </div>
            <div className="table-cell">
              <span
                className="status-badge"
                style={{
                  color: getStatusColor(activity.status),
                  background: `${getStatusColor(activity.status)}20`,
                }}
              >
                {getStatusIcon(activity.status)} {activity.status}
              </span>
            </div>
            {userRole === "admin" && (
              <div className="table-cell">
                <button
                  className="delete-btn"
                  onClick={() => deleteTransaction(activity.id)}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      {showAddModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3 className="modal-title">Add New Transaction</h3>
            <div className="modal-body">
              <div className="form-group">
                <label>Activity</label>
                <input
                  type="text"
                  value={newTransaction.activity}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      activity: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Amount</label>
                <input
                  type="number"
                  value={newTransaction.amount}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      amount: e.target.value,
                    })
                  }
                />
              </div>
              <div className="form-group">
                <label>Category</label>
                <select
                  value={newTransaction.category}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      category: e.target.value,
                    })
                  }
                >
                  {categories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                  <option value="Other">Other</option>
                </select>
              </div>
              <div className="form-group">
                <label>Type</label>
                <select
                  value={newTransaction.type}
                  onChange={(e) =>
                    setNewTransaction({
                      ...newTransaction,
                      type: e.target.value,
                    })
                  }
                >
                  <option value="expense">Expense</option>
                  <option value="income">Income</option>
                </select>
              </div>
            </div>
            <div className="modal-footer">
              <button
                className="btn btn-secondary"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary"
                onClick={handleAddTransaction}
              >
                Add
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecentActivities;
