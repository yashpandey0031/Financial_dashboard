import { useStore } from "../../store/store";
import { TrendingUp, AlertCircle, Target, BarChart3 } from "lucide-react";

export const InsightsSection = () => {
  const { transactions } = useStore();

  const getHighestSpendingCategory = () => {
    const breakdown = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
      });

    if (Object.keys(breakdown).length === 0) return null;

    return Object.entries(breakdown).reduce(
      (max, [cat, amt]) =>
        amt > max.amount ? { category: cat, amount: amt } : max,
      { category: "", amount: 0 },
    );
  };

  const getMonthlyComparison = () => {
    const now = new Date();
    const thisMonth = now.getMonth();
    const thisYear = now.getFullYear();

    const lastMonthDate = new Date(thisYear, thisMonth - 1, 1);
    const lastMonth = lastMonthDate.getMonth();
    const lastMonthYear = lastMonthDate.getFullYear();

    const thisMonthExpense = transactions
      .filter((t) => {
        const d = new Date(t.date);
        return (
          d.getMonth() === thisMonth &&
          d.getFullYear() === thisYear &&
          t.type === "expense"
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const lastMonthExpense = transactions
      .filter((t) => {
        const d = new Date(t.date);
        return (
          d.getMonth() === lastMonth &&
          d.getFullYear() === lastMonthYear &&
          t.type === "expense"
        );
      })
      .reduce((sum, t) => sum + t.amount, 0);

    const change =
      lastMonthExpense === 0
        ? 100
        : ((thisMonthExpense - lastMonthExpense) / lastMonthExpense) * 100;

    return { thisMonth: thisMonthExpense, lastMonth: lastMonthExpense, change };
  };

  const getAverageDailySpend = () => {
    if (transactions.length === 0) return 0;

    const expenses = transactions.filter((t) => t.type === "expense");
    if (expenses.length === 0) return 0;

    const total = expenses.reduce((sum, t) => sum + t.amount, 0);
    const uniqueDates = new Set(expenses.map((t) => t.date));
    return (total / uniqueDates.size).toFixed(2);
  };

  const getTotalTransactions = () => transactions.length;

  const highestCategory = getHighestSpendingCategory();
  const monthlyComparison = getMonthlyComparison();
  const averageDaily = getAverageDailySpend();
  const totalTransactions = getTotalTransactions();

  const insightCards = [
    {
      icon: <Target size={24} />,
      title: "Highest Spending Category",
      value: highestCategory ? `${highestCategory.category}` : "N/A",
      detail: highestCategory
        ? `$${highestCategory.amount.toLocaleString()}`
        : "No expenses yet",
      color: "blue",
    },
    {
      icon: <TrendingUp size={24} />,
      title: "Monthly Comparison",
      value:
        monthlyComparison.change > 0
          ? `↑ ${monthlyComparison.change.toFixed(1)}%`
          : `↓ ${Math.abs(monthlyComparison.change).toFixed(1)}%`,
      detail: `Current: $${monthlyComparison.thisMonth.toLocaleString()} vs Last: $${monthlyComparison.lastMonth.toLocaleString()}`,
      color: monthlyComparison.change > 0 ? "red" : "green",
    },
    {
      icon: <BarChart3 size={24} />,
      title: "Avg Daily Spend",
      value: `$${averageDaily}`,
      detail: "Based on expense transactions",
      color: "purple",
    },
    {
      icon: <AlertCircle size={24} />,
      title: "Total Transactions",
      value: totalTransactions,
      detail: "Across all categories",
      color: "orange",
    },
  ];

  const colorClasses = {
    blue: "border-l-blue-500 bg-gradient-to-br from-blue-50 dark:from-blue-950 to-blue-100 dark:to-blue-900",
    red: "border-l-red-500 bg-gradient-to-br from-red-50 dark:from-red-950 to-red-100 dark:to-red-900",
    green:
      "border-l-green-500 bg-gradient-to-br from-green-50 dark:from-green-950 to-green-100 dark:to-green-900",
    purple:
      "border-l-purple-500 bg-gradient-to-br from-purple-50 dark:from-purple-950 to-purple-100 dark:to-purple-900",
    orange:
      "border-l-orange-500 bg-gradient-to-br from-orange-50 dark:from-orange-950 to-orange-100 dark:to-orange-900",
  };

  const iconColors = {
    blue: "text-blue-600 dark:text-blue-400",
    red: "text-red-600 dark:text-red-400",
    green: "text-green-600 dark:text-green-400",
    purple: "text-purple-600 dark:text-purple-400",
    orange: "text-orange-600 dark:text-orange-400",
  };

  return (
    <div id="insights" className="space-y-6">
      <h2 className="text-lg font-semibold dark:text-white mb-4">
        Insights & Analytics
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {insightCards.map((insight, idx) => (
          <div
            key={idx}
            className={`card p-6 border-l-4 fade-in ${colorClasses[insight.color]}`}
            style={{ animationDelay: `${idx * 0.1}s` }}
          >
            <div className="flex items-start gap-4">
              <div
                className={`p-3 rounded-lg bg-white dark:bg-slate-700 ${iconColors[insight.color]}`}
              >
                {insight.icon}
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400 mb-1">
                  {insight.title}
                </p>
                <p className="text-2xl font-bold dark:text-white mb-1">
                  {insight.value}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {insight.detail}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
