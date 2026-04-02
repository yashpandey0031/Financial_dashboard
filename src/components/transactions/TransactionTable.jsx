import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useStore } from "../../store/store";
import { TransactionModal } from "./TransactionModal";

export const TransactionTable = () => {
  const {
    transactions,
    role,
    deleteTransaction,
    filters,
    setFilterType,
    setSearchTerm,
    clearFilters,
  } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  // Filter transactions
  const filteredTransactions = transactions.filter((t) => {
    if (filters.type !== "all" && t.type !== filters.type) return false;
    if (filters.category !== "all" && t.category !== filters.category)
      return false;
    if (
      filters.searchTerm &&
      !t.description.toLowerCase().includes(filters.searchTerm.toLowerCase())
    )
      return false;
    return true;
  });

  // Sort transactions
  const sortedTransactions = [...filteredTransactions].sort((a, b) => {
    let aVal, bVal;
    if (sortBy === "date") {
      aVal = new Date(a.date);
      bVal = new Date(b.date);
    } else if (sortBy === "amount") {
      aVal = a.amount;
      bVal = b.amount;
    } else if (sortBy === "category") {
      aVal = a.category;
      bVal = b.category;
    }

    if (sortOrder === "asc") return aVal > bVal ? 1 : -1;
    return aVal < bVal ? 1 : -1;
  });

  const toggleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("desc");
    }
  };

  const hasFilters =
    filters.type !== "all" || filters.category !== "all" || filters.searchTerm;

  return (
    <>
      <div
        id="transactions"
        className="card p-6 fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <h2 className="text-lg font-semibold dark:text-white">
            Transactions
          </h2>
          {role === "admin" && (
            <button
              onClick={() => {
                setEditingId(null);
                setShowModal(true);
              }}
              className="btn btn-primary flex items-center gap-2 self-start"
            >
              <Plus size={18} /> Add Transaction
            </button>
          )}
        </div>

        {/* Filters */}
        <div className="space-y-4 mb-6 pb-6 border-b border-gray-200 dark:border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Type
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg text-sm"
              >
                <option value="all">All Types</option>
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Search
              </label>
              <input
                type="text"
                placeholder="Search description..."
                value={filters.searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg text-sm"
              />
            </div>

            <div className="md:col-span-2">
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="btn btn-secondary w-full mt-6"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        {sortedTransactions.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200 dark:border-slate-700">
                  <th
                    className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
                    onClick={() => toggleSort("date")}
                  >
                    Date{" "}
                    {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">
                    Description
                  </th>
                  <th
                    className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
                    onClick={() => toggleSort("category")}
                  >
                    Category{" "}
                    {sortBy === "category" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th
                    className="text-right py-3 px-2 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
                    onClick={() => toggleSort("amount")}
                  >
                    Amount{" "}
                    {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
                  </th>
                  <th className="text-center py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">
                    Type
                  </th>
                  {role === "admin" && (
                    <th className="text-center py-3 px-2 font-semibold text-gray-700 dark:text-gray-300">
                      Actions
                    </th>
                  )}
                </tr>
              </thead>
              <tbody>
                {sortedTransactions.map((transaction, idx) => (
                  <tr
                    key={transaction.id}
                    className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition"
                  >
                    <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                      {new Date(transaction.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-2 text-gray-700 dark:text-gray-300">
                      {transaction.description}
                    </td>
                    <td className="py-3 px-2">
                      <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300">
                        {transaction.category}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-right font-semibold">
                      <span
                        className={
                          transaction.type === "income"
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }
                      >
                        {transaction.type === "income" ? "+" : "-"}$
                        {transaction.amount.toLocaleString()}
                      </span>
                    </td>
                    <td className="py-3 px-2 text-center">
                      <span
                        className={`inline-block px-3 py-1 rounded text-xs font-medium ${
                          transaction.type === "income"
                            ? "bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-300"
                            : "bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-300"
                        }`}
                      >
                        {transaction.type === "income" ? "Income" : "Expense"}
                      </span>
                    </td>
                    {role === "admin" && (
                      <td className="py-3 px-2 text-center">
                        <div className="flex justify-center gap-2">
                          <button
                            onClick={() => {
                              setEditingId(transaction.id);
                              setShowModal(true);
                            }}
                            className="p-1.5 hover:bg-blue-100 dark:hover:bg-blue-900 rounded transition text-blue-600 dark:text-blue-400"
                            title="Edit"
                          >
                            <Edit2 size={16} />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm("Delete this transaction?")) {
                                deleteTransaction(transaction.id);
                              }
                            }}
                            className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900 rounded transition text-red-600 dark:text-red-400"
                            title="Delete"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400 text-lg">
              No transactions found
            </p>
            <p className="text-gray-400 dark:text-gray-500 text-sm mt-1">
              Try adjusting your filters
            </p>
          </div>
        )}
      </div>

      {showModal && (
        <TransactionModal
          transactionId={editingId}
          onClose={() => {
            setShowModal(false);
            setEditingId(null);
          }}
        />
      )}
    </>
  );
};
