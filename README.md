# Financial Dashboard (React + Vite)

A modern financial dashboard built with React and Vite — featuring analytics cards, interactive charts, transaction management, role-based controls, and dark/light themes.

## Preview

| Light Theme                               | Dark Theme                              |
| ----------------------------------------- | --------------------------------------- |
| ![Light Dashboard](docs/images/light.png) | ![Dark Dashboard](docs/images/dark.png) |

## Overview

A clean, data-heavy dashboard UI focused on:

- Clear visual hierarchy for financial information
- Smooth interactions for filtering and role-based actions
- Modular component and stylesheet organization
- Light and dark theme support

## Tech Stack

- React 18
- Vite 5
- Recharts — charts
- Lucide React — icons
- Modular CSS under `src/styles`

## Getting Started

**Prerequisites:** Node.js 18+, npm

```bash
npm install       # Install dependencies
npm run dev       # Start development server
npm run build     # Build for production
npm run preview   # Preview production build
```

## Project Structure

State is managed via React Context. Components are organized by concern:

**Layout** — `Sidebar`, `Header`, `Greeting`  
**Cards** — `BalanceCard`, `SpendingLimitCard`, `MyCardsCard`, `MetricsCard`  
**Charts** — `BalanceTrendChart`, `SpendingBreakdownChart`  
**Transactions** — `RecentActivities` (search, filter, sort, add/delete)

Styles are split by domain (layout, cards, charts, activities, theme) and use a grid-based layout with full dark/light theme awareness.

## Features

- Dashboard cards for balances and metrics
- Balance Trend chart (orange bar chart)
- Spending Breakdown pie chart
- Recent Transactions:
  - Search, type filter, and sort options
  - Add / delete transactions (admin role only)
- Viewer / Admin role selector
- Dark / Light mode toggle
- Dropdowns close on outside click
- Custom scrollbar styling for overflow tables

## UI/UX Notes

- Strong card separation and spacing for scanability
- Consistent iconography and accent color usage throughout
- Smooth transitions on buttons, filters, and hover states
- High-contrast dark theme with improved sidebar icon visibility
- Reduced visual noise in charts — clean hover behavior, optional legend control
