// Advanced filtering and grouping utilities
export const filterUtils = {
  // Group transactions by category
  groupByCategory(transactions) {
    const grouped = {};
    transactions.forEach((t) => {
      if (!grouped[t.category]) {
        grouped[t.category] = [];
      }
      grouped[t.category].push(t);
    });
    return grouped;
  },

  // Group transactions by date
  groupByDate(transactions) {
    const grouped = {};
    transactions.forEach((t) => {
      if (!grouped[t.date]) {
        grouped[t.date] = [];
      }
      grouped[t.date].push(t);
    });
    return grouped;
  },

  // Group transactions by month
  groupByMonth(transactions) {
    const grouped = {};
    transactions.forEach((t) => {
      const month = t.date.substring(0, 7); // YYYY-MM
      if (!grouped[month]) {
        grouped[month] = [];
      }
      grouped[month].push(t);
    });
    return grouped;
  },

  // Group transactions by type
  groupByType(transactions) {
    const grouped = { income: [], expense: [] };
    transactions.forEach((t) => {
      grouped[t.type].push(t);
    });
    return grouped;
  },

  // Group transactions by week
  groupByWeek(transactions) {
    const grouped = {};
    transactions.forEach((t) => {
      const date = new Date(t.date);
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay());
      const weekKey = startOfWeek.toISOString().split("T")[0];

      if (!grouped[weekKey]) {
        grouped[weekKey] = [];
      }
      grouped[weekKey].push(t);
    });
    return grouped;
  },

  // Get transactions within date range
  filterByDateRange(transactions, startDate, endDate) {
    return transactions.filter((t) => {
      const tDate = new Date(t.date);
      const start = new Date(startDate);
      const end = new Date(endDate);
      return tDate >= start && tDate <= end;
    });
  },

  // Get transactions by amount range
  filterByAmountRange(transactions, minAmount, maxAmount) {
    return transactions.filter(
      (t) => t.amount >= minAmount && t.amount <= maxAmount,
    );
  },

  // Get transactions for a specific month
  filterByMonth(transactions, yearMonth) {
    return transactions.filter((t) => t.date.startsWith(yearMonth));
  },

  // Get spending categories ranked by total amount
  getRankedCategories(transactions) {
    const categoryTotals = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        categoryTotals[t.category] =
          (categoryTotals[t.category] || 0) + t.amount;
      });

    return Object.entries(categoryTotals)
      .map(([category, total]) => ({
        category,
        total,
        count: transactions.filter((t) => t.category === category).length,
      }))
      .sort((a, b) => b.total - a.total);
  },

  // Get average transaction amount
  getAverageAmount(transactions) {
    if (transactions.length === 0) return 0;
    const total = transactions.reduce((sum, t) => sum + t.amount, 0);
    return (total / transactions.length).toFixed(2);
  },

  // Get transactions above average
  getAboveAverageTransactions(transactions) {
    const average = parseFloat(this.getAverageAmount(transactions));
    return transactions.filter((t) => t.amount > average);
  },

  // Get transactions below average
  getBelowAverageTransactions(transactions) {
    const average = parseFloat(this.getAverageAmount(transactions));
    return transactions.filter((t) => t.amount < average);
  },

  // Find duplicate descriptions
  findDuplicates(transactions) {
    const descriptions = {};
    return transactions.filter((t) => {
      if (descriptions[t.description]) {
        return true;
      }
      descriptions[t.description] = true;
      return false;
    });
  },

  // Get top spenders by amount
  getTopTransactions(transactions, n = 10) {
    return [...transactions].sort((a, b) => b.amount - a.amount).slice(0, n);
  },

  // Get largest expenses
  getLargestExpenses(transactions, n = 10) {
    return this.getTopTransactions(
      transactions.filter((t) => t.type === "expense"),
      n,
    );
  },

  // Get largest incomes
  getLargestIncomes(transactions, n = 10) {
    return this.getTopTransactions(
      transactions.filter((t) => t.type === "income"),
      n,
    );
  },

  // Calculate spending by category for a date range
  spendingByCategory(transactions, startDate, endDate) {
    const filtered = this.filterByDateRange(transactions, startDate, endDate);
    const spending = {};

    filtered
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        spending[t.category] = (spending[t.category] || 0) + t.amount;
      });

    return Object.entries(spending)
      .map(([category, amount]) => ({ category, amount }))
      .sort((a, b) => b.amount - a.amount);
  },

  // Get spending trends (day over day change)
  getSpendingTrend(transactions, type = "expense") {
    const byDate = this.groupByDate(
      transactions.filter((t) => t.type === type),
    );
    const dates = Object.keys(byDate).sort();

    return dates.map((date) => ({
      date,
      amount: byDate[date].reduce((sum, t) => sum + t.amount, 0),
      count: byDate[date].length,
    }));
  },

  // Find transactions in a specific category for a date range
  categorySpendingInPeriod(transactions, category, startDate, endDate) {
    return this.filterByDateRange(transactions, startDate, endDate).filter(
      (t) => t.category === category,
    );
  },

  // Get monthly summary
  getMonthlySummary(transactions) {
    const byMonth = this.groupByMonth(transactions);

    return Object.entries(byMonth)
      .map(([month, monthTransactions]) => ({
        month,
        income: monthTransactions
          .filter((t) => t.type === "income")
          .reduce((sum, t) => sum + t.amount, 0),
        expenses: monthTransactions
          .filter((t) => t.type === "expense")
          .reduce((sum, t) => sum + t.amount, 0),
        net: monthTransactions.reduce((sum, t) => {
          return t.type === "income" ? sum + t.amount : sum - t.amount;
        }, 0),
        count: monthTransactions.length,
      }))
      .sort((a, b) => b.month.localeCompare(a.month));
  },
};

export default filterUtils;
