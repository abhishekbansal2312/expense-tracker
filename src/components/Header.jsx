import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="w-full py-4 flex justify-between bg-slate-800 font-mono text-blue-200">
      <div className="flex items-center justify-center text-gray-50 ml-10 font-semibold text-2xl">
        <h1>ExpenseEase</h1>
      </div>
      <nav className="flex items-center justify-center text-gray-50 mr-20 gap-10">
        <ul className="flex items-center justify-center gap-10">
          <li>
            <Link to="/" className="text-blue-200 hover:text-blue-400">
              Expenses
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
