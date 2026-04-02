# Testing Guide - Finance Dashboard

## 🧪 How to Test the Dashboard

### Prerequisites

- Node.js installed
- Terminal/Command line access
- Modern web browser

---

## 1️⃣ Initial Setup & Running

```bash
# Navigate to project
cd c:\Users\yashs\Documents\Projects\assignment

# Install dependencies (if not done)
npm install

# Start dev server
npm run dev
```

**Expected Result**: Browser opens to `http://localhost:5173` with the dashboard visible

---

## 2️⃣ Visual/UI Testing

### Dashboard Overview Section

- [ ] Three summary cards are visible and properly positioned
- [ ] Cards show correct values:
  - Total Balance: Should be > $5000 (initial balance + net transactions)
  - Total Income: Shows sum of all income transactions
  - Total Expenses: Shows sum of all expense transactions
- [ ] Cards have colored left borders (blue, green, red)
- [ ] Icons are displayed in card corners
- [ ] Cards respond to hover (shadow increases)

### Charts

- [ ] Balance Trend chart displays with proper labels
- [ ] Chart shows last 30 days of data
- [ ] Spending Breakdown pie chart displays
- [ ] Pie chart has multiple colors
- [ ] Both charts are responsive (resize window to test)
- [ ] Charts have legends

### Navbar

- [ ] Dashboard title visible in navbar
- [ ] Role dropdown shows "Viewer" or "Admin"
- [ ] Dark mode toggle icon visible (moon/sun)
- [ ] Navbar is sticky (stays at top when scrolling)

### Sidebar (Desktop)

- [ ] Sidebar visible on desktop view
- [ ] Menu links visible (Overview, Transactions, Insights)
- [ ] Links are clickable and scroll to sections
- [ ] Sidebar hidden on mobile (hamburger menu instead)

---

## 3️⃣ Transactions Table Testing

### Display

- [ ] Transaction table shows 40+ transactions
- [ ] All columns visible: Date, Description, Category, Amount, Type
- [ ] Amounts are properly formatted with $
- [ ] Transaction types color-coded:
  - Green for Income
  - Red for Expense
- [ ] Dates formatted as MM/DD/YYYY
- [ ] Categories shown as badges

### Sorting

- [ ] Click "Date" column header → sorts by date (desc)
- [ ] Click again → sorts ascending (↑ indicator shows)
- [ ] Click again → sorts descending (↓ indicator shows)
- [ ] Click "Amount" header → sorts by amount
- [ ] Click "Category" header → sorts alphabetically
- [ ] Sorting indicator (↑↓) shows current sort

### Filtering

- [ ] Type dropdown defaults to "All Types"
- [ ] Change to "Income" → shows only income transactions
- [ ] Change to "Expense" → shows only expense transactions
- [ ] Change back to "All Types" → shows all again
- [ ] "Clear Filters" button appears when filtering active
- [ ] Click clear → resets filters

### Search

- [ ] Type "Food" in search → shows only Food transactions
- [ ] Search is case-insensitive
- [ ] Search works on description field
- [ ] Clear search → shows all transactions
- [ ] "Clear Filters" button works with search active

### Responsiveness

- [ ] On desktop: Full table visible with scroll
- [ ] On tablet: Table adjusts width
- [ ] On mobile: Horizontal scroll for table
- [ ] Cells don't overlap on small screens

---

## 4️⃣ Role-Based Access Testing

### Viewer Mode (Default)

1. Check role dropdown → should show "Viewer"
2. [ ] No "+ Add Transaction" button visible
3. [ ] No edit icons on transaction rows
4. [ ] No delete icons on transaction rows
5. [ ] Can view all data (charts, tables, insights)
6. [ ] Table is read-only

### Switch to Admin Mode

1. Click role dropdown
2. Select "Admin"
3. [ ] Role changes to "Admin"
4. [ ] "+ Add Transaction" button now visible
5. [ ] Edit pencil icons appear on each row
6. [ ] Delete trash icons appear on each row

