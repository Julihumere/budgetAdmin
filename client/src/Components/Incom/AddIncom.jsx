import React, { useState } from "react";
import "./AddIncom.css";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addIncom } from "../../Redux/Actions";
import Cookies from "universal-cookie";
import Swal from "sweetalert2";
export default function AddIncom() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cookieEmail = cookies.get("email");
  const [incom, setIncom] = useState({
    concept: "",
    amount: "",
    category: "",
    date: "",
    email: cookieEmail,
  });
  const [error, setError] = useState({});

  const onChange = (e) => {
    setIncom({
      ...incom,
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

  const onSubmit = async (e) => {
    e.preventDefault();
    setError(validate(incom));
    const err = validate(incom);
    if (Object.values(err).length !== 0) {
      Swal.fire({
        title: "Please, correct the errors",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      dispatch(addIncom(incom));
      Swal.fire({
        title: "Incom was created!",
        icon: "success",
        confirmButtonText: "Success!",
      }).then(() => {
        navigate("/home");
      });
    }
  };
  return (
    <div className="AddIncom__container">
      <form className="AddIncom__form" onSubmit={onSubmit}>
        <div className="AddIncom__label_input">
          <label>Concept</label>
          <input
            type="text"
            name="concept"
            value={incom.concept}
            onChange={onChange}
          />
          {error.concept && <p>{error.concept}</p>}
        </div>
        <div className="AddIncom__label_input">
          {" "}
          <label>Amount</label>
          <input
            type="text"
            name="amount"
            value={incom.amount}
            onChange={onChange}
          />
          {error.amount && <p>{error.amount}</p>}
        </div>
        <div className="AddIncom__label_input">
          {" "}
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={incom.category}
            onChange={onChange}
          />
          {error.category && <p>{error.category}</p>}
        </div>
        <div className="AddIncom__label_input">
          {" "}
          <label>Date</label>
          <input
            type="text"
            name="date"
            value={incom.date}
            onChange={onChange}
          />
          {error.date && <p>{error.date}</p>}
        </div>
        <button type="submit">Create!</button>
      </form>
    </div>
  );
}
