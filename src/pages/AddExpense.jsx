import { useEffect, useState } from "react";
import Modal from "../components/Modal";
import Form from "../components/Form";
import EditForm from "../components/EditForm";
import { toast } from "react-hot-toast";
import ExpenseList from "../components/ExpenseList";

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
  const [balance, setBalance] = useState(0);
  const [money, setMoney] = useState(0);

  const handleAddbalance = (e) => {
    e.preventDefault();
    const data = JSON.parse(localStorage.getItem("balance") || "0");
    const newBalance = data + Number(money);
    setBalance(newBalance);
    localStorage.setItem("balance", JSON.stringify(newBalance));
    setMoney(0);
  };

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
    toast.success("Expense Added successfully!");
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

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("balance") || "0");
    setBalance(data - total);
  }, [total]);

  const handleDelete = (idx) => {
    const data = JSON.parse(localStorage.getItem("expenses"));
    data.splice(idx, 1);
    localStorage.setItem("expenses", JSON.stringify(data));
    setArrayofObject(data);
    toast.success("Expense deleted successfully!");
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
    toast.success("Item Edit successfully!");
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
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-indigo-700">
        Expense Tracker
      </h2>

      <button
        onClick={() => setShowModal(true)}
        className="bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 hover:scale-105 transition-transform duration-200"
      >
        Add Expense
      </button>

      <div className="flex gap-7">
        {total !== 0 && (
          <div className="mt-6 text-xl font-semibold text-gray-700">
            Total Expenses: ₹{total}
          </div>
        )}

        <div className="mt-6 text-xl font-semibold text-green-700">
          Current Balance: ₹{balance}
        </div>
      </div>

      <form onSubmit={handleAddbalance} className="mt-2">
        <div className="flex items-center gap-4">
          <div>
            <label htmlFor="balance" className="block text-gray-600 ">
              Add Balance
            </label>
            <input
              type="number"
              id="balance"
              value={money}
              onChange={(e) => setMoney(e.target.value)}
              className="border border-gray-300 gap-4 rounded-md  px-4 py-2 focus:ring-2 focus:ring-indigo-500 focus:outline-none"
              placeholder="Enter amount"
            />
            <button
              type="submit"
              className="bg-green-600 text-white px-4 ml-2 py-2 rounded-lg shadow"
            >
              Add
            </button>
          </div>
        </div>
      </form>

      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
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

      <div className="mt-4">
        {ArrayofObject.map((expense, idx) => (
          <ExpenseList
            key={idx}
            expense={expense}
            idx={idx}
            handleEditClick={handleEditClick}
            handleDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default AddExpense;
