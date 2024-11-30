import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ExpenseContext = createContext();
export const useExpenseContext = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [ArrayofObject, setArrayofObject] = useState([]); // Renamed from `expenses`
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(-1);
  const [balance, setBalance] = useState(0);
  const [money, setMoney] = useState("");

  const total = ArrayofObject.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  useEffect(() => {
    try {
      const storedBalance = JSON.parse(localStorage.getItem("balance")) || 0;
      const storedArrayofObject =
        JSON.parse(localStorage.getItem("expenses")) || [];
      setBalance(storedBalance);
      setArrayofObject(storedArrayofObject); // Updated to use `ArrayofObject`
    } catch (error) {
      console.error("Error initializing data:", error);
    }
  }, []);

  const handleAddBalance = (e) => {
    e.preventDefault();
    const newBalance = balance + Number(money);
    setBalance(newBalance);
    setMoney("");
    localStorage.setItem("balance", JSON.stringify(newBalance));
    toast.success("Balance updated successfully!");
  };

  const resetFields = () => {
    setExpense("");
    setCategory("Food");
    setAmount("");
    setIndex(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expense || amount <= 0) {
      toast.error("Please fill in all fields with valid data.");
      return;
    }

    const date = new Date().toLocaleDateString();
    const expenseData = {
      id: index !== -1 ? ArrayofObject[index].id : Date.now().toString(),
      expense,
      category,
      amount: Number(amount),
      date,
    };

    const data = [...ArrayofObject];
    if (index !== -1) {
      data[index] = expenseData;
      toast.success("Expense updated successfully!");
    } else {
      data.push(expenseData);
      toast.success("Expense added successfully!");
    }

    setArrayofObject(data);
    localStorage.setItem("expenses", JSON.stringify(data));
    resetFields();
    setShowModal(false);
  };

  const handleDelete = (idx) => {
    const data = ArrayofObject.filter((_, i) => i !== idx);
    setArrayofObject(data);
    localStorage.setItem("expenses", JSON.stringify(data));
    toast.success("Expense deleted successfully!");
  };

  const handleEditClick = (idx) => {
    const expenseToEdit = ArrayofObject[idx];
    setExpense(expenseToEdit.expense);
    setCategory(expenseToEdit.category);
    setAmount(expenseToEdit.amount);
    setIndex(idx);
    setShowModal(true);
  };

  return (
    <ExpenseContext.Provider
      value={{
        expense,
        setExpense,
        category,
        setCategory,
        amount,
        setAmount,
        ArrayofObject,
        setArrayofObject,
        total,
        showModal,
        setShowModal,
        index,
        setIndex,
        balance,
        money,
        setMoney,
        handleAddBalance,
        resetFields,
        handleSubmit,
        handleDelete,
        handleEditClick,
      }}
    >
      {children}
    </ExpenseContext.Provider>
  );
};
