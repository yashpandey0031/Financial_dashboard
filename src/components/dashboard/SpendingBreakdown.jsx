import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Legend,
  Tooltip,
} from "recharts";
import { useStore } from "../../store/store";

const COLORS = [
  "#f97316",
  "#fb923c",
  "#f59e0b",
  "#14b8a6",
  "#0d9488",
  "#06b6d4",
  "#22c55e",
  "#a855f7",
];

export const SpendingBreakdown = () => {
  const { transactions } = useStore();

  const getCategoryBreakdown = () => {
    const breakdown = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
      });
    return Object.entries(breakdown).map(([name, value]) => ({ name, value }));
  };

  const data = getCategoryBreakdown();

  return (
    <div className="panel-card p-6 fade-in" style={{ animationDelay: "0.1s" }}>
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Category mix</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Expense Distribution
          </h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Focuses on expense categories only
        </p>
      </div>

      {data.length > 0 ? (
        <div className="rounded-[24px] border border-slate-200/80 bg-gradient-to-b from-white/70 to-slate-50/80 p-3 dark:border-slate-700 dark:from-slate-900/60 dark:to-slate-950/60">
          <ResponsiveContainer width="100%" height={320}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                innerRadius={68}
                outerRadius={106}
                paddingAngle={3}
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${Math.round(percent * 100)}%`
                }
                fill="#8884d8"
                dataKey="value"
                animationBegin={0}
                animationDuration={500}
              >
                {data.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "rgba(15, 23, 42, 0.95)",
                  border: "1px solid rgba(148, 163, 184, 0.18)",
                  borderRadius: "16px",
                  color: "#f8fafc",
                }}
                formatter={(value) => `$${value.toLocaleString()}`}
              />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="py-10 text-center text-slate-500 dark:text-slate-400">
          No expense data available
        </p>
      )}
    </div>
  );
};
