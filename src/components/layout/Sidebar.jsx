export const Sidebar = () => {
  return (
    <aside className="hidden lg:block lg:w-64 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-700">
      <div className="sticky top-[5.5rem] h-[calc(100vh-5.5rem)] flex flex-col p-6 space-y-8">
        <div>
          <h2 className="text-sm font-semibold text-slate-900 dark:text-white uppercase tracking-wider">
            Navigation
          </h2>
          <nav className="mt-4 space-y-2">
            <a
              href="#overview"
              className="block px-4 py-2 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium"
            >
              Overview
            </a>
            <a
              href="#transactions"
              className="block px-4 py-2 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium"
            >
              Transactions
            </a>
            <a
              href="#insights"
              className="block px-4 py-2 rounded text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 text-sm font-medium"
            >
              Insights
            </a>
          </nav>
        </div>
      </div>
    </aside>
  );
};
