import React, { useState } from "react";
import "./AddExpense.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../../Redux/Actions";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
export default function AddIncom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cookieEmail = cookies.get("email");
  const [expense, setExpense] = useState({
    concept: "",
    amount: "",
    category: "",
    email: cookieEmail,
  });
  const [error, setError] = useState({});

  const onChange = (e) => {
    setExpense({
      ...expense,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (input) => {
    let errors = {};
    if (!input.concept) {
      errors.concept = "Concept is required";
    }
    if (!input.amount) {
      errors.amount = "Amount is required";
    }
    if (!input.category) {
      errors.category = "Category is required";
    }
    if (!input.date) {
      errors.date = "Date is required";
    } else if (
      !/^([0-2][0-9]|3[0-1])(\/|-)(0[1-9]|1[0-2])\2(\d{4})$/.test(input.date)
    ) {
      errors.date = "Date must be dd/mm/yyyy";
    }
    return errors;
  };

  console.log(error);
  const onSubmit = async (e) => {
    e.preventDefault();
    setError(validate(expense));
    const err = validate(expense);
    if (Object.values(err).length !== 0) {
      Swal.fire({
        title: "Please, correct the errors",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      dispatch(addExpense(expense));
      Swal.fire({
        title: "Expense was created!",
        icon: "success",
        confirmButtonText: "Success!",
      }).then(() => {
        navigate("/home");
      });
    }
  };
  return (
    <div className="AddExpense__container">
      <form className="AddExpense__form" onSubmit={onSubmit}>
        <div className="AddExpense__label_input">
          <label>Concept</label>
          <input
            type="text"
            name="concept"
            value={expense.concept}
            onChange={onChange}
          />
          {error.concept && <p>{error.concept}</p>}
        </div>
        <div className="AddExpense__label_input">
          {" "}
          <label>Amount</label>
          <input
            type="text"
            name="amount"
            value={expense.amount}
            onChange={onChange}
          />
          {error.amount && <p>{error.amount}</p>}
        </div>
        <div className="AddExpense__label_input">
          {" "}
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={expense.category}
            onChange={onChange}
          />
          {error.category && <p>{error.category}</p>}
        </div>
        <div className="AddExpense__label_input">
          {" "}
          <label>Date</label>
          <input
            type="text"
            name="date"
            value={expense.date}
            onChange={onChange}
          />
          {error.date && <p>{error.date}</p>}
        </div>
        <button type="submit">Create!</button>
      </form>
    </div>
  );
}
