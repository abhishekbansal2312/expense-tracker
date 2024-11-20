const ExpenseList = ({ expense, idx, handleEditClick, handleDelete }) => {
  return (
    <>
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
    </>
  );
};

export default ExpenseList;
