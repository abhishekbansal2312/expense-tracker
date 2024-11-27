import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import Expense from "./pages/Expense";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Toaster position="top-right" />
        <Routes>
          <Route>
            <Route path="/" element={<Expense />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
