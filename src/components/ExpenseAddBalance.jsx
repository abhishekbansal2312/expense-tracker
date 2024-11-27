import React from "react";
import { useExpenseContext } from "../contexts/ExpenseContext";

export default function ExpenseAddBalance() {
  const { handleAddbalance, setMoney, money } = useExpenseContext();
  return (
    <div>
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
    </div>
  );
}
