import "../App.css";
import { useExpenseContext } from "../contexts/ExpenseContext";
const Form = () => {
  const {
    handleSubmit,
    setExpense,
    setAmount,
    setCategory,
    expense,
    category,
    amount,
  } = useExpenseContext();
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 grid grid-cols-1 md:grid-cols-4 gap-4 mb-5"
      >
        <div>
          <label
            htmlFor="expense"
            className="block text-sm mt-4 font-medium text-gray-700"
          >
            Expense Name
          </label>
          <input
            type="text"
            id="expense"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            onChange={(e) => setExpense(e.target.value)}
            value={expense}
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
            value={amount}
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
            value={category}
          >
            <option value="" disabled hidden>
              Select Category
            </option>
            <option value="Food">Food</option>
            <option value="Transport">Transport</option>
            <option value="Entertainment">Entertainment</option>
            <option value="Shopping">Shopping</option>
            <option value="Rent">Rent</option>
            <option value="Utilities">Utilities</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Education">Education</option>
            <option value="Travel">Travel</option>
            <option value="Groceries">Groceries</option>
            <option value="Savings">Savings</option>
            <option value="Gifts">Gifts</option>
            <option value="Insurance">Insurance</option>
            <option value="Subscriptions">Subscriptions</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="flex items-end">
          <button
            type="submit"
            className="w-32 bg-indigo-600 text-white px-4 py-2 rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Add Expense
          </button>
        </div>
      </form>
    </>
  );
};

export default Form;
