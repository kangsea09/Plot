import type { Transaction } from "../types/transaction";

export interface Summary {
  totalIncome: number;
  totalExpense: number;
  balance: number;
}

const useSummary = (transactions: Transaction[]): Summary => {
  const totalIncome = transactions
    .filter((t) => t.amount > 0)
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpense = transactions
    .filter((t) => t.amount < 0)
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const balance = totalIncome - totalExpense;

  return { totalIncome, totalExpense, balance };
};

export default useSummary;
