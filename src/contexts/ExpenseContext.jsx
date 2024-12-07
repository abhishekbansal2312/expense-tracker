import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ExpenseContext = createContext();
export const useExpenseContext = () => useContext(ExpenseContext);

export const ExpenseProvider = ({ children }) => {
  const [formValues, setFormValues] = useState({
    expense: "",
    amount: "",
    category: "Food",
  });
  const [ArrayofObject, setArrayofObject] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [index, setIndex] = useState(-1);
  const [balance, setBalance] = useState(0);

  const total = ArrayofObject.reduce(
    (acc, curr) => acc + Number(curr.amount),
    0
  );

  useEffect(() => {
    try {
      const data = JSON.parse(localStorage.getItem("balance")) || 0;
      const storedArrayofObject =
        JSON.parse(localStorage.getItem("expenses")) || [];
      setBalance(data);
      setArrayofObject(storedArrayofObject);
    } catch (error) {
      toast.error("Error initializing data:", error);
    }
  }, []);

  const handleAddBalance = (amount) => {
    if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
      toast.error("Please enter a valid amount.");
      return;
    }

    const newBalance = balance + Number(amount);
    setBalance(newBalance);
    localStorage.setItem("balance", JSON.stringify(newBalance));
    toast.success("Balance updated successfully!");
  };

  const resetFields = () => {
    setFormValues({
      expense: "",
      amount: "",
      category: "Food",
    });
    setIndex(-1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { expense, amount, category } = formValues;

    if (!expense || Number(amount) <= 0) {
      toast.error("Please fill in all fields with valid data.");
      return;
    }

    const date = new Date().toLocaleDateString();
    const expenseData = {
      id: index !== -1 ? index : Date.now().toString(), // Use `index` as ID when editing
      expense,
      category,
      amount: Number(amount),
      date,
    };

    const data = [...ArrayofObject];
    if (index !== -1) {
      const itemIndex = data.findIndex((item) => item.id === index);
      if (itemIndex !== -1) {
        data[itemIndex] = expenseData;
      }
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

  const handleDelete = (id) => {
    const updatedData = ArrayofObject.filter((item) => item.id !== id);
    setArrayofObject(updatedData);
    localStorage.setItem("expenses", JSON.stringify(updatedData));
    toast.success("Expense deleted successfully!");
  };

  const handleEditClick = (id) => {
    const expenseToEdit = ArrayofObject.find((item) => item.id === id);

    if (!expenseToEdit) {
      toast.error("Expense not found.");
      return;
    }

    setFormValues({
      expense: expenseToEdit.expense,
      category: expenseToEdit.category,
      amount: expenseToEdit.amount,
    });
    setIndex(id);
    setShowModal(true);
  };
  const [filterItems, setFilterItems] = useState(ArrayofObject);

  const handleSearch = (e) => {
    const search = e.target.value;
    if (search.trim() == null) {
      setFilterItems(ArrayofObject);
    }

    setFilterItems(
      ArrayofObject.filter((item) =>
        item.expense.toLowerCase().includes(search.toLowerCase())
      )
    );
  };

  return (
    <ExpenseContext.Provider
      value={{
        formValues,
        setFormValues,
        ArrayofObject,
        setArrayofObject,
        total,
        showModal,
        setShowModal,
        index,
        setIndex,
        balance,
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