---

## 5️⃣ Add Transaction Testing

### Open Modal

1. Click "+ Add Transaction" button (when in Admin mode)
2. [ ] Modal opens with title "Add Transaction"
3. [ ] Modal has close button (X)
4. [ ] Date field defaults to today's date

### Form Fields

- [ ] Date picker input works
- [ ] Description field is empty (ready for input)
- [ ] Category dropdown has 8 options (Food, Transport, etc.)
- [ ] Amount field accepts numbers
- [ ] Type selector has "Expense" and "Income" options

### Form Validation

1. Try clicking "Add Transaction" without filling fields
2. [ ] Error messages appear for empty fields
3. [ ] Amount validation: Enter -5, error appears
4. [ ] Amount validation: Enter 0, error appears
5. [ ] Enter 100 for amount → no error

### Successful Add

1. Fill in form:
   - Date: Today (or any date)
   - Description: "Test transaction"
   - Category: "Food"
   - Amount: 25.50
   - Type: "Expense"
2. Click "Add Transaction"
3. [ ] Modal closes
4. [ ] New transaction appears at top of table
5. [ ] Summary cards update (expenses increase)
6. [ ] Charts update immediately

---

## 6️⃣ Edit Transaction Testing

### Edit an Existing Transaction

1. Find a transaction in the table
2. Click the edit icon (pencil) on that row
3. [ ] Modal opens with title "Edit Transaction"
4. [ ] All fields pre-filled with current values
5. Change amount from 50 to 75
6. Click "Update Transaction"
7. [ ] Modal closes
8. [ ] Table updates with new amount
9. [ ] Summary cards recalculate
10. [ ] Charts update

---

## 7️⃣ Delete Transaction Testing

### Delete with Confirmation

1. Find any transaction
2. Click delete icon (trash bin)
3. [ ] Confirmation dialog appears
4. [ ] Dialog asks "Delete this transaction?"
5. [ ] Has "Cancel" and "OK" buttons
6. Click "Cancel" → transaction stays, dialog closes
7. Click delete again
8. Click "OK" → transaction removed
9. [ ] Transaction gone from table
10. [ ] Summary cards update
11. [ ] Charts update

---

## 8️⃣ Insights Testing

### Highest Spending Category

- [ ] Card shows a category name
- [ ] Shows the amount for that category
- [ ] Updates when transactions are added/deleted

### Monthly Comparison

- [ ] Shows percentage change (↑ or ↓)
- [ ] Shows current and last month amounts
- [ ] Updates when new month starts

### Average Daily Spend

- [ ] Shows a dollar amount
- [ ] Calculation is reasonable
- [ ] Updates when transactions change

### Total Transactions

- [ ] Shows correct count (40+)
- [ ] Increases when adding transactions
- [ ] Decreases when deleting transactions

---

## 9️⃣ Dark Mode Testing

### Toggle Dark Mode

1. Click moon/sun icon in navbar
2. [ ] Page switches to dark theme
3. [ ] All text remains readable
4. [ ] Cards have dark backgrounds
5. [ ] Charts are visible and readable
6. [ ] Table rows are distinguishable

### Persistence

1. Turn on dark mode
2. Refresh page (F5)
3. [ ] Dark mode is still on
4. [ ] Preference persists across sessions

### Styling

- [ ] Buttons have dark mode colors
- [ ] Text has proper contrast
- [ ] Charts tooltips appear correctly
- [ ] Modal has dark background
- [ ] Form inputs are styled properly

---

## 🔟 Responsive Design Testing

### Desktop (1200px+)

- [ ] Sidebar visible on left
- [ ] Main content takes full width
- [ ] 3 summary cards in one row
- [ ] 2 charts in one row
- [ ] Table fully visible without horizontal scroll

### Tablet (768px - 1199px)

