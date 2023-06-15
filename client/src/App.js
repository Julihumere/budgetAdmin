import Home from "./Components/Home/Home";
import Header from "./Components/Header/Header";
import Landing from "./Components/Landing/Landing";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register.jsx";
import AddIncom from "./Components/Incom/AddIncom.jsx";
import AddExpense from "./Components/Expense/AddExpense.jsx";
import { Route, Routes } from "react-router-dom";
import Edit from "./Components/Edit/Edit";
function App() {
  return (
    <>
      <Header />
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/home" element={<Home />} />
        <Route path="/addIncom" element={<AddIncom />} />
        <Route path="/addExpense" element={<AddExpense />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
