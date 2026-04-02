import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockTransactions, INITIAL_BALANCE } from "../data/mockData";
import { apiService } from "../services/api";

export const useStore = create(
  persist(
    (set, get) => ({
      // State
      transactions: mockTransactions,
      role: "viewer", // 'viewer' or 'admin'
      darkMode: false,
      isLoading: false,
      error: null,
      apiSynced: false,
      filters: {
        type: "all", // 'all', 'income', 'expense'
        category: "all",
        searchTerm: "",
        dateRange: { start: null, end: null },
        amountRange: { min: "", max: "" },
        groupBy: "none", // 'none', 'category', 'date', 'month', 'type'
      },

      syncApiFromLocal: async () => {
        if (get().apiSynced) return;

        set({ isLoading: true, error: null });
        try {
          const response = await apiService.seedTransactions(
            get().transactions,
          );
          if (!response.success) {
            throw new Error(response.error || "Failed to sync API data");
          }
          set({ apiSynced: true, isLoading: false });
        } catch (err) {
          set({ error: err.message || "API sync failed", isLoading: false });
        }
      },

      // Actions - Transactions
      addTransaction: async (transaction) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiService.createTransaction(transaction);
          if (!response.success) {
            throw new Error(response.error || "Failed to add transaction");
          }
          set((state) => ({
            transactions: [response.data, ...state.transactions],
            isLoading: false,
          }));
          return { success: true };
        } catch (err) {
          set({
            error: err.message || "Failed to add transaction",
            isLoading: false,
          });
          return { success: false, error: err.message };
        }
      },

      editTransaction: async (id, updates) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiService.updateTransaction(id, updates);
          if (!response.success) {
            throw new Error(response.error || "Failed to update transaction");
          }
          set((state) => ({
            transactions: state.transactions.map((t) =>
              t.id === id ? response.data : t,
            ),
            isLoading: false,
          }));
          return { success: true };
        } catch (err) {
          set({
            error: err.message || "Failed to update transaction",
            isLoading: false,
          });
          return { success: false, error: err.message };
        }
      },

      deleteTransaction: async (id) => {
        set({ isLoading: true, error: null });
        try {
          const response = await apiService.deleteTransaction(id);
          if (!response.success) {
            throw new Error(response.error || "Failed to delete transaction");
          }
          set((state) => ({
            transactions: state.transactions.filter((t) => t.id !== id),
            isLoading: false,
          }));
          return { success: true };
        } catch (err) {
          set({
            error: err.message || "Failed to delete transaction",
            isLoading: false,
          });
          return { success: false, error: err.message };
        }
      },

      // Actions - Role
      setRole: (role) => set({ role }),

      // Actions - Filters
      setFilterType: (type) =>
        set((state) => ({
          filters: { ...state.filters, type },
        })),

      setFilterCategory: (category) =>
        set((state) => ({
          filters: { ...state.filters, category },
        })),

      setSearchTerm: (searchTerm) =>
        set((state) => ({
          filters: { ...state.filters, searchTerm },
        })),

      setDateRange: (startDate, endDate) =>
        set((state) => ({
          filters: {
            ...state.filters,
            dateRange: { start: startDate, end: endDate },
          },
        })),

      setAmountRange: (min, max) =>
        set((state) => ({
          filters: {
            ...state.filters,
            amountRange: { min, max },
          },
        })),

      setGroupBy: (groupBy) =>
        set((state) => ({
          filters: {
            ...state.filters,
            groupBy,
          },
        })),

      clearError: () => set({ error: null }),

      clearFilters: () =>
        set({
          filters: {
            type: "all",
            category: "all",
            searchTerm: "",
            dateRange: { start: null, end: null },
            amountRange: { min: "", max: "" },
            groupBy: "none",
          },
        }),

      // Actions - UI
      toggleDarkMode: () => set((state) => ({ darkMode: !state.darkMode })),

      // Selectors / Getters
      getFilteredTransactions: () => {
        return (transactions, filters) => {
          return transactions.filter((t) => {
            if (filters.type !== "all" && t.type !== filters.type) return false;
            if (filters.category !== "all" && t.category !== filters.category)
              return false;
            if (
              filters.searchTerm &&
              !t.description
                .toLowerCase()
                .includes(filters.searchTerm.toLowerCase())
            )
              return false;
            if (
              filters.dateRange.start &&
              new Date(t.date) < new Date(filters.dateRange.start)
            )
              return false;
            if (
              filters.dateRange.end &&
              new Date(t.date) > new Date(filters.dateRange.end)
            )
              return false;
            return true;
          });
        };
      },

      getTotalBalance: () => {
        return (transactions, initialBalance) => {
          const sum = transactions.reduce((acc, t) => {
            return t.type === "income" ? acc + t.amount : acc - t.amount;
          }, 0);
          return initialBalance + sum;
        };
      },

      getTotalIncome: () => {
        return (transactions) => {
          return transactions
            .filter((t) => t.type === "income")
            .reduce((sum, t) => sum + t.amount, 0);
        };
      },

      getTotalExpenses: () => {
        return (transactions) => {
          return transactions
            .filter((t) => t.type === "expense")
            .reduce((sum, t) => sum + t.amount, 0);
        };
      },

      getCategoryBreakdown: () => {
        return (transactions) => {
          const breakdown = {};
          transactions
            .filter((t) => t.type === "expense")
            .forEach((t) => {
              breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
            });
          return Object.entries(breakdown).map(([name, value]) => ({
            name,
            value,
          }));
        };
      },

      getTrendData: () => {
        return (transactions, initialBalance) => {
          const dailyData = {};
          let running = initialBalance;

          transactions
            .slice()
            .reverse()
            .forEach((t) => {
              const date = t.date;
              if (!dailyData[date]) {
                dailyData[date] = running;
              }
              running =
                t.type === "income" ? running + t.amount : running - t.amount;
            });

          return Object.entries(dailyData).map(([date, balance]) => ({
            date,
            balance,
          }));
        };
      },

      getHighestSpendingCategory: () => {
        return (transactions) => {
          const breakdown = {};
          transactions
            .filter((t) => t.type === "expense")
            .forEach((t) => {
              breakdown[t.category] = (breakdown[t.category] || 0) + t.amount;
            });

          if (Object.keys(breakdown).length === 0) return null;

          return Object.entries(breakdown).reduce(
            (max, [cat, amt]) =>
              amt > max.amount ? { category: cat, amount: amt } : max,
            { category: "", amount: 0 },
          );
        };
      },
    }),
    {
      name: "finance-dashboard-store",
      partialize: (state) => ({
        transactions: state.transactions,
        darkMode: state.darkMode,
        role: state.role,
      }),
    },
  ),
);
