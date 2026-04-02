import { Moon, Sun } from "lucide-react";
import { useStore } from "../../store/store";

export const Navbar = () => {
  const { darkMode, toggleDarkMode, role, setRole } = useStore();

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200 bg-white dark:border-slate-700 dark:bg-slate-900">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-white font-bold">
            F
          </div>
          <h1 className="text-lg font-bold text-slate-900 dark:text-white">
            Finance
          </h1>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4">
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="rounded px-3 py-1.5 text-sm font-medium bg-slate-100 text-slate-900 dark:bg-slate-800 dark:text-white border border-slate-300 dark:border-slate-600"
          >
            <option value="viewer">Viewer</option>
            <option value="admin">Admin</option>
          </select>

          <button
            onClick={toggleDarkMode}
            className="p-1.5 rounded hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
          >
            {darkMode ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </div>
      </div>
    </header>
  );
};
