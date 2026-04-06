import React, { useState, useMemo } from "react";
import { Filter, ChevronDown, Trash2, Plus } from "lucide-react";

const RecentActivities = ({
  activities,
  getStatusColor,
  getStatusIcon,
  userRole = "viewer",
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [sortBy, setSortBy] = useState("date");
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [transactionList, setTransactionList] = useState(activities);
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

  const filteredAndSortedActivities = useMemo(() => {
    let filtered = transactionList.filter((activity) => {
      const matchesSearch =
        activity.activity.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        activity.id.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesFilter =
        filterType === "all" ||
        activity.type === filterType ||
        activity.category === filterType;

      return matchesSearch && matchesFilter;
    });

    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return new Date(b.date) - new Date(a.date);
      } else if (sortBy === "amount") {
        return b.amount - a.amount;
      } else if (sortBy === "activity") {
        return a.activity.localeCompare(b.activity);
      }
      return 0;
    });

    return filtered;
  }, [transactionList, searchTerm, filterType, sortBy]);

  const categories = [...new Set(transactionList.map((a) => a.category))];

  const handleAddTransaction = () => {
    if (!newTransaction.activity || !newTransaction.amount) return;

    const transaction = {
      id: `INV-${String(transactionList.length + 1).padStart(6, "0")}`,
      activity: newTransaction.activity,
      amount: parseFloat(newTransaction.amount),
      price: `$${parseFloat(newTransaction.amount).toFixed(2)}`,
      category: newTransaction.category,
      type: newTransaction.type,
      date: newTransaction.date,
      status: "Completed",
      icon: "📝",
    };

    setTransactionList([transaction, ...transactionList]);
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

  const handleDeleteTransaction = (id) => {
    setTransactionList(transactionList.filter((t) => t.id !== id));
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
              title="Add new transaction"
            >
              <Plus size={16} /> Add Transaction
            </button>
          )}
        </div>
        <div className="activities-controls">
          <input
            type="text"
            placeholder="Search activity, category, or ID..."
            className="search-input"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <div className="filter-dropdown">
            <button
              className="filter-btn"
              onClick={() => setShowFilterMenu(!showFilterMenu)}
            >
              <Filter size={16} />
              <ChevronDown size={14} />
            </button>
            {showFilterMenu && (
              <div className="filter-menu">
                <div className="filter-section">
                  <label className="filter-label">Type</label>
                  <button
                    className={`filter-option ${filterType === "all" ? "active" : ""}`}
                    onClick={() => {
                      setFilterType("all");
                      setShowFilterMenu(false);
                    }}
                  >
                    All
                  </button>
                  <button
                    className={`filter-option ${filterType === "income" ? "active" : ""}`}
                    onClick={() => {
                      setFilterType("income");
                      setShowFilterMenu(false);
                    }}
                  >
                    Income
                  </button>
                  <button
                    className={`filter-option ${filterType === "expense" ? "active" : ""}`}
                    onClick={() => {
                      setFilterType("expense");
                      setShowFilterMenu(false);
                    }}
                  >
                    Expense
                  </button>
                </div>
                <div className="filter-section">
                  <label className="filter-label">Sort By</label>
                  <button
                    className={`filter-option ${sortBy === "date" ? "active" : ""}`}
                    onClick={() => {
                      setSortBy("date");
                      setShowFilterMenu(false);
                    }}
                  >
                    Date
                  </button>
                  <button
                    className={`filter-option ${sortBy === "amount" ? "active" : ""}`}
                    onClick={() => {
                      setSortBy("amount");
                      setShowFilterMenu(false);
                    }}
                  >
                    Amount
                  </button>
                  <button
                    className={`filter-option ${sortBy === "activity" ? "active" : ""}`}
                    onClick={() => {
                      setSortBy("activity");
                      setShowFilterMenu(false);
                    }}
                  >
                    Activity Name
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      {showAddModal && userRole === "admin" && (
        <div className="modal-overlay" onClick={() => setShowAddModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3 className="modal-title">Add New Transaction</h3>
            <div className="modal-body">
              <input
                type="text"
                placeholder="Activity Name"
                value={newTransaction.activity}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    activity: e.target.value,
                  })
                }
                className="modal-input"
              />
              <input
                type="number"
                placeholder="Amount"
                step="0.01"
                value={newTransaction.amount}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    amount: e.target.value,
                  })
                }
                className="modal-input"
              />
              <input
                type="text"
                placeholder="Category"
                value={newTransaction.category}
                onChange={(e) =>
                  setNewTransaction({
                    ...newTransaction,
                    category: e.target.value,
                  })
                }
                className="modal-input"
              />
              <select
                value={newTransaction.type}
                onChange={(e) =>
                  setNewTransaction({ ...newTransaction, type: e.target.value })
                }
                className="modal-input"
              >
                <option value="expense">Expense</option>
                <option value="income">Income</option>
              </select>
            </div>
            <div className="modal-buttons">
              <button
                className="modal-btn cancel-btn"
                onClick={() => setShowAddModal(false)}
              >
                Cancel
              </button>
              <button
                className="modal-btn save-btn"
                onClick={handleAddTransaction}
              >
                Add Transaction
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="activities-table">
        <div className="table-header">
          <div>Date</div>
          <div>Activity</div>
          <div>Category</div>
          <div>Amount</div>
          <div>Type</div>
          <div>Status</div>
          {userRole === "admin" && <div>Actions</div>}
        </div>
        {filteredAndSortedActivities.length > 0 ? (
          filteredAndSortedActivities.map((activity, idx) => (
            <div key={idx} className="table-row">
              <div className="table-cell">{activity.date}</div>
              <div className="table-cell">
                <span className="activity-icon">{activity.icon}</span>
                {activity.activity}
              </div>
              <div className="table-cell">
                <span className="category-badge">{activity.category}</span>
              </div>
              <div className="table-cell">{activity.price}</div>
              <div className="table-cell">
                <span className={`type-badge ${activity.type}`}>
                  {activity.type === "income" ? "+ " : "- "}
                  {activity.type.charAt(0).toUpperCase() +
                    activity.type.slice(1)}
                </span>
              </div>
              <div className="table-cell">
                <span
                  className="status-badge"
                  style={{ color: getStatusColor(activity.status) }}
                >
                  {getStatusIcon(activity.status)} {activity.status}
                </span>
              </div>
              {userRole === "admin" && (
                <div className="table-cell actions-cell">
                  <button
                    className="action-btn delete-btn"
                    onClick={() => handleDeleteTransaction(activity.id)}
                    title="Delete transaction"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <div className="empty-state">No transactions found</div>
        )}
      </div>
    </div>
  );
};

export default RecentActivities;
