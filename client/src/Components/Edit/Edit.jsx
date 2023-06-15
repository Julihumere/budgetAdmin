import { useState } from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getIncom, getExpense, editIncom, getUser } from "../../Redux/Actions";
import Cookies from "universal-cookie";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { editExpense } from "./../../Redux/Actions";
import "./Edit.css";
import Swal from "sweetalert2";

export default function Edit(props) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation();
  const cookies = new Cookies();
  const email = cookies.get("email");
  const user = useSelector((state) => state.user);
  let { id } = useParams();

  useEffect(() => {
    dispatch(getUser(email));
    if (location.state === "Incom") {
      dispatch(getIncom(id));
    } else {
      dispatch(getExpense(id));
    }
  }, [id]);

  let incomSelect = user.incoms?.filter((e) => e.id === id);

  const [edit, setEdit] = useState({
    id: id,
    concept: "",
    amount: "",
    category: "",
  });

  const onChange = (e) => {
    setEdit({
      ...edit,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    if (location.state === "Incom") {
      e.preventDefault();
      dispatch(editIncom(edit));
      Swal.fire({
        title: `${location.state} was updated!`,
        icon: "success",
        confirmButtonText: "Success!",
      }).then(() => {
        navigate("/home");
      });
    } else {
      e.preventDefault();
      dispatch(editExpense(edit));
      Swal.fire({
        title: `${location.state} was updated!`,
        icon: "success",
        confirmButtonText: "Success!",
      }).then(() => {
        navigate("/home");
      });
    }
  };

  return (
    <div className="Edit__container">
      <form className="Edit__form" onSubmit={onSubmit}>
        <div className="Edit__label_input">
          <label>Concept</label>
          <input
            type="text"
            name="concept"
            value={
              edit.concept === ""
                ? location.state === "Incom"
                  ? incomSelect[0].concept
                  : user.expenses?.concept
                : edit.concept
            }
            onChange={onChange}
          />
        </div>
        <div className="Edit__label_input">
          <label>Amount</label>
          <input
            type="text"
            name="amount"
            value={
              edit.amount === ""
                ? location.state === "Incom"
                  ? incomSelect[0].amount
                  : user.expenses?.amount
                : edit.amount
            }
            onChange={onChange}
          />
        </div>
        <div className="Edit__label_input">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={
              edit.category === ""
                ? location.state === "Incom"
                  ? incomSelect[0].category
                  : user.expenses?.category
                : edit.category
            }
            onChange={onChange}
          />
        </div>
        <button className="Edit__button_submit" type="submit">
          Update!
        </button>
      </form>
    </div>
  );
}
