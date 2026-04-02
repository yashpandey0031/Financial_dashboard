import { useState } from "react";
import { Download, ChevronDown, BarChart3 } from "lucide-react";
import { exportUtils } from "../../utils/export";

export const ExportPanel = ({ transactions }) => {
  const [showExportMenu, setShowExportMenu] = useState(false);
  const [showGrouping, setShowGrouping] = useState(false);

  const handleExportCSV = () => {
    const date = new Date().toISOString().split("T")[0];
    exportUtils.exportAsCSVWithDate(transactions);
    setShowExportMenu(false);
  };

  const handleExportJSON = () => {
    const date = new Date().toISOString().split("T")[0];
    exportUtils.exportAsJSONWithDate(transactions);
    setShowExportMenu(false);
  };

  const handleExportReport = () => {
    const date = new Date().toISOString().split("T")[0];
    exportUtils.exportSummaryReport(
      transactions,
      `summary_report_${date}.json`,
    );
    setShowExportMenu(false);
  };

  return (
    <div className="relative inline-block">
      {/* Export Button */}
      <button
        onClick={() => setShowExportMenu(!showExportMenu)}
        className="btn btn-secondary flex items-center gap-2"
        title="Export transactions"
      >
        <Download size={18} />
        Export
        <ChevronDown
          size={16}
          className={`transition-transform ${showExportMenu ? "rotate-180" : ""}`}
        />
      </button>

      {/* Export Menu */}
      {showExportMenu && (
        <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 z-40">
          <button
            onClick={handleExportCSV}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 first:rounded-t-lg text-sm"
          >
            📊 Export as CSV
          </button>
          <button
            onClick={handleExportJSON}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 text-sm"
          >
            📋 Export as JSON
          </button>
          <button
            onClick={handleExportReport}
            className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 last:rounded-b-lg text-sm"
          >
            📈 Export Report
          </button>
        </div>
      )}

      {/* Space */}
      <div className="inline-block w-2" />

      {/* Grouping Button */}
      <button
        onClick={() => setShowGrouping(!showGrouping)}
        className="btn btn-secondary flex items-center gap-2"
        title="Group and analyze"
      >
        <BarChart3 size={18} />
        Analytics
        <ChevronDown
          size={16}
          className={`transition-transform ${showGrouping ? "rotate-180" : ""}`}
        />
      </button>

      {/* Grouping Menu */}
      {showGrouping && (
        <div className="absolute top-full right-48 mt-2 w-56 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 z-40">
          <div className="px-4 py-3 border-b border-gray-200 dark:border-slate-700 text-sm font-semibold text-gray-700 dark:text-gray-300">
            Available Analytics
          </div>
          <a
            href="#insights"
            className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-slate-700 text-sm"
            onClick={() => setShowGrouping(false)}
          >
            📊 View Insights
          </a>
          <div className="px-4 py-2 text-xs text-gray-500 dark:text-gray-400">
            Grouped by Category, Month, and Type
          </div>
        </div>
      )}
    </div>
  );
};
