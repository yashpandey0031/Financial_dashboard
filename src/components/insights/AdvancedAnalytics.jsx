import { useState } from "react";
import { TrendingUp, Grid, Calendar, Tag } from "lucide-react";
import { useStore } from "../../store/store";
import { filterUtils } from "../../utils/filters";

export const AdvancedAnalytics = () => {
  const { transactions } = useStore();
  const [groupBy, setGroupBy] = useState("category");

  const groupedData = (() => {
    switch (groupBy) {
      case "category":
        return filterUtils.groupByCategory(transactions);
      case "month":
        return filterUtils.groupByMonth(transactions);
      case "type":
        return filterUtils.groupByType(transactions);
      default:
        return {};
    }
  })();

  const monthlyData = filterUtils.getMonthlySummary(transactions);
  const topTransactions = filterUtils.getTopTransactions(transactions, 5);
  const rankedCategories = filterUtils.getRankedCategories(transactions);

  const renderGroupedData = () => {
    return Object.entries(groupedData).map(([groupName, items]) => {
      const income = items
        .filter((t) => t.type === "income")
        .reduce((sum, t) => sum + t.amount, 0);
      const expenses = items
        .filter((t) => t.type === "expense")
        .reduce((sum, t) => sum + t.amount, 0);
      const net = income - expenses;

      return (
        <div
          key={groupName}
          className="card p-4 fade-in"
          style={{ animationDelay: "0.1s" }}
        >
          <div className="flex items-start justify-between mb-3">
            <h3 className="font-semibold text-gray-900 dark:text-white">
              {groupName}
            </h3>
            <span className="text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-300 px-2 py-1 rounded">
              {items.length} transaction{items.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div className="grid grid-cols-3 gap-2 text-sm">
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Income</p>
              <p className="font-semibold text-green-600 dark:text-green-400">
                ${income.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-xs">
                Expenses
              </p>
              <p className="font-semibold text-red-600 dark:text-red-400">
                ${expenses.toLocaleString()}
              </p>
            </div>
            <div>
              <p className="text-gray-600 dark:text-gray-400 text-xs">Net</p>
              <p
                className={`font-semibold ${net >= 0 ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}`}
              >
                ${net.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      );
    });
  };

  return (
    <div className="space-y-8">
      {/* Top Transactions */}
      <div className="card p-6 fade-in">
        <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center gap-2">
          <TrendingUp size={20} className="text-blue-600" />
          Top 5 Transactions
        </h3>
        <div className="space-y-2">
          {topTransactions.length > 0 ? (
            topTransactions.map((t, idx) => (
              <div
                key={t.id}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900 dark:text-white">
                    {idx + 1}. {t.description}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {t.category} • {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>
                <span
                  className={`font-semibold ${
                    t.type === "income"
                      ? "text-green-600 dark:text-green-400"
                      : "text-red-600 dark:text-red-400"
                  }`}
                >
                  {t.type === "income" ? "+" : "-"}${t.amount.toLocaleString()}
                </span>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">No transactions</p>
          )}
        </div>
      </div>

      {/* Monthly Summary */}
      <div className="card p-6 fade-in" style={{ animationDelay: "0.1s" }}>
        <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center gap-2">
          <Calendar size={20} className="text-purple-600" />
          Monthly Summary
        </h3>
        <div className="space-y-2">
          {monthlyData.length > 0 ? (
            monthlyData.map((month) => (
              <div
                key={month.month}
                className="p-3 bg-gray-50 dark:bg-slate-700 rounded-lg"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium text-gray-900 dark:text-white">
                    {new Date(month.month + "-01").toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                    })}
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    {month.count} transactions
                  </span>
                </div>
                <div className="grid grid-cols-3 gap-2 text-sm">
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      Income
                    </p>
                    <p className="font-semibold text-green-600 dark:text-green-400">
                      ${month.income.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      Expenses
                    </p>
                    <p className="font-semibold text-red-600 dark:text-red-400">
                      ${month.expenses.toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-600 dark:text-gray-400 text-xs">
                      Net
                    </p>
                    <p
                      className={`font-semibold ${
                        month.net >= 0
                          ? "text-green-600 dark:text-green-400"
                          : "text-red-600 dark:text-red-400"
                      }`}
                    >
                      ${month.net.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No data available
            </p>
          )}
        </div>
      </div>

      {/* Category Rankings */}
      <div className="card p-6 fade-in" style={{ animationDelay: "0.2s" }}>
        <h3 className="text-lg font-semibold mb-4 dark:text-white flex items-center gap-2">
          <Tag size={20} className="text-orange-600" />
          Spending by Category
        </h3>
        <div className="space-y-2">
          {rankedCategories.length > 0 ? (
            rankedCategories.map((cat, idx) => {
              const percentage = Math.round(
                (cat.total /
                  rankedCategories.reduce((sum, c) => sum + c.total, 0)) *
                  100,
              );

              return (
                <div key={cat.category} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium text-gray-900 dark:text-white">
                      {idx + 1}. {cat.category}
                    </span>
                    <span className="text-gray-600 dark:text-gray-400">
                      ${cat.total.toLocaleString()} ({percentage}%)
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              No expenses recorded
            </p>
          )}
        </div>
      </div>

      {/* Grouped Data View */}
      <div className="card p-6 fade-in" style={{ animationDelay: "0.3s" }}>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
            <Grid size={20} className="text-indigo-600" />
            Group By
          </h3>
          <div className="flex gap-2">
            <button
              onClick={() => setGroupBy("category")}
              className={`px-3 py-1 rounded text-sm transition-all ${
                groupBy === "category"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-600"
              }`}
            >
              Category
            </button>
            <button
              onClick={() => setGroupBy("month")}
              className={`px-3 py-1 rounded text-sm transition-all ${
                groupBy === "month"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-600"
              }`}
            >
              Month
            </button>
            <button
              onClick={() => setGroupBy("type")}
              className={`px-3 py-1 rounded text-sm transition-all ${
                groupBy === "type"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 dark:bg-slate-700 text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-slate-600"
              }`}
            >
              Type
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderGroupedData()}
        </div>
      </div>
    </div>
  );
};
