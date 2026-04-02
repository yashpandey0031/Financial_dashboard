import { TrendingUp, TrendingDown, Wallet } from "lucide-react";
import { useStore } from "../../store/store";
import { INITIAL_BALANCE } from "../../data/mockData";

export const SummaryCards = () => {
  const { transactions } = useStore();

  const getTotalIncome = () => {
    return transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalExpenses = () => {
    return transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);
  };

  const getTotalBalance = () => {
    const sum = transactions.reduce((acc, t) => {
      return t.type === "income" ? acc + t.amount : acc - t.amount;
    }, 0);
    return INITIAL_BALANCE + sum;
  };

  const totalIncome = getTotalIncome();
  const totalExpenses = getTotalExpenses();
  const totalBalance = getTotalBalance();

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="card p-6 border-l-4 border-l-blue-500 fade-in">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              Total Balance
            </p>
            <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
              $
              {totalBalance.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className="bg-blue-100 dark:bg-blue-900 p-4 rounded-lg">
            <Wallet className="text-blue-600 dark:text-blue-400" size={32} />
          </div>
        </div>
      </div>

      <div
        className="card p-6 border-l-4 border-l-green-500 fade-in"
        style={{ animationDelay: "0.1s" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              Total Income
            </p>
            <p className="text-3xl font-bold text-green-600 dark:text-green-400 mt-2">
              $
              {totalIncome.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className="bg-green-100 dark:bg-green-900 p-4 rounded-lg">
            <TrendingUp
              className="text-green-600 dark:text-green-400"
              size={32}
            />
          </div>
        </div>
      </div>

      <div
        className="card p-6 border-l-4 border-l-red-500 fade-in"
        style={{ animationDelay: "0.2s" }}
      >
        <div className="flex items-center justify-between">
          <div>
            <p className="text-gray-600 dark:text-gray-400 text-sm font-medium">
              Total Expenses
            </p>
            <p className="text-3xl font-bold text-red-600 dark:text-red-400 mt-2">
              $
              {totalExpenses.toLocaleString("en-US", {
                maximumFractionDigits: 0,
              })}
            </p>
          </div>
          <div className="bg-red-100 dark:bg-red-900 p-4 rounded-lg">
            <TrendingDown
              className="text-red-600 dark:text-red-400"
              size={32}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
