import { Link } from "react-router-dom";
const Header = () => {
  return (
    <>
      <div className="container py-4 flex justify-between bg-slate-800 font-mono text-blue-200">
        <div className="row flex items-center justify-center text-gray-50 ml-10 font-semibold text-2xl">
          <h1>ExpenseEase</h1>
        </div>
        <ul className="flex items-center justify-center text-gray-50 mr-20 gap-10 ">
          <Link to="/" className="text-blue-200 hover:text-blue-400">
            <li className="hover:underline">Home</li>
          </Link>

          <Link to="/addexpense" className="text-blue-200 hover:text-blue-400">
            <li className="hover:underline">Expenses</li>
          </Link>
        </ul>
      </div>
    </>
  );
};

export default Header;
