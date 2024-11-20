import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Form from "../components/Form";
import EditForm from "../components/EditForm";

const AddExpense = () => {
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState(0);
  const [ArrayofObject, setArrayofObject] = useState(
    JSON.parse(localStorage.getItem("expenses")) || []
  );
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [index, setIndex] = useState(0);

  const resetFields = () => {
    setExpense("");
    setCategory("Food");
    setAmount(0);
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!expense || amount <= 0) {
      alert("Please fill in all fields.");
      return;
    }

    const date = new Date().toLocaleDateString();
    const expenseData = {
      expense,
      category,
      amount: Number(amount),
      date,
    };

    let data = JSON.parse(localStorage.getItem("expenses") || "[]");
    data.push(expenseData);
    localStorage.setItem("expenses", JSON.stringify(data));

    setArrayofObject(data);
    setShowModal(false);
    resetFields();
  };

  useEffect(() => {
    if (ArrayofObject) {
      setTotal(
        ArrayofObject.reduce((acc, curr) => acc + Number(curr.amount), 0)
      );
    }
  }, [ArrayofObject]);

  const handleDelete = (idx) => {
    const data = JSON.parse(localStorage.getItem("expenses")) || [];
    data.splice(idx, 1);
    localStorage.setItem("expenses", JSON.stringify(data));
    setArrayofObject(data);
  };

  const handleEdit = (index) => {
    const date = new Date().toLocaleDateString();
    const updatedExpenseData = {
      expense,
      category,
      amount: Number(amount),
      date,
    };

    let data = JSON.parse(localStorage.getItem("expenses"));
    data[index] = updatedExpenseData;
    localStorage.setItem("expenses", JSON.stringify(data));
    setArrayofObject(data);
    setShowEdit(false);
    resetFields();
  };

  const handleEditClick = (idx) => {
    const expenseToEdit = ArrayofObject[idx];
    setExpense(expenseToEdit.expense);
    setCategory(expenseToEdit.category);
    setAmount(expenseToEdit.amount);
    setIndex(idx);
    setShowEdit(true);
  };

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-gray-100 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
        Expense Tracker
      </h2>
      <button
        onClick={() => setShowModal(true)}
        className="text-white px-4 py-2 rounded-md shadow focus:outline-none focus:ring-2 focus:ring-blue-400 transition ease-in-out delay-150 bg-blue-500 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-500 duration-300 mb-2"
      >
        Add Expense
      </button>

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            resetFields();
          }}
          title="Add Expense"
        >
          <Form
            handlesubmit={handlesubmit}
            setExpense={setExpense}
            setAmount={setAmount}
            setCategory={setCategory}
            expense={expense}
            category={category}
            amount={amount}
          />
        </Modal>
      )}

      {showEdit && (
        <Modal
          isOpen={showEdit}
          onClose={() => {
            setShowEdit(false);
            resetFields();
          }}
          title="Edit Expense"
        >
          <EditForm
            handleEdit={() => handleEdit(index)}
            setExpense={setExpense}
            setAmount={setAmount}
            setCategory={setCategory}
            expense={expense}
            category={category}
            amount={amount}
          />
        </Modal>
      )}

      {ArrayofObject.map((expense, idx) => (
        <div
          key={idx}
          className="bg-white shadow-md rounded-md p-1 mt-1 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-l-2 border-sky-700"
        >
          <div className="flex items-center gap-20">
            <h2 className="text-lg w-32 font-bold text-gray-800 ml-4">
              {expense.expense}
            </h2>
            <p className="text-sm w-32 text-gray-600">{expense.amount}</p>
            <p className="text-sm w-32 text-gray-600">{expense.category}</p>
            <p className="text-sm w-32 text-gray-600">{expense.date}</p>
          </div>
          <div className="mt-4 sm:mt-0 flex space-x-2">
            <button
              onClick={() => handleEditClick(idx)}
              className="bg-blue-500 text-white px-4 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(idx)}
              className="bg-red-500 text-white px-4 py-2 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              Delete
            </button>
          </div>
        </div>
      ))}

      {total !== 0 && (
        <div className="text-right font-bold text-lg mt-5">Total: {total}</div>
      )}
    </div>
  );
};

export default AddExpense;
