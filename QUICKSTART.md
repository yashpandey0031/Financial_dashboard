# Quick Start Guide

## 🚀 Getting Started in 3 Steps

### Step 1: Install Dependencies

```bash
npm install
```

### Step 2: Start Development Server

```bash
npm run dev
```

Open `http://localhost:5173` in your browser

### Step 3: Explore the Dashboard

- View summary cards and charts
- Look at transactions
- Switch between Viewer and Admin roles
- Toggle dark mode
- Try adding/editing transactions (as Admin)

## 🎯 Key Interactions

### View Transactions

- Default view shows all 40+ sample transactions
- Scroll through the table to see all

### Filter Transactions

1. Use the "Type" dropdown to filter by Income/Expense
2. Use the search box to find specific transactions
3. Click column headers (Date, Amount, Category) to sort

### Switch Roles

- Dropdown at top-right of navbar
- **Viewer**: Read-only access
- **Admin**: Can modify transactions

### Add Transaction (Admin Only)

1. Click "+ Add Transaction" button
2. Fill in the form:
   - Date (today by default)
   - Description (e.g., "Coffee")
   - Category (pick from dropdown)
   - Amount (e.g., 5.50)
   - Type (Expense or Income)
3. Click "Add Transaction"
4. See it appear in the table immediately

### Edit Transaction (Admin Only)

1. Find a transaction in the table
2. Click the edit icon (pencil)
3. Modify any field
4. Click "Update Transaction"

### Delete Transaction (Admin Only)

1. Find a transaction in the table
2. Click the trash icon
3. Confirm deletion
4. Transaction removed

### Toggle Dark Mode

- Click moon icon in top-right navbar
- Choose between light and dark themes
- Setting persists on refresh

### Navigate Sections

- Click links in sidebar (desktop)
- Or use mobile menu on smaller screens
- Sections: Overview, Transactions, Insights

## 📊 Understanding the Dashboard

### Summary Cards

- **Total Balance**: Your current financial position
- **Total Income**: Sum of all income transactions
- **Total Expenses**: Sum of all expense transactions

### Charts

- **Balance Trend**: See how your balance changed over time
- **Spending Breakdown**: Which categories you spend the most on

### Transactions Table

- Every transaction with date, description, category, amount, type
- Color-coded: Green = Income, Red = Expense
- Full sorting and filtering capabilities

### Insights Section

- **Highest Spending Category**: Where you spend the most
- **Monthly Comparison**: How your spending changed month-over-month
- **Average Daily Spend**: How much you spend per day on average
- **Total Transactions**: Total count of all transactions

## 🔍 Tips & Tricks

1. **Multiple Filters**: Combine type filter + search for more specific results
2. **Quick Sort**: Click column headers repeatedly to toggle sort direction
3. **Persistent Data**: Your transactions and dark mode choice are saved
4. **Empty States**: When no results match your filters, you'll see a helpful message
5. **Admin Advantage**: Switch to Admin to test the full feature set
6. **Try Different Dates**: Edit transaction dates to see balance trend update

## 🛠️ Build for Production

```bash
npm run build
```

Creates optimized build in `dist/` folder

## 📱 Responsive Design

- **Desktop**: Full sidebar + main content
- **Tablet**: Sidebar visible but compact
- **Mobile**: Hamburger menu with hidden sidebar

## ❓ Troubleshooting

**Charts not showing?**

- Ensure you have transactions in the date range
- Try adding a transaction in Admin mode

**Dark mode not working?**

- Clear browser cache
- Check if dark mode class is applied to HTML element

**Sorting not working?**

- Click the same column header again to reverse sort
- Visual indicators (↑↓) show current sort

**Form validation failing?**

- All form fields are required
- Amount must be positive
- Date cannot be empty

## 📖 Learn More

See [README.md](./README.md) for detailed documentation
See [FEATURES.md](./FEATURES.md) for complete feature list
