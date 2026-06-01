import { useState } from "react";
import type {
  Transaction,
  TransactionType,
  Category,
} from "../types/transaction";
import { INITIAL_TRANSACTIONS } from "../data/transactions";

const useTransactions = () => {
  const [transactions, setTransactions] =
    useState<Transaction[]>(INITIAL_TRANSACTIONS);
  const [tab, setTab] = useState<TransactionType>("지출");
  const [form, setForm] = useState({
    title: "",
    category: "식비" as Category,
    amount: "",
    date: new Date().toISOString().slice(0, 10),
    memo: "",
  });

  const setFormField = (field: Partial<typeof form>) => {
    setForm((prev) => ({ ...prev, ...field }));
  };

  const resetForm = () => {
    setForm({
      title: "",
      category: "식비",
      amount: "",
      date: new Date().toISOString().slice(0, 10),
      memo: "",
    });
  };

  const handleAdd = () => {
    if (!form.title || !form.amount) return;

    const isExpense = tab === "지출";
    const amount = isExpense
      ? -Math.abs(Number(form.amount))
      : Math.abs(Number(form.amount));

    const newTransaction: Transaction = {
      id: Date.now(),
      title: form.title,
      memo: form.memo,
      category: form.category,
      date: form.date,
      amount,
      type: tab,
    };

    setTransactions((prev) => [newTransaction, ...prev]);
    resetForm();
  };

  const handleDelete = (id: number) => {
    setTransactions((prev) => prev.filter((t) => t.id !== id));
  };

  const handleSave = (updated: Transaction) => {
    setTransactions((prev) =>
      prev.map((t) => (t.id === updated.id ? updated : t)),
    );
  };

  return {
    tab,
    setTab,
    form,
    setFormField,
    filtered: transactions,
    handleAdd,
    handleDelete,
    handleSave,
  };
};

export default useTransactions;
