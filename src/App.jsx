import { Navbar } from "./components/layout/Navbar";
import { SummaryCards } from "./components/dashboard/SummaryCards";
import { BalanceTrend } from "./components/dashboard/BalanceTrend";
import { SpendingBreakdown } from "./components/dashboard/SpendingBreakdown";
import { TransactionTable } from "./components/transactions/TransactionTable";
import { InsightsSection } from "./components/insights/InsightsSection";
import { useEffect, useState } from "react";
import { useStore } from "./store/store";

function App() {
  const { darkMode, syncApiFromLocal } = useStore();
  const [activeTab, setActiveTab] = useState("overview");
  const [expandedSections, setExpandedSections] = useState({
    transactions: false,
    insights: false,
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    syncApiFromLocal();
  }, [syncApiFromLocal]);

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <Navbar />

      <div className="min-h-screen bg-white dark:bg-slate-950">
        {/* Tab Navigation */}
        <div className="border-b border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900">
          <div className="mx-auto max-w-7xl">
            <div className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab("overview")}
                className={`py-4 font-medium text-sm transition border-b-2 ${
                  activeTab === "overview"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300"
                }`}
              >
                Overview
              </button>
              <button
                onClick={() => setActiveTab("transactions")}
                className={`py-4 font-medium text-sm transition border-b-2 ${
                  activeTab === "transactions"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300"
                }`}
              >
                Transactions
              </button>
              <button
                onClick={() => setActiveTab("insights")}
                className={`py-4 font-medium text-sm transition border-b-2 ${
                  activeTab === "insights"
                    ? "border-blue-600 text-blue-600"
                    : "border-transparent text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-300"
                }`}
              >
                Insights
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <main className="mx-auto max-w-7xl px-6 py-8">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Overview
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Summary of your financial activity
                </p>
              </div>

              {/* Summary Cards */}
              <div>
                <SummaryCards />
              </div>

              {/* Charts Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <BalanceTrend />
                <SpendingBreakdown />
              </div>

              {/* Collapsible Transactions Preview */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection("transactions")}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Recent Transactions
                  </h3>
                  <span className="text-slate-500 dark:text-slate-400">
                    {expandedSections.transactions ? "−" : "+"}
                  </span>
                </button>
                {expandedSections.transactions && (
                  <div className="p-6 border-t border-slate-200 dark:border-slate-700">
                    <TransactionTable showLimit={5} />
                  </div>
                )}
              </div>

              {/* Collapsible Insights Preview */}
              <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden">
                <button
                  onClick={() => toggleSection("insights")}
                  className="w-full px-6 py-4 bg-slate-50 dark:bg-slate-800 flex items-center justify-between hover:bg-slate-100 dark:hover:bg-slate-700 transition"
                >
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    Key Insights
                  </h3>
                  <span className="text-slate-500 dark:text-slate-400">
                    {expandedSections.insights ? "−" : "+"}
                  </span>
                </button>
                {expandedSections.insights && (
                  <div className="p-6 border-t border-slate-200 dark:border-slate-700">
                    <InsightsSection />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Transactions Tab */}
          {activeTab === "transactions" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  All Transactions
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  View and manage all your financial transactions
                </p>
              </div>
              <TransactionTable />
            </div>
          )}

          {/* Insights Tab */}
          {activeTab === "insights" && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                  Insights
                </h2>
                <p className="text-slate-600 dark:text-slate-400">
                  Data-driven insights about your spending
                </p>
              </div>
              <InsightsSection />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
