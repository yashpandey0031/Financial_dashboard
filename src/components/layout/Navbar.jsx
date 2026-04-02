import { useState } from "react";
import { Menu, X, Moon, Sun } from "lucide-react";
import { useStore } from "../../store/store";

export const Navbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { darkMode, toggleDarkMode, role, setRole } = useStore();

  const toggleDarkMode_ = () => {
    toggleDarkMode();
    document.documentElement.classList.toggle("dark");
  };

  return (
    <>
      <nav className="bg-slate-900 text-white shadow-lg sticky top-0 z-40">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden p-2 hover:bg-slate-800 rounded"
            >
              {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
            <h1 className="text-2xl font-bold">💰 Finance Dashboard</h1>
          </div>

          <div className="flex items-center gap-4">
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="bg-slate-800 text-white px-3 py-1 rounded border border-slate-700 text-sm cursor-pointer hover:bg-slate-700"
            >
              <option value="viewer">Viewer</option>
              <option value="admin">Admin</option>
            </select>

            <button
              onClick={toggleDarkMode_}
              className="p-2 hover:bg-slate-800 rounded transition"
              title="Toggle dark mode"
            >
              {darkMode ? <Sun size={20} /> : <Moon size={20} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 md:hidden z-30"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </>
  );
};