- [ ] Sidebar may collapse partially
- [ ] Cards may stack or adjust
- [ ] Charts adjust responsively
- [ ] Table has horizontal scroll

### Mobile (< 768px)

- [ ] Sidebar hidden by default
- [ ] Hamburger menu visible in navbar
- [ ] Menu icon clickable → displays sidebar overlay
- [ ] Summary cards stack vertically
- [ ] Charts stack vertically
- [ ] Table has horizontal scroll
- [ ] All text readable
- [ ] Buttons large enough to tap

### Testing with DevTools

1. Open DevTools (F12)
2. Go to Device Toolbar (Ctrl+Shift+M)
3. Test different device sizes:
   - [ ] iPhone (375px)
   - [ ] iPad (768px)
   - [ ] Desktop (1920px)

---

## 1️⃣1️⃣ Data Persistence Testing

### localStorage Persistence

1. Add a new transaction
2. Refresh the page (F5)
3. [ ] Transaction is still there
4. [ ] All data persists

### Multiple Sessions

1. Add/edit/delete some transactions
2. Close browser tab
3. Open new tab and go to http://localhost:5173
4. [ ] Data is still there
5. [ ] Changes are persisted

### Dark Mode Persistence

1. Enable dark mode
2. Refresh page
3. [ ] Dark mode is still on
4. [ ] Preference saved in localStorage

---

## 1️⃣2️⃣ Performance Testing

### Page Load

- [ ] Dashboard loads in < 2 seconds
- [ ] No visible lag when rendering 40+ transactions
- [ ] Charts animate smoothly

### Interactions

- [ ] Filtering is instant (no delay)
- [ ] Sorting is instant
- [ ] Adding/editing transactions is instant
- [ ] Deleting is instant
- [ ] No flickering or jumping

### Animations

- [ ] Cards fade in on load
- [ ] Transitions are smooth (not jarring)
- [ ] No animations cause lag
- [ ] Hover effects are immediate

---

## 1️⃣3️⃣ Edge Cases & Error Handling

### Empty States

1. Add filters that match no transactions
2. [ ] "No transactions found" message appears
3. [ ] "Try adjusting your filters" hint shown
4. [ ] Message is centered and visible

### Form Validation

- [ ] Required fields show error when empty
- [ ] Amount validation prevents negative/zero
- [ ] Success feedback after form submission

### Large Numbers

1. Add transaction with amount 999999
2. [ ] Formatted correctly as $999,999
3. [ ] Calculations work properly
4. [ ] Charts display correctly

### Special Characters

1. Add transaction with description "Test@#$%"
2. [ ] Saves correctly
3. [ ] Displays without issues
4. [ ] Search still works

---

## 1️⃣4️⃣ Browser Compatibility

Test in:

- [ ] Chrome/Chromium latest
- [ ] Firefox latest
- [ ] Safari (if on Mac)
- [ ] Edge latest

Expected: All features work in all modern browsers

---

## 1️⃣5️⃣ Accessibility Testing

- [ ] Tab navigation works through all inputs
- [ ] Buttons are keyboard accessible
- [ ] Form labels properly connected to inputs
- [ ] Color isn't only way to distinguish info
- [ ] Contrast ratios are acceptable

---

## 🎯 Test Summary Checklist

- [ ] All visual elements display correctly
- [ ] All interactions work as expected
- [ ] Data persists across page refreshes
- [ ] Responsive design works on all sizes
- [ ] Role-based access works correctly
- [ ] CRUD operations complete and working
- [ ] Charts and calculations are accurate
- [ ] Dark mode functions properly
- [ ] No console errors
- [ ] No broken links or buttons
- [ ] Performance is acceptable
- [ ] Edge cases handled gracefully

---

## ✅ Testing Complete

When all checks pass, the application is ready for evaluation/deployment.

**Report any failures to the development team with:**

- Browser and OS version
- Steps to reproduce
- Expected vs. actual result
- Screenshot if helpful
