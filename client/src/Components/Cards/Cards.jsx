import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./Cards.css";
import {
  editIncom,
  deleteIncom,
  editExpense,
  deleteExpense,
} from "../../Redux/Actions";
import Arrow_down from "../../img/Arrow_down.png";
import Arrow_up from "../../img/Arrow_up.png";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import deleteIcon from "../../img/borrar.png";
import editIcon from "../../img/editar.png";

export default function Cards(props) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [data, setData] = useState({
    id: props.id,
    concept: props.concept,
    category: props.category,
    amount: props.amount,
  });

  const onChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const onDeleteIncom = (e) => {
    e.preventDefault();
    Swal.fire({
      title: `Are you sure deleted this ${props.type}?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteIncom(e.target.value));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (result.isDenied) {
        navigate("/home");
      }
    });
  };

  const onDeleteExpense = (e) => {
    Swal.fire({
      title: `Are you sure deleted this ${props.type}?`,
      showDenyButton: true,
      confirmButtonText: "Yes",
      denyButtonText: `No`,
    }).then((result) => {
      if (result.isConfirmed) {
        dispatch(deleteExpense(e.target.value));
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      } else if (result.isDenied) {
        navigate("/home");
      }
    });
  };

  console.log(props.type);

  return (
    <div className="item">
      <section className="section_buttons">
        <h3>{props.concept}</h3>
        <div className="buttons">
          <aside>
            <Link
              to={`/edit/${props.id}`}
              state={props.type}
              value={props.id}
            ></Link>
            <img src={editIcon} width="25" height="25" />
          </aside>
          <aside>
            <button
              onClick={props.type === "Incom" ? onDeleteIncom : onDeleteExpense}
              value={props.id}
            ></button>
            <img src={deleteIcon} width="25" height="25" />
          </aside>
        </div>
      </section>
      <section className="section_info">
        <h3>Amount: ${props.amount}</h3>
        <h3>Category: {props.category}</h3>
        <h3>Date: {props.date}</h3>
      </section>
    </div>
  );
}
