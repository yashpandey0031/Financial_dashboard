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
  const { darkMode, syncApiFromLocal } = useStore();

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

  return (
    <div className={`dashboard-shell ${darkMode ? "dark" : ""}`}>
      <Navbar />
      <div className="flex">
        <Sidebar />
        <main className="dashboard-surface flex-1 min-h-screen px-4 py-6 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-[1600px] space-y-6">
            <section id="overview" className="py-4">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                Finance Dashboard
              </h1>
              <p className="text-slate-600 dark:text-slate-300">
                Track your income, expenses, and spending patterns at a glance.
              </p>
            </section>

            <SummaryCards />

            <section className="grid grid-cols-1 gap-6 xl:grid-cols-[1.25fr_0.95fr]">
              <BalanceTrend />
              <SpendingBreakdown />
            </section>

            <div className="grid grid-cols-1 gap-6">
              <TransactionTable />
              <InsightsSection />
            </div>

            <footer className="pb-24 lg:pb-6 text-center text-sm text-slate-500 dark:text-slate-400">
              <p>Built with React, Tailwind CSS, Recharts, and Zustand.</p>
            </footer>
          </div>

          <nav className="fixed bottom-3 left-1/2 z-50 flex w-[calc(100%-1.5rem)] max-w-md -translate-x-1/2 items-center justify-between rounded-2xl border border-orange-200/70 bg-white/90 px-2 py-2 shadow-xl backdrop-blur lg:hidden dark:border-white/20 dark:bg-black/85">
            <a
              href="#overview"
              className="flex-1 rounded-xl px-2 py-2 text-center text-xs font-semibold text-orange-700 dark:text-orange-300"
            >
              Overview
            </a>
            <a
              href="#transactions"
              className="flex-1 rounded-xl bg-slate-900 px-2 py-2 text-center text-xs font-semibold text-white dark:bg-slate-100 dark:text-slate-900"
            >
              Transactions
            </a>
            <a
              href="#insights"
              className="flex-1 rounded-xl px-2 py-2 text-center text-xs font-semibold text-teal-700 dark:text-teal-300"
            >
              Insights
            </a>
          </nav>
        </main>
      </div>
    </div>
  );
}

export default App;
