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
    <div className="min-h-screen bg-white dark:bg-slate-950 flex items-center justify-center">
      <h1 className="text-6xl font-bold text-slate-900 dark:text-white">
        Dashboard
      </h1>
    </div>
  );
}

export default App;
