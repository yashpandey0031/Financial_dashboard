import React, { useState, useContext } from "react";
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
import { AppContext } from "./context/AppContext";
import {
  balanceTrendData,
  spendingBreakdownData,
  wallets,
} from "./utils/dashboardData";

// Developed by Yash Pandey (https://github.com/yashpandey0031)

const Dashboard = () => {
  const [showBalance, setShowBalance] = useState(true);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { userRole, setUserRole } = useContext(AppContext);

  return (
    <div className={`dashboard-container ${isDarkTheme ? "dark-theme" : ""}`}>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="main-content">
        {/* Header */}
        <Header isDarkTheme={isDarkTheme} setIsDarkTheme={setIsDarkTheme} />

        {/* Greeting Section */}
        <Greeting />

        {/* Main Grid */}
        <div className="dashboard-grid">
          {/* div one */}
          <div className="div1-panel">
            <div className="panel-slot">
              <BalanceCard
                showBalance={showBalance}
                setShowBalance={setShowBalance}
                wallets={wallets}
              />
            </div>
            <div className="panel-slot">
              <MetricsCard />
            </div>
            <div className="panel-slot">
              <SpendingLimitCard />
            </div>
            <div className="panel-slot">
              <SpendingBreakdownChart
                spendingBreakdownData={spendingBreakdownData}
              />
            </div>
          </div>

          {/* div two */}
          <div className="div2-panel">
            <BalanceTrendChart balanceTrendData={balanceTrendData} />
            <RecentActivities />
          </div>

          {/* div three */}
          <div className="div3-panel">
            <MyCardsCard />
          </div>
        </div>

        <footer className="project-credit">
          Developed by{" "}
          <a
            href="https://github.com/yashpandey0031"
            target="_blank"
            rel="noreferrer"
          >
            Yash Pandey
          </a>
        </footer>
      </div>
    </div>
  );
};

export default Dashboard;
