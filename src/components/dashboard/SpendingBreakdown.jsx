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
  "#ef4444",
  "#f97316",
  "#eab308",
  "#84cc16",
  "#22c55e",
  "#06b6d4",
  "#0ea5e9",
  "#8b5cf6",
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
    <div className="card p-6 fade-in" style={{ animationDelay: "0.1s" }}>
      <h2 className="text-lg font-semibold mb-4 dark:text-white">
        Spending Breakdown by Category
      </h2>
      {data.length > 0 ? (
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: $${value}`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
              animationBegin={0}
              animationDuration={400}
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
                backgroundColor: "#1f2937",
                border: "1px solid #374151",
                borderRadius: "8px",
                color: "#f3f4f6",
              }}
              formatter={(value) => `$${value.toLocaleString()}`}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <p className="text-gray-500 dark:text-gray-400 text-center py-8">
          No expense data available
        </p>
      )}
    </div>
  );
};
