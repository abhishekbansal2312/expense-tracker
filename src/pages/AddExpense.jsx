import { useEffect, useState } from "react";

const AddExpense = () => {
  const [expense, setExpense] = useState("");
  const [category, setCategory] = useState("Food");
  const [amount, setAmount] = useState(0);
  const [ArrayofObject, setArrayofObject] = useState(
    JSON.parse(localStorage.getItem("expenses"))
  );

  const handlesubmit = (e) => {
    e.preventDefault();
    const date = new Date().toLocaleDateString();
    const expenseData = {
      expense: expense,
      category: category,
      amount: amount,
      date: date,
    };
    let data = JSON.parse(localStorage.getItem("expenses") || "[]");
    data.push(expenseData);
    localStorage.setItem("expenses", JSON.stringify(data));
    console.log(expenseData);
  };

  useEffect(() => {
    if (ArrayofObject) {
      setArrayofObject(JSON.parse(localStorage.getItem("expenses")));
    }
  });

  return (
    <div className="max-w-lg mx-auto mt-10 p-5 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-5 text-center text-gray-800">
        Add Expense
      </h2>
      <form onSubmit={handlesubmit} className="space-y-4">
        <div>
          <label
            htmlFor="expense"
            className="block text-sm font-medium text-gray-700"
          >
            Expense Name
          </label>
          <input
            type="text"
            id="expense"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setExpense(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount
          </label>
          <input
            type="number"
            id="amount"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>
        <div>
          <label
            htmlFor="category"
            className="block text-sm font-medium text-gray-700"
          >
            Category
          </label>
          <select
            id="category"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" disabled selected hidden>
              Select Category
            </option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        >
          Add Expense
        </button>
      </form>
      {ArrayofObject !== null &&
        ArrayofObject.map((expense, index) => {
          return (
            <>
              <div className="bg-white shadow-md rounded-md p-4 mt-4">
                <h2 className="text-lg font-bold">{expense.expense}</h2>
                <p className="text-sm text-gray-600">
                  Amount: {expense.amount}
                </p>
                <p className="text-sm text-gray-600">
                  Category: {expense.category}
                </p>
                <p className="text-sm text-gray-600">{expense.date}</p>
              </div>
            </>
          );
        })}
    </div>
  );
};

export default AddExpense;
