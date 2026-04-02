import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useStore } from "../../store/store";
import { INITIAL_BALANCE } from "../../data/mockData";

export const BalanceTrend = () => {
  const { transactions } = useStore();

  const getTrendData = () => {
    const sorted = [...transactions].sort(
      (a, b) => new Date(a.date) - new Date(b.date),
    );
    const dailyData = {};
    let running = INITIAL_BALANCE;

    sorted.forEach((t) => {
      const date = t.date;
      running = t.type === "income" ? running + t.amount : running - t.amount;
      if (!dailyData[date]) {
        dailyData[date] = running;
      }
    });

    return Object.entries(dailyData)
      .map(([date, balance]) => ({
        date: new Date(date).toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
        }),
        balance: Math.round(balance),
        originalDate: date,
      }))
      .slice(-30); // Show last 30 days
  };

  const data = getTrendData();

  return (
    <div className="panel-card p-6 fade-in">
      <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="section-kicker">Trend line</p>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Cumulative Profit and Loss
          </h2>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          Last 30 active transaction days
        </p>
      </div>

      {data.length > 0 ? (
        <div className="rounded-[24px] border border-slate-200/80 bg-gradient-to-b from-white/70 to-slate-50/80 p-3 dark:border-slate-700 dark:from-slate-900/60 dark:to-slate-950/60">
          <ResponsiveContainer width="100%" height={320}>
            <LineChart data={data}>
              <CartesianGrid
                strokeDasharray="4 4"
                stroke="rgba(148, 163, 184, 0.32)"
                className="dark:stroke-slate-700/70"
              />
              <XAxis
                dataKey="date"
                tick={{ fontSize: 12 }}
                stroke="#64748b"
                className="dark:stroke-slate-400"
              />
              <YAxis
                tick={{ fontSize: 12 }}
                stroke="#64748b"
                className="dark:stroke-slate-400"
              />
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
              <Line
                type="monotone"
                dataKey="balance"
                stroke="#0d9488"
                strokeWidth={3}
                dot={false}
                name="Balance"
                isAnimationActive={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <p className="py-10 text-center text-slate-500 dark:text-slate-400">
          No transaction data available
        </p>
      )}
    </div>
  );
};
