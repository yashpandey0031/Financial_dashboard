import { create } from "zustand";
import { persist } from "zustand/middleware";
import { mockTransactions, INITIAL_BALANCE } from "../data/mockData";

export const useStore = create(
  persist(
    (set) => ({
      // State
      transactions: mockTransactions,
      role: "viewer", // 'viewer' or 'admin'
      darkMode: false,
      filters: {
        type: "all", // 'all', 'income', 'expense'
        category: "all",
        searchTerm: "",
        dateRange: { start: null, end: null },
      },

      // Actions - Transactions
      addTransaction: (transaction) =>
        set((state) => ({
          transactions: [
            {
              ...transaction,
              id: Math.max(...state.transactions.map((t) => t.id), 0) + 1,
            },
            ...state.transactions,
          ],
        })),

      editTransaction: (id, updates) =>
        set((state) => ({
          transactions: state.transactions.map((t) =>
            t.id === id ? { ...t, ...updates } : t,
          ),
        })),

      deleteTransaction: (id) =>
        set((state) => ({
          transactions: state.transactions.filter((t) => t.id !== id),
        })),

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

      clearFilters: () =>
        set({
          filters: {
            type: "all",
            category: "all",
            searchTerm: "",
            dateRange: { start: null, end: null },
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
