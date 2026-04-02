import { useState } from "react";
import { Plus, Trash2, Edit2 } from "lucide-react";
import { useStore } from "../../store/store";
import { TransactionModal } from "./TransactionModal";
import { ExportPanel } from "./ExportPanel";
import { filterUtils } from "../../utils/filters";

export const TransactionTable = () => {
  const {
    transactions,
    role,
    deleteTransaction,
    filters,
    setFilterType,
    setFilterCategory,
    setSearchTerm,
    setDateRange,
    setAmountRange,
    setGroupBy,
    clearFilters,
    isLoading,
    error,
    clearError,
  } = useStore();
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [sortBy, setSortBy] = useState("date");
  const [sortOrder, setSortOrder] = useState("desc");

  const categories = [...new Set(transactions.map((t) => t.category))].sort();

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

    if (
      filters.dateRange.start &&
      new Date(t.date) < new Date(filters.dateRange.start)
    ) {
      return false;
    }

    if (
      filters.dateRange.end &&
      new Date(t.date) > new Date(filters.dateRange.end)
    ) {
      return false;
    }

    if (
      filters.amountRange.min !== "" &&
      t.amount < Number(filters.amountRange.min)
    ) {
      return false;
    }

    if (
      filters.amountRange.max !== "" &&
      t.amount > Number(filters.amountRange.max)
    ) {
      return false;
    }

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
    filters.type !== "all" ||
    filters.category !== "all" ||
    filters.searchTerm ||
    filters.dateRange.start ||
    filters.dateRange.end ||
    filters.amountRange.min !== "" ||
    filters.amountRange.max !== "" ||
    filters.groupBy !== "none";

  const groupedTransactions = (() => {
    if (filters.groupBy === "none") return null;
    if (filters.groupBy === "category")
      return filterUtils.groupByCategory(sortedTransactions);
    if (filters.groupBy === "date")
      return filterUtils.groupByDate(sortedTransactions);
    if (filters.groupBy === "month")
      return filterUtils.groupByMonth(sortedTransactions);
    if (filters.groupBy === "type")
      return filterUtils.groupByType(sortedTransactions);
    return null;
  })();

  const handleDelete = async (id) => {
    if (!confirm("Delete this transaction?")) {
      return;
    }
    await deleteTransaction(id);
  };

  const applyQuickFilter = (mode) => {
    const now = new Date();
    const monthStart = new Date(now.getFullYear(), now.getMonth(), 1)
      .toISOString()
      .split("T")[0];
    const monthEnd = now.toISOString().split("T")[0];

    if (mode === "all") {
      clearFilters();
      return;
    }

    if (mode === "income") {
      setFilterType("income");
      return;
    }

    if (mode === "expense") {
      setFilterType("expense");
      return;
    }

    if (mode === "month") {
      setDateRange(monthStart, monthEnd);
    }
  };

  const renderRows = (txns) => {
    return txns.map((transaction) => (
      <tr
        key={transaction.id}
        className="border-b border-gray-100 dark:border-slate-700 hover:bg-gray-50 dark:hover:bg-slate-800 transition slide-in-up"
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
                onClick={() => handleDelete(transaction.id)}
                className="p-1.5 hover:bg-red-100 dark:hover:bg-red-900 rounded transition text-red-600 dark:text-red-400"
                title="Delete"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </td>
        )}
      </tr>
    ));
  };

  const renderTable = (txns) => (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-200 dark:border-slate-700">
            <th
              className="text-left py-3 px-2 font-semibold text-gray-700 dark:text-gray-300 cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700"
              onClick={() => toggleSort("date")}
            >
              Date {sortBy === "date" && (sortOrder === "asc" ? "↑" : "↓")}
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
              Amount {sortBy === "amount" && (sortOrder === "asc" ? "↑" : "↓")}
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
        <tbody>{renderRows(txns)}</tbody>
      </table>
    </div>
  );

  return (
    <>
      <div
        id="transactions"
        className="panel-card p-6 fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="section-kicker">Ledger</p>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Transactions
            </h2>
            <p className="muted-copy">
              Filter, sort, group, and export the active ledger.
            </p>
          </div>
          <div className="flex flex-wrap gap-2 items-center">
            <ExportPanel transactions={sortedTransactions} />
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
        </div>

        {error && (
          <div className="mb-4 p-3 rounded-lg border border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/30 flex items-center justify-between gap-3">
            <p className="text-sm text-red-700 dark:text-red-300">{error}</p>
            <button onClick={clearError} className="text-xs btn btn-secondary">
              Dismiss
            </button>
          </div>
        )}

        {/* Filters */}
        <div className="mb-6 rounded-[24px] border border-slate-200/80 bg-slate-50/80 p-4 dark:border-slate-700 dark:bg-slate-900/60">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-200">
              Active filters
            </p>
            <span className="chip">
              {sortedTransactions.length} matching row
              {sortedTransactions.length === 1 ? "" : "s"}
            </span>
          </div>

          <div className="mb-4 flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => applyQuickFilter("all")}
              className="chip-solid bg-slate-800 text-white dark:bg-slate-100 dark:text-slate-900"
            >
              Reset
            </button>
            <button
              type="button"
              onClick={() => applyQuickFilter("income")}
              className="chip-solid bg-teal-500/15 text-teal-700 dark:bg-teal-500/20 dark:text-teal-300"
            >
              Income only
            </button>
            <button
              type="button"
              onClick={() => applyQuickFilter("expense")}
              className="chip-solid bg-orange-500/15 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300"
            >
              Expense only
            </button>
            <button
              type="button"
              onClick={() => applyQuickFilter("month")}
              className="chip-solid bg-violet-500/15 text-violet-700 dark:bg-violet-500/20 dark:text-violet-300"
            >
              This month
            </button>
          </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
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
                Category
              </label>
              <select
                value={filters.category}
                onChange={(e) => setFilterCategory(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg text-sm"
              >
                <option value="all">All Categories</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
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

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Group By
              </label>
              <select
                value={filters.groupBy}
                onChange={(e) => setGroupBy(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg text-sm"
              >
                <option value="none">None</option>
                <option value="category">Category</option>
                <option value="date">Date</option>
                <option value="month">Month</option>
                <option value="type">Type</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Start Date
              </label>
              <input
                type="date"
                value={filters.dateRange.start || ""}
                onChange={(e) =>
                  setDateRange(e.target.value || null, filters.dateRange.end)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                End Date
              </label>
              <input
                type="date"
                value={filters.dateRange.end || ""}
                onChange={(e) =>
                  setDateRange(filters.dateRange.start, e.target.value || null)
                }
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Min Amount
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.amountRange.min}
                onChange={(e) =>
                  setAmountRange(e.target.value, filters.amountRange.max)
                }
                placeholder="0"
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg text-sm"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Max Amount
              </label>
              <input
                type="number"
                min="0"
                step="0.01"
                value={filters.amountRange.max}
                onChange={(e) =>
                  setAmountRange(filters.amountRange.min, e.target.value)
                }
                placeholder="10000"
                className="w-full px-3 py-2 border border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white rounded-lg text-sm"
              />
            </div>

            <div className="md:col-span-2 lg:col-span-4">
              {hasFilters && (
                <button
                  onClick={clearFilters}
                  className="btn btn-secondary w-full mt-4"
                >
                  Clear Filters
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Table */}
        {isLoading ? (
          <div className="py-12 text-center pulse-gentle">
            <p className="text-gray-600 dark:text-gray-300">
              Loading transactions...
            </p>
          </div>
        ) : sortedTransactions.length > 0 ? (
          groupedTransactions ? (
            <div className="space-y-6">
              {Object.entries(groupedTransactions).map(([group, txns]) => {
                const groupTotal = txns.reduce(
                  (sum, t) =>
                    t.type === "income" ? sum + t.amount : sum - t.amount,
                  0,
                );

                return (
                  <div key={group} className="panel-card p-4 scale-in">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="font-semibold text-gray-900 dark:text-white">
                        {group}
                      </h3>
                      <span
                        className={`text-sm font-semibold ${
                          groupTotal >= 0
                            ? "text-green-600 dark:text-green-400"
                            : "text-red-600 dark:text-red-400"
                        }`}
                      >
                        {groupTotal >= 0 ? "+" : "-"}$
                        {Math.abs(groupTotal).toLocaleString()}
                      </span>
                    </div>
                    {renderTable(txns)}
                  </div>
                );
              })}
            </div>
          ) : (
            renderTable(sortedTransactions)
          )
        ) : (
          <div className="rounded-[24px] border border-dashed border-slate-300/80 py-12 text-center dark:border-slate-600">
            <p className="text-lg text-slate-500 dark:text-slate-400">
              No transactions found
            </p>
            <p className="mt-1 text-sm text-slate-400 dark:text-slate-500">
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
