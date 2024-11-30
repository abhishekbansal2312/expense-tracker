import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ExpenseContext = createContext();
export const useExpenseContext = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState("");
  const [ArrayofObject, setArrayofObject] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [index, setIndex] = useState(null);
  const total = ArrayofObject.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );
  const [balance, setBalance] = useState("");
  const [money, setMoney] = useState("");

  useEffect(() => {
    fetchdata();
    fetchBalane();
    console.log("data coming");
  }, []);

  async function fetchBalane() {
    try {
      const storedData = localStorage.getItem("balance");
      const data = storedData ? JSON.parse(storedData) : "";
      setBalance(data);
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchdata() {
    try {
      const storedData = localStorage.getItem("expenses");
      const data = storedData ? JSON.parse(storedData) : [];
      setArrayofObject(data);
    } catch (error) {
      console.log(error);
    }
  }

  const handleAddbalance = (e) => {
    e.preventDefault();
    const data = balance;
    const newBalance = data + Number(money);
    localStorage.setItem("balance", JSON.stringify(newBalance));
    setMoney("");
    setBalance(newBalance);
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

    const data = [...ArrayofObject];

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
    const data = [...ArrayofObject];
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
