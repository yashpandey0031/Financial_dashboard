import React from "react";
import {
  Home,
  Activity,
  BarChart3,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

const Sidebar = () => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-icon">Z</div>
      </div>
      <nav className="sidebar-nav">
        <a href="#" className="nav-item active">
          <Home size={20} />
        </a>
        <a href="#" className="nav-item">
          <Activity size={20} />
        </a>
        <a href="#" className="nav-item">
          <BarChart3 size={20} />
        </a>
        <a href="#" className="nav-item">
          <Users size={20} />
        </a>
        <a href="#" className="nav-item">
          <Settings size={20} />
        </a>
      </nav>
      <button className="logout-btn">
        <LogOut size={20} />
      </button>
    </aside>
  );
};

export default Sidebar;
