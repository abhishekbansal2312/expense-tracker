import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ExpenseContext = createContext();
export const useExpenseContext = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [ArrayofObject, setArrayofObject] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );
  const total = ArrayofObject.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [index, setIndex] = useState(null);
  const balance = JSON.parse(localStorage.getItem("balance") || "0") - total;
  const [money, setMoney] = useState("");

  const handleAddbalance = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("balance") || "0");
    const newBalance = data + Number(money);
    localStorage.setItem("balance", JSON.stringify(newBalance));
    setMoney("");
  };

  const resetFields = () => {
    setExpense("");
    setCategory("Food");
    setAmount("");
    setIndex(null);
    setIsEditing(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!expense || amount <= 0) {
      toast.error("Please fill in all fields with valid data.");
      return;
    }

    const date = new Date().toLocaleDateString();
    const expenseData = {
      expense,
      category,
      amount: Number(amount),
      date,
    };

    const data = JSON.parse(localStorage.getItem("expenses") || "[]");

    if (isEditing && index !== null) {
      data[index] = expenseData;
      toast.success("Expense updated successfully!");
    } else {
      data.push(expenseData);
      toast.success("Expense added successfully!");
    }

    localStorage.setItem("expenses", JSON.stringify(data));
    setArrayofObject(data);
    setShowModal(false);
    resetFields();
  };

  const handleDelete = (idx) => {
    const data = JSON.parse(localStorage.getItem("expenses"));
    data.splice(idx, 1);
    localStorage.setItem("expenses", JSON.stringify(data));
    setArrayofObject(data);
    toast.success("Expense deleted successfully!");
  };

  const handleEditClick = (idx) => {
    const expenseToEdit = ArrayofObject[idx];
    setExpense(expenseToEdit.expense);
    setCategory(expenseToEdit.category);
    setAmount(expenseToEdit.amount);
    setIndex(idx);
    setIsEditing(true);
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
        isEditing,
        setIsEditing,
        index,
        setIndex,
        balance,
        money,
        setMoney,
        handleAddbalance,
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
