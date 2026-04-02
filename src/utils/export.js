// Export utilities for CSV and JSON formats
export const exportUtils = {
  // Export transactions as CSV
  exportAsCSV(transactions, filename = "transactions.csv") {
    if (!transactions || transactions.length === 0) {
      alert("No transactions to export");
      return;
    }

    // CSV headers
    const headers = ["ID", "Date", "Description", "Category", "Amount", "Type"];

    // CSV rows
    const rows = transactions.map((t) => [
      t.id,
      t.date,
      `"${t.description}"`, // Quote to handle commas in description
      t.category,
      t.amount,
      t.type,
    ]);

    // Combine headers and rows
    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    // Add BOM for Excel compatibility
    const BOM = "\uFEFF";
    const blob = new Blob([BOM + csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    // Create download link
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Export transactions as JSON
  exportAsJSON(transactions, filename = "transactions.json") {
    if (!transactions || transactions.length === 0) {
      alert("No transactions to export");
      return;
    }

    const data = {
      exportDate: new Date().toISOString(),
      transactionCount: transactions.length,
      transactions: transactions,
      summary: {
        totalIncome: transactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0),
        totalExpenses: transactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0),
        categories: [...new Set(transactions.map((t) => t.category))],
      },
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },

  // Export with custom filename and date
  exportAsCSVWithDate(transactions) {
    const date = new Date().toISOString().split("T")[0];
    this.exportAsCSV(transactions, `transactions_${date}.csv`);
  },

  exportAsJSONWithDate(transactions) {
    const date = new Date().toISOString().split("T")[0];
    this.exportAsJSON(transactions, `transactions_${date}.json`);
  },

  // Export filtered summary report
  exportSummaryReport(transactions, filename = "summary_report.json") {
    if (!transactions || transactions.length === 0) {
      alert("No transactions to export");
      return;
    }

    const byCategory = {};
    const byType = { income: 0, expense: 0 };
    const byMonth = {};

    transactions.forEach((t) => {
      // By category
      byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;

      // By type
      byType[t.type] += t.amount;

      // By month
      const month = t.date.substring(0, 7); // YYYY-MM
      if (!byMonth[month]) {
        byMonth[month] = { income: 0, expense: 0 };
      }
      byMonth[month][t.type] += t.amount;
    });

    const report = {
      generatedDate: new Date().toISOString(),
      periodStart: transactions[transactions.length - 1]?.date,
      periodEnd: transactions[0]?.date,
      totalTransactions: transactions.length,
      byType,
      byCategory,
      byMonth,
      topCategories: Object.entries(byCategory)
        .sort(([, a], [, b]) => b - a)
        .slice(0, 5)
        .map(([name, amount]) => ({ category: name, amount })),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], {
      type: "application/json",
    });

    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", filename);
    link.style.visibility = "hidden";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  },
};

export default exportUtils;
