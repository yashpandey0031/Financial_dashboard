export const generateMockTransactions = () => {
  const categories = [
    "Food",
    "Transport",
    "Entertainment",
    "Salary",
    "Rent",
    "Freelance",
    "Utilities",
    "Shopping",
  ];
  const transactions = [];
  const today = new Date();

  // Generate 40 transactions across 3 months
  for (let i = 0; i < 40; i++) {
    const daysAgo = Math.floor(Math.random() * 90);
    const date = new Date(today);
    date.setDate(date.getDate() - daysAgo);

    const isIncome = Math.random() > 0.7;
    const category = isIncome
      ? Math.random() > 0.5
        ? "Salary"
        : "Freelance"
      : categories[Math.floor(Math.random() * 6)];

    const amount = isIncome
      ? Math.floor(2000 + Math.random() * 3000)
      : Math.floor(10 + Math.random() * 300);

    transactions.push({
      id: i + 1,
      date: date.toISOString().split("T")[0],
      description: `${category} Transaction`,
      category,
      amount,
      type: isIncome ? "income" : "expense",
    });
  }

  return transactions.sort((a, b) => new Date(b.date) - new Date(a.date));
};

export const INITIAL_BALANCE = 5000;
export const mockTransactions = generateMockTransactions();
