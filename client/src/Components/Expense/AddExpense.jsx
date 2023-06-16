import React, { useState } from "react";
import "./AddExpense.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addExpense } from "../../Redux/Actions";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
import { Calendar } from "react-calendar";
import { BsFillArrowLeftCircleFill } from "react-icons/bs";

export default function AddIncom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cookieEmail = cookies.get("email");
  const [date, setDate] = useState(new Date());
  const [expense, setExpense] = useState({
    concept: "",
    amount: "",
    category: "",
    date: date.toLocaleDateString(),
    email: cookieEmail,
  });
  const [error, setError] = useState({});

  const [calendar, setCalendar] = useState(false);

  const onChangeDate = (e) => {
    setDate(e);
    setExpense({
      ...expense,
      date: e.toLocaleDateString(),
    });
  };

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
    }
    return errors;
  };

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

  const handleGoBack = () => {
    navigate("/home");
  };

  return (
    <div className="AddExpense__container">
      <button onClick={handleGoBack} className="AddIcom_goBack">
        <BsFillArrowLeftCircleFill />
        Volver
      </button>
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
            onClick={setCalendar}
            readOnly
          />
          {calendar && (
            <Calendar
              value={date}
              onChange={onChangeDate}
              className="calendar"
              maxDate={new Date()}
            />
          )}
          {error.date && <p>{error.date}</p>}
        </div>
        <button className="AddIncom__button_submit" type="submit">
          Create!
        </button>
      </form>
      {calendar && (
        <Calendar
          value={date}
          onChange={onChangeDate}
          className="calendar__responsive"
          maxDate={new Date()}
        />
      )}
    </div>
  );
}
