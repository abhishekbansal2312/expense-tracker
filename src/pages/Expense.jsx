import Modal from "../components/Modal";
import Form from "../components/ExpenseForm";

import ExpenseList from "../components/ExpenseList";
import { useExpenseContext } from "../contexts/ExpenseContext";
import ExpenseAddBalance from "../components/ExpenseAddBalance";

const Expense = () => {
  const {
    isEditing,
    total,
    balance,
    money,
    setMoney,
    showModal,
    setShowModal,
    handleAddbalance,
    resetFields,
  } = useExpenseContext();

  return (
    <div className="max-w-6xl mx-auto mt-10 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-4xl font-extrabold mb-6 text-center text-indigo-700">
        Expense Tracker
      </h2>

      <button
        onClick={() => {
          setShowModal(true);
          resetFields();
        }}
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

      <ExpenseAddBalance />
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
          }}
          title={isEditing ? "Edit Expense" : "Add Expense"}
        >
          <Form />
        </Modal>
      )}

      <div className="mt-4">
        <ExpenseList />
      </div>
    </div>
  );
};

export default Expense;
