import { Moon, Sun, CircleDot } from "lucide-react";
import { useStore } from "../../store/store";

export const Navbar = () => {
  const { darkMode, toggleDarkMode, role, setRole } = useStore();

  return (
    <header className="sticky top-0 z-40 border-b border-white/60 bg-white/80 backdrop-blur-xl dark:border-white/20 dark:bg-black/75">
      <div className="mx-auto flex w-full max-w-[1600px] flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-teal-500 text-white shadow-lg shadow-orange-400/30">
            <CircleDot size={26} />
          </div>

          <div>
            <p className="section-kicker">Portfolio analytics</p>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">
              Finance Summary Dashboard
            </h1>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className="chip-solid bg-teal-500/15 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300">
            Live data
          </span>

          <label className="chip">
            Role
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-transparent text-sm font-semibold text-slate-700 outline-none dark:text-slate-200"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>
          </label>

          <button
            onClick={toggleDarkMode}
            className="chip-solid bg-slate-900 text-white transition hover:-translate-y-0.5 hover:bg-slate-800 dark:bg-slate-100 dark:text-slate-900 dark:hover:bg-white"
            title="Toggle dark mode"
          >
            {darkMode ? <Sun size={16} /> : <Moon size={16} />}
            {darkMode ? "Light" : "Dark"}
          </button>

          <div className="flex items-center gap-2 rounded-2xl border border-orange-200/70 bg-orange-50/80 px-2.5 py-1.5 shadow-sm dark:border-orange-500/30 dark:bg-orange-500/10">
            <div className="relative flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-orange-500 to-teal-500 text-sm font-bold text-white">
              YS
              <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border border-white bg-emerald-400 dark:border-slate-900" />
            </div>
            <div className="hidden sm:block">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-100">
                Your workspace
              </p>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                demo@dashboard.local
              </p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
