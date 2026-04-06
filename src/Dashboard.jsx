import React, { useState } from "react";
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Greeting from "./components/Greeting";
import BalanceCard from "./components/BalanceCard";
import SpendingLimitCard from "./components/SpendingLimitCard";
import MyCardsCard from "./components/MyCardsCard";
import MetricsCard from "./components/MetricsCard";
import BalanceTrendChart from "./components/BalanceTrendChart";
import SpendingBreakdownChart from "./components/SpendingBreakdownChart";
import RecentActivities from "./components/RecentActivities";
import {
  balanceTrendData,
  spendingBreakdownData,
  wallets,
  activities,
  getStatusColor,
  getStatusIcon,
} from "./utils/dashboardData";

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const [userRole, setUserRole] = useState("viewer"); // "viewer" or "admin"

  return (
    <div className={`dashboard-container ${isDarkTheme ? "dark-theme" : ""}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <Header
          isDarkTheme={isDarkTheme}
          setIsDarkTheme={setIsDarkTheme}
          userRole={userRole}
          setUserRole={setUserRole}
        />

        {/* Greeting Section */}
        <Greeting />

        {/* Main Grid */}
        <div className="dashboard-grid">
          {/* Left Column */}
          <div className="left-column">
            <BalanceCard
              showBalance={showBalance}
              setShowBalance={setShowBalance}
              wallets={wallets}
            />
            <SpendingLimitCard />
            <MyCardsCard />
          </div>

          {/* Right Column */}
          <div className="right-column">
            <MetricsCard />
            <BalanceTrendChart balanceTrendData={balanceTrendData} />
            <SpendingBreakdownChart
              spendingBreakdownData={spendingBreakdownData}
            />
            <RecentActivities
              activities={activities}
              getStatusColor={getStatusColor}
              getStatusIcon={getStatusIcon}
              userRole={userRole}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
