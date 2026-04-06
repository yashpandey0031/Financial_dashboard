// Chart data for Profit and Loss
export const profitLossData = [
  { month: "Apr", profit: 400, loss: 240 },
  { month: "May", profit: 300, loss: 221 },
  { month: "Jun", profit: 200, loss: 229 },
  { month: "Jul", profit: 278, loss: 200 },
  { month: "Aug", profit: 189, loss: 229 },
  { month: "Sep", profit: 239, loss: 200 },
  { month: "Oct", profit: 349, loss: 210 },
];

// Balance Trend data (Time-based visualization)
export const balanceTrendData = [
  { month: "Apr", balance: 450000 },
  { month: "May", balance: 520000 },
  { month: "Jun", balance: 580000 },
  { month: "Jul", balance: 610000 },
  { month: "Aug", balance: 645000 },
  { month: "Sep", balance: 680000 },
  { month: "Oct", balance: 689372 },
];

// Spending Breakdown data (Categorical visualization)
export const spendingBreakdownData = [
  { name: "Shopping", value: 450 },
  { name: "Food", value: 320 },
  { name: "Transport", value: 280 },
  { name: "Entertainment", value: 210 },
  { name: "Utilities", value: 140 },
];

// Wallet data
export const wallets = [
  { name: "USD", amount: "$9,674.00", flag: "🇺🇸", active: true },
  { name: "EUR", amount: "$10,540.00", flag: "🇪🇺", active: false },
  { name: "GBP", amount: "$8,000.00", flag: "🇬🇧", active: false },
  { name: "CAD", amount: "$7,000.00", flag: "🇨🇦", active: false },
];

// Recent activities data
export const activities = [
  {
    id: "INV-000078",
    activity: "Uber App Purchase",
    amount: 25.0,
    price: "$25.00",
    category: "Transport",
    type: "expense",
    status: "Completed",
    date: "17 Apr, 2025 03:45 PM",
    icon: "🚗",
  },
  {
    id: "INV-000075",
    activity: "Hotel Booking",
    amount: 32.75,
    price: "$32.750",
    category: "Travel",
    type: "expense",
    status: "Pending",
    date: "15 Apr, 2025 11:30 AM",
    icon: "🏨",
  },
  {
    id: "INV-000074",
    activity: "Flight Ticket Booking",
    amount: 45000,
    price: "$45,000",
    category: "Travel",
    type: "expense",
    status: "Completed",
    date: "15 Apr, 2025 12:00 PM",
    icon: "✈️",
  },
  {
    id: "INV-000073",
    activity: "Grocery Purchase",
    amount: 50.3,
    price: "$50,300",
    category: "Food",
    type: "expense",
    status: "In Progress",
    date: "14 Apr, 2025 09:15 PM",
    icon: "🛒",
  },
  {
    id: "INV-000072",
    activity: "Salary Deposit",
    amount: 5000,
    price: "$5,000",
    category: "Salary",
    type: "income",
    status: "Completed",
    date: "10 Apr, 2025 08:00 AM",
    icon: "💰",
  },
  {
    id: "INV-000071",
    activity: "Software License",
    amount: 15.9,
    price: "$15,900",
    category: "Subscriptions",
    type: "expense",
    status: "Completed",
    date: "10 Apr, 2025 08:00 AM",
    icon: "💻",
  },
];

// Helper function to get status color
export const getStatusColor = (status) => {
  switch (status) {
    case "Completed":
      return "#00C851";
    case "Pending":
      return "#FF9500";
    case "In Progress":
      return "#FF9500";
    default:
      return "#999";
  }
};

// Helper function to get status icon
export const getStatusIcon = (status) => {
  switch (status) {
    case "Completed":
      return "✓";
    case "Pending":
      return "⟳";
    case "In Progress":
      return "◆";
    default:
      return "•";
  }
};
