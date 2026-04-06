import React, { useContext, useEffect, useRef, useState } from "react";
import { Search, Bell, Settings, ChevronDown, Moon, Sun } from "lucide-react";
import { AppContext } from "../context/AppContext";

const Header = ({ isDarkTheme, setIsDarkTheme }) => {
  const { userRole, setUserRole } = useContext(AppContext);
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const roleSelectorRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        roleSelectorRef.current &&
        !roleSelectorRef.current.contains(event.target)
      ) {
        setShowRoleMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-left">
        <h1 className="brand">Zorvyn</h1>
      </div>
      <nav className="header-nav">
        <a href="#" className="nav-link active">
          Overview
        </a>
        <a href="#" className="nav-link">
          Activity
        </a>
        <a href="#" className="nav-link">
          Manage
        </a>
        <a href="#" className="nav-link">
          Program
        </a>
        <a href="#" className="nav-link">
          Account
        </a>
        <a href="#" className="nav-link">
          Reports
        </a>
      </nav>
      <div className="header-right">
        <div className="role-selector" ref={roleSelectorRef}>
          <button
            type="button"
            className="role-dropdown"
            onClick={() => setShowRoleMenu((current) => !current)}
          >
            <span>{userRole === "admin" ? "Admin" : "Viewer"}</span>
            <ChevronDown size={14} />
          </button>
          {showRoleMenu && (
            <div className="role-menu">
              <button
                type="button"
                className={`role-option ${userRole === "viewer" ? "active" : ""}`}
                onClick={() => {
                  setUserRole("viewer");
                  setShowRoleMenu(false);
                }}
              >
                Viewer
              </button>
              <button
                type="button"
                className={`role-option ${userRole === "admin" ? "active" : ""}`}
                onClick={() => {
                  setUserRole("admin");
                  setShowRoleMenu(false);
                }}
              >
                Admin
              </button>
            </div>
          )}
        </div>
        <button
          className="icon-btn"
          onClick={() => setIsDarkTheme(!isDarkTheme)}
        >
          {isDarkTheme ? <Sun size={20} /> : <Moon size={20} />}
        </button>
        <button className="icon-btn">
          <Search size={20} />
        </button>
        <button className="icon-btn">
          <Bell size={20} />
        </button>
        <button className="icon-btn">
          <Settings size={20} />
        </button>
        <div className="user-profile">
          <div className="avatar">YP</div>
          <div className="user-info">
            <p className="user-name">Yash Pandey</p>
            <p className="user-email">@yash_pandey</p>
          </div>
          <ChevronDown size={16} />
        </div>
      </div>
    </header>
  );
};

export default Header;
