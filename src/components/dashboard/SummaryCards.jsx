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
      label: "Revenue",
      value: totalIncome,
      icon: ArrowUpRight,
      tone: "border-l-teal-500",
      iconTone:
        "bg-teal-500/10 text-teal-700 dark:bg-teal-500/15 dark:text-teal-300",
      suffix: "inflow",
    },
    {
      label: "Expense",
      value: totalExpenses,
      icon: ArrowDownRight,
      tone: "border-l-orange-500",
      iconTone:
        "bg-orange-500/10 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
      suffix: "outflow",
    },
    {
      label: "Profit/Loss",
      value: profitLoss,
      icon: BadgeDollarSign,
      tone: profitLoss >= 0 ? "border-l-emerald-500" : "border-l-rose-500",
      iconTone:
        profitLoss >= 0
          ? "bg-emerald-500/10 text-emerald-700 dark:bg-emerald-500/15 dark:text-emerald-300"
          : "bg-rose-500/10 text-rose-700 dark:bg-rose-500/15 dark:text-rose-300",
      suffix: profitLoss >= 0 ? "positive" : "negative",
    },
    {
      label: "Max Revenue",
      value: maxIncome,
      icon: Wallet,
      tone: "border-l-orange-500",
      iconTone:
        "bg-orange-500/10 text-orange-700 dark:bg-orange-500/15 dark:text-orange-300",
      suffix: "largest income",
    },
    {
      label: "Max Expense",
      value: maxExpense,
      icon: ArrowDownRight,
      tone: "border-l-fuchsia-500",
      iconTone:
        "bg-fuchsia-500/10 text-fuchsia-700 dark:bg-fuchsia-500/15 dark:text-fuchsia-300",
      suffix: "largest spend",
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="section-kicker">Key metrics</p>
          <p className="muted-copy">
            Starting balance included: ${INITIAL_BALANCE.toLocaleString()}.
          </p>
        </div>
        <div className="chip">
          Current balance: $
          {totalBalance.toLocaleString("en-US", { maximumFractionDigits: 0 })}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map((card, index) => {
          const Icon = card.icon;

          return (
            <div
              key={card.label}
              className={`kpi-card fade-in ${card.tone}`}
              style={{ animationDelay: `${index * 0.07}s` }}
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="kpi-label">{card.label}</p>
                  <p className="kpi-value">
                    $
                    {card.value.toLocaleString("en-US", {
                      maximumFractionDigits: 0,
                    })}
                  </p>
                  <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                    {card.suffix}
                  </p>
                </div>
                <div className={`rounded-2xl p-3 ${card.iconTone}`}>
                  <Icon size={24} />
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
