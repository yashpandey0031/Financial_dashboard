export const Sidebar = () => {
  return (
    <aside className="hidden md:block w-64 bg-slate-800 text-white min-h-screen p-6 border-r border-slate-700">
      <div className="space-y-8">
        <div>
          <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wide mb-4">
            Menu
          </h2>
          <nav className="space-y-2">
            <a
              href="#overview"
              className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition text-sm"
            >
              📊 Overview
            </a>
            <a
              href="#transactions"
              className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition text-sm"
            >
              💳 Transactions
            </a>
            <a
              href="#insights"
              className="block px-4 py-2 rounded-lg hover:bg-slate-700 transition text-sm"
            >
              💡 Insights
            </a>
          </nav>
        </div>

        <div className="text-xs text-slate-400 space-y-2">
          <p className="font-semibold">Quick Stats</p>
          <p>• Your dashboard is up to date</p>
          <p>• All systems operational</p>
        </div>
      </div>
    </aside>
  );
};
