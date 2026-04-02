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
    <div className="card p-6 fade-in">
      <h2 className="text-lg font-semibold mb-4 dark:text-white">
        Balance Trend (Last 30 Days)
      </h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="#e5e7eb"
              className="dark:stroke-slate-700"
            />
            <XAxis
              dataKey="date"
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              className="dark:stroke-slate-400"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              stroke="#6b7280"
              className="dark:stroke-slate-400"
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#f3f4f6",
              }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="balance"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={false}
              name="Balance"
              isAnimationActive={true}
            />
          </LineChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No transaction data available
        </p>
      )}
    </div>
  );
};
