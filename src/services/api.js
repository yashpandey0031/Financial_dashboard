// Mock API Service - Simulates backend API calls with realistic delays
import {
  mockTransactions as initialTransactions,
  INITIAL_BALANCE,
} from "../data/mockData";

// Simulate API delay
const API_DELAY = 300; // milliseconds

// In-memory database (persists during session)
let apiDatabase = {
  transactions: [...initialTransactions],
  initialBalance: INITIAL_BALANCE,
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export const apiService = {
  // Utility - Seed API data from persisted local state
  async seedTransactions(transactions = []) {
    await sleep(100);

    if (!Array.isArray(transactions)) {
      return {
        success: false,
        error: "Invalid transactions payload",
        data: null,
      };
    }

    apiDatabase.transactions = [...transactions];

    return {
      success: true,
      data: apiDatabase.transactions,
      message: "API store seeded successfully",
      timestamp: new Date().toISOString(),
    };
  },

  // GET - Retrieve all transactions
  async getTransactions() {
    await sleep(API_DELAY);
    return {
      success: true,
      data: apiDatabase.transactions,
      timestamp: new Date().toISOString(),
    };
  },

  // GET - Retrieve transactions with filters
  async getTransactionsFiltered(filters) {
    await sleep(API_DELAY);

    let filtered = [...apiDatabase.transactions];

    if (filters.type !== "all") {
      filtered = filtered.filter((t) => t.type === filters.type);
    }

    if (filters.category !== "all") {
      filtered = filtered.filter((t) => t.category === filters.category);
    }

    if (filters.searchTerm) {
      filtered = filtered.filter((t) =>
        t.description.toLowerCase().includes(filters.searchTerm.toLowerCase()),
      );
    }

    if (filters.dateRange?.start) {
      filtered = filtered.filter(
        (t) => new Date(t.date) >= new Date(filters.dateRange.start),
      );
    }

    if (filters.dateRange?.end) {
      filtered = filtered.filter(
        (t) => new Date(t.date) <= new Date(filters.dateRange.end),
      );
    }

    return {
      success: true,
      data: filtered,
      count: filtered.length,
      timestamp: new Date().toISOString(),
    };
  },

  // GET - Retrieve transaction by ID
  async getTransaction(id) {
    await sleep(API_DELAY);
    const transaction = apiDatabase.transactions.find((t) => t.id === id);

    if (!transaction) {
      return {
        success: false,
        error: `Transaction ${id} not found`,
        data: null,
      };
    }

    return {
      success: true,
      data: transaction,
      timestamp: new Date().toISOString(),
    };
  },

  // POST - Create new transaction
  async createTransaction(transaction) {
    await sleep(API_DELAY);

    const newId = Math.max(...apiDatabase.transactions.map((t) => t.id), 0) + 1;
    const newTransaction = {
      ...transaction,
      id: newId,
      createdAt: new Date().toISOString(),
    };

    apiDatabase.transactions.unshift(newTransaction);

    return {
      success: true,
      data: newTransaction,
      message: "Transaction created successfully",
      timestamp: new Date().toISOString(),
    };
  },

  // PUT - Update transaction
  async updateTransaction(id, updates) {
    await sleep(API_DELAY);

    const index = apiDatabase.transactions.findIndex((t) => t.id === id);
    if (index === -1) {
      return {
        success: false,
        error: `Transaction ${id} not found`,
        data: null,
      };
    }

    apiDatabase.transactions[index] = {
      ...apiDatabase.transactions[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return {
      success: true,
      data: apiDatabase.transactions[index],
      message: "Transaction updated successfully",
      timestamp: new Date().toISOString(),
    };
  },

  // DELETE - Delete transaction
  async deleteTransaction(id) {
    await sleep(API_DELAY);

    const index = apiDatabase.transactions.findIndex((t) => t.id === id);
    if (index === -1) {
      return {
        success: false,
        error: `Transaction ${id} not found`,
        data: null,
      };
    }

    const deleted = apiDatabase.transactions[index];
    apiDatabase.transactions.splice(index, 1);

    return {
      success: true,
      data: deleted,
      message: "Transaction deleted successfully",
      timestamp: new Date().toISOString(),
    };
  },

  // GET - Analytics data
  async getAnalytics() {
    await sleep(API_DELAY);

    const transactions = apiDatabase.transactions;
    const totalIncome = transactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.amount, 0);

    const totalExpenses = transactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.amount, 0);

    const byCategory = {};
    transactions
      .filter((t) => t.type === "expense")
      .forEach((t) => {
        byCategory[t.category] = (byCategory[t.category] || 0) + t.amount;
      });

    return {
      success: true,
      data: {
        totalIncome,
        totalExpenses,
        balance: apiDatabase.initialBalance + totalIncome - totalExpenses,
        transactionCount: transactions.length,
        byCategory,
      },
      timestamp: new Date().toISOString(),
    };
  },

  // GET - Transactions grouped by category
  async getTransactionsByCategory() {
    await sleep(API_DELAY);

    const grouped = {};
    apiDatabase.transactions.forEach((t) => {
      if (!grouped[t.category]) {
        grouped[t.category] = [];
      }
      grouped[t.category].push(t);
    });

    return {
      success: true,
      data: grouped,
      timestamp: new Date().toISOString(),
    };
  },

  // GET - Transactions grouped by date
  async getTransactionsByDate() {
    await sleep(API_DELAY);

    const grouped = {};
    apiDatabase.transactions.forEach((t) => {
      if (!grouped[t.date]) {
        grouped[t.date] = [];
      }
      grouped[t.date].push(t);
    });

    return {
      success: true,
      data: grouped,
      timestamp: new Date().toISOString(),
    };
  },

  // Utility - Get all categories
  async getCategories() {
    await sleep(100);
    const categories = [
      ...new Set(apiDatabase.transactions.map((t) => t.category)),
    ];
    return {
      success: true,
      data: categories,
      timestamp: new Date().toISOString(),
    };
  },

  // Utility - Get date range of transactions
  async getDateRange() {
    await sleep(100);
    if (apiDatabase.transactions.length === 0) {
      return {
        success: true,
        data: { start: null, end: null },
        timestamp: new Date().toISOString(),
      };
    }

    const dates = apiDatabase.transactions.map((t) => new Date(t.date));
    const start = new Date(Math.min(...dates)).toISOString().split("T")[0];
    const end = new Date(Math.max(...dates)).toISOString().split("T")[0];

    return {
      success: true,
      data: { start, end },
      timestamp: new Date().toISOString(),
    };
  },

  // Bulk operations
  async bulkDeleteTransactions(ids) {
    await sleep(API_DELAY * ids.length);

    apiDatabase.transactions = apiDatabase.transactions.filter(
      (t) => !ids.includes(t.id),
    );

    return {
      success: true,
      data: { deletedCount: ids.length },
      message: `${ids.length} transactions deleted successfully`,
      timestamp: new Date().toISOString(),
    };
  },

  // Reset to initial data
  async resetData() {
    await sleep(API_DELAY);
    apiDatabase.transactions = [...initialTransactions];

    return {
      success: true,
      data: { transactionCount: apiDatabase.transactions.length },
      message: "Data reset to initial state",
      timestamp: new Date().toISOString(),
    };
  },
};

export default apiService;
