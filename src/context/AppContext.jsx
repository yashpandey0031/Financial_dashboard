import React, { createContext, useMemo, useState } from "react";
import { activities as initialActivities, getStatusColor, getStatusIcon } from "../utils/dashboardData";

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [activities, setActivities] = useState(initialActivities);
  const [filters, setFilters] = useState({
    type: "All",
    sortBy: "Date",
    searchQuery: "",
  });
  const [userRole, setUserRole] = useState("viewer");

  const addTransaction = (transaction) => {
    setActivities((currentActivities) => [transaction, ...currentActivities]);
  };

  const deleteTransaction = (id) => {
    setActivities((currentActivities) =>
      currentActivities.filter((activity) => activity.id !== id)
    );
  };

  const filteredActivities = useMemo(() => {
    const sortedActivities = [...activities].sort((a, b) => {
      if (filters.sortBy === "Date") {
        return new Date(b.date) - new Date(a.date);
      }

      if (filters.sortBy === "Amount") {
        return b.amount - a.amount;
      }

      if (filters.sortBy === "Activity Name") {
        return a.activity.localeCompare(b.activity);
      }

      return 0;
    });

    return sortedActivities.filter((activity) => {
      const typeMatch =
        filters.type === "All" || activity.type === filters.type.toLowerCase();
      const searchQuery = filters.searchQuery.trim().toLowerCase();
      const searchMatch =
        searchQuery === "" ||
        activity.activity.toLowerCase().includes(searchQuery) ||
        activity.category.toLowerCase().includes(searchQuery) ||
        String(activity.id).toLowerCase().includes(searchQuery);

      return typeMatch && searchMatch;
    });
  }, [activities, filters]);

  return (
    <AppContext.Provider
      value={{
        activities: filteredActivities,
        filters,
        setFilters,
        userRole,
        setUserRole,
        addTransaction,
        deleteTransaction,
        getStatusColor,
        getStatusIcon,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};