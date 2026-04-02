import {
  ArrowUpRight,
  ArrowDownRight,
  Wallet,
  BadgeDollarSign,
} from "lucide-react";
import { useStore } from "../../store/store";
import { INITIAL_BALANCE } from "../../data/mockData";

export const SummaryCards = () => {
  const { transactions } = useStore();

  const totalIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalExpenses = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((sum, transaction) => sum + transaction.amount, 0);

  const totalBalance =
    INITIAL_BALANCE +
    transactions.reduce((sum, transaction) => {
      return transaction.type === "income"
        ? sum + transaction.amount
        : sum - transaction.amount;
    }, 0);

  const profitLoss = totalIncome - totalExpenses;

  const maxIncome = transactions
    .filter((transaction) => transaction.type === "income")
    .reduce((max, transaction) => Math.max(max, transaction.amount), 0);

  const maxExpense = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce((max, transaction) => Math.max(max, transaction.amount), 0);

  const cards = [
    {
      label: "Total Balance",
      value: totalBalance,
      icon: Wallet,
      color: "blue",
    },
    {
      label: "Income",
      value: totalIncome,
      icon: ArrowUpRight,
      color: "green",
    },
    {
      label: "Expenses",
      value: totalExpenses,
      icon: ArrowDownRight,
      color: "red",
    },
    {
      label: "Profit/Loss",
      value: profitLoss,
      icon: BadgeDollarSign,
      color: profitLoss >= 0 ? "green" : "red",
    },
  ];

  const getColorClasses = (color) => {
    const colors = {
      blue: "bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 border-l-blue-500",
      green:
        "bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 border-l-green-500",
      red: "bg-red-100 dark:bg-red-900 text-red-700 dark:text-red-300 border-l-red-500",
    };
    return colors[color] || colors.blue;
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {cards.map((card, index) => {
          const Icon = card.icon;
          const colorClasses = getColorClasses(card.color);

          return (
            <div
              key={card.label}
              className={`summary-card border-l-4 ${colorClasses} fade-in`}
              style={{ animationDelay: `${index * 0.05}s` }}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1">
                  <p className="summary-card-label">{card.label}</p>
                  <p className="summary-card-value">
                    $
                    {card.value.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                </div>
                <Icon size={24} className="mt-1 opacity-60" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
