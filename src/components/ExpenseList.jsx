import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { useExpenseContext } from "../contexts/ExpenseContext";

const ExpenseList = () => {
  const { ArrayofObject, handleDelete, handleEditClick } = useExpenseContext();

  if (ArrayofObject.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-4">
        <p>No expenses recorded yet.</p>
      </div>
    );
  }

  return (
    <div className="mt-4 space-y-4">
      {ArrayofObject.map((expense, idx) => (
        <div
          key={expense.id}
          className="bg-white shadow-md rounded-md p-4 flex flex-wrap sm:flex-nowrap sm:justify-between items-center border-l-2 border-b-2 border-sky-700"
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-x-10 items-center flex-grow">
            <h2 className="text-lg font-bold text-gray-800 truncate">
              {expense.expense}
            </h2>
            <p className="text-sm text-gray-600">₹{expense.amount}</p>
            <p className="text-sm text-gray-600">{expense.category}</p>
            <p className="text-sm text-gray-600">{expense.date}</p>
          </div>

          <div className="mt-4 sm:mt-0 flex gap-4 sm:ml-4">
            <button
              onClick={() => handleEditClick(expense.id)}
              aria-label="Edit Expense"
              className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              <PencilIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => handleDelete(expense.id)}
              aria-label="Delete Expense"
              className="flex items-center justify-center bg-red-500 text-white p-2 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <TrashIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ExpenseList;
