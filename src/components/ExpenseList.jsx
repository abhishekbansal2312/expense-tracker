import { PencilIcon, TrashIcon } from "@heroicons/react/outline";

const ExpenseList = ({ expense, idx, handleEditClick, handleDelete }) => {
  return (
    <div
      key={idx}
      className="bg-white shadow-md rounded-md p-4 mt-2 flex flex-col sm:flex-row sm:justify-between items-start sm:items-center border-l-4 border-sky-700"
    >
      <div className="flex items-center gap-10">
        <h2 className="text-lg w-32 font-bold text-gray-800">
          {expense.expense}
        </h2>
        <p className="text-sm w-20 text-gray-600">₹{expense.amount}</p>
        <p className="text-sm w-24 text-gray-600">{expense.category}</p>
        <p className="text-sm w-24 text-gray-600">{expense.date}</p>
      </div>
      <div className="mt-4 sm:mt-0 flex gap-3">
        <button
          onClick={() => handleEditClick(idx)}
          className="flex items-center justify-center bg-blue-500 text-white p-2 rounded-md shadow hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
        >
          <PencilIcon className="h-4 w-4" />
        </button>
        <button
          onClick={() => handleDelete(idx)}
          className="flex items-center justify-center bg-red-500 text-white p-2 rounded-md shadow hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
        >
          <TrashIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ExpenseList;
