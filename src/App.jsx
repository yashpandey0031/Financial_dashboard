import { Navbar } from "./components/layout/Navbar";
import { Sidebar } from "./components/layout/Sidebar";
import { SummaryCards } from "./components/dashboard/SummaryCards";
import { BalanceTrend } from "./components/dashboard/BalanceTrend";
import { SpendingBreakdown } from "./components/dashboard/SpendingBreakdown";
import { TransactionTable } from "./components/transactions/TransactionTable";
import { InsightsSection } from "./components/insights/InsightsSection";
import { useEffect } from "react";
import { useStore } from "./store/store";

function App() {
  const { darkMode } = useStore();

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <div className={darkMode ? "dark" : ""}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 min-h-screen bg-gray-50 dark:bg-slate-900 p-4 md:p-8">
          <div className="max-w-7xl mx-auto">
            {/* Dashboard Section */}
            <div id="overview" className="space-y-8">
              <div>
                <h1 className="text-3xl font-bold dark:text-white mb-2">
                  Financial Overview
                </h1>
                <p className="text-gray-600 dark:text-gray-400">
                  Track your income and expenses at a glance
                </p>
              </div>

              <SummaryCards />

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <BalanceTrend />
                <SpendingBreakdown />
              </div>
            </div>

            {/* Transactions Section */}
            <div className="mt-12">
              <TransactionTable />
            </div>

            {/* Insights Section */}
            <div className="mt-12">
              <InsightsSection />
            </div>

            {/* Footer */}
            <footer className="mt-16 py-8 border-t border-gray-200 dark:border-slate-700 text-center text-gray-600 dark:text-gray-400 text-sm">
              <p>
                © 2024 Finance Dashboard. Built with React + Tailwind CSS +
                Recharts
              </p>
            </footer>
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;
