# Finance Dashboard UI

A modern, interactive finance dashboard built with React, Tailwind CSS, and Recharts. Track your income, expenses, and financial insights with an intuitive, responsive interface.

## Features

### Core Features

- **Dashboard Overview**: View total balance, income, and expenses at a glance
- **Balance Trend Chart**: Visualize your balance changes over the last 30 days with an interactive line chart
- **Spending Breakdown**: Pie chart showing expense distribution by category
- **Transaction Table**: Complete transaction history with sorting and filtering
- **Search & Filter**: Filter by transaction type, category, and search by description
- **Role-Based UI**: Admin can add/edit/delete transactions; Viewer can only view data
- **Insights Panel**: High-level financial analytics including:
  - Highest spending category
  - Month-over-month spending comparison
  - Average daily spending
  - Total transaction count

### Additional Features

- **Dark Mode**: Toggle between light and dark themes with persistent state
- **Responsive Design**: Fully responsive layout for mobile, tablet, and desktop
- **LocalStorage Persistence**: Transactions are saved to browser storage
- **Empty States**: Graceful handling when no data matches filters
- **Smooth Animations**: Fade-in effects and smooth transitions throughout
- **Accessible UI**: Semantic HTML and proper form validation

## Tech Stack

- **React 18**: UI library for building interactive components
- **Vite**: Fast build tool and development server
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Recharts**: React charting library for data visualization
- **Zustand**: Lightweight state management library
- **Lucide React**: Beautiful SVG icon library

## Project Structure

```
src/
├── components/
│   ├── layout/
│   │   ├── Navbar.jsx         # Top navigation with dark mode toggle
│   │   └── Sidebar.jsx         # Sidebar navigation
│   ├── dashboard/
│   │   ├── SummaryCards.jsx    # Three summary cards (Balance, Income, Expenses)
│   │   ├── BalanceTrend.jsx    # Line chart showing balance over time
│   │   └── SpendingBreakdown.jsx # Pie chart of spending by category
│   ├── transactions/
│   │   ├── TransactionTable.jsx # Table with filters and sorting
│   │   └── TransactionModal.jsx # Add/edit transaction form
│   └── insights/
│       └── InsightsSection.jsx  # Insights and analytics cards
├── store/
│   └── store.js               # Zustand state management
├── data/
│   └── mockData.js            # Mock transaction data
├── App.jsx                    # Main app component
├── main.jsx                   # Entry point
└── index.css                  # Global styles
```

## Setup Instructions

### Prerequisites

- Node.js 16+ and npm/yarn installed

### Installation

1. **Clone or navigate to the project directory**

   ```bash
   cd finance-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   ```

   The dashboard will open at `http://localhost:5173`

4. **Build for production**
   ```bash
   npm run build
   ```

## Usage Guide

### Role-Based Access

- **Viewer Mode** (default): View-only access to all data
- **Admin Mode**: Full access including ability to add, edit, and delete transactions
  - Switch roles using the dropdown in the navbar

### Adding a Transaction (Admin Only)

1. Click the "Add Transaction" button
2. Fill in the date, description, category, and amount
3. Select transaction type (Income/Expense)
4. Click "Add Transaction"

### Filtering & Searching

- Filter by transaction type (Income/Expense)
- Search by description using the search box
- Click column headers to sort by date, amount, or category
- Clear all filters with the "Clear Filters" button

### Toggling Dark Mode

- Click the moon/sun icon in the top-right navbar

## State Management Approach

Using **Zustand** for lightweight, efficient state management:

- **Transactions**: Array of all transactions
- **Role**: Current user role (viewer/admin)
- **Filters**: Active filters and search terms
- **Dark Mode**: Theme preference
- **Actions**: Mutations for adding, editing, and deleting transactions

All state is managed in `src/store/store.js` with clear action creators.

## Mock Data

The dashboard comes pre-populated with 40 realistic transactions spanning 3 months across 8 categories:

- **Income**: Salary, Freelance
- **Expenses**: Food, Transport, Entertainment, Rent, Utilities, Shopping

Data is generated dynamically each session but can be easily modified in `src/data/mockData.js`.

## Key Design Decisions

1. **Component Architecture**: Modular, reusable components following React best practices
2. **State Management**: Zustand chosen for simplicity and performance over Redux
3. **Styling**: Tailwind CSS for rapid development and consistency
4. **Charts**: Recharts for accessible, responsive data visualization
5. **Icons**: Lucide React for clean, consistent SVG icons
6. **Responsiveness**: Mobile-first approach with Tailwind breakpoints

## Performance Features

- Efficient filtering and sorting without re-rendering entire lists
- Memoized chart components
- Smooth animations using CSS transitions
- Lightweight dependencies (Zustand is ~2kb minified)

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## Future Enhancements

- Export transactions to CSV/JSON
- Advanced filtering with date range picker
- Budget goals and alerts
- Multi-currency support
- API integration with real backend
- User authentication
- Data backup and sync
- Recurring transaction templates
- Receipt/document attachments

## Development Notes

- The dashboard uses mock data for demonstration
- All transactions are stored in browser memory (cleared on refresh)
- Dark mode preference is stored in localStorage
- Easy to integrate with a real API by updating the store actions

## Troubleshooting

**Dark mode not persisting**: Clear browser cookies/storage
**Charts not rendering**: Ensure Recharts is properly installed (`npm install recharts`)
**Styles not applying**: Check that Tailwind CSS is properly configured in `tailwind.config.js`

## License

Open source project for educational purposes.

## Contact & Support

Built as a demonstration of modern React development practices using industry-standard tools and patterns.
