import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./Cards.css";
import {
  editIncom,
  deleteIncom,
  editExpense,
  deleteExpense,
} from "../../Redux/Actions";
import { AiTwotoneEdit } from "react-icons/ai";
import Arrow_down from "../../img/Arrow_down.png";
import Arrow_up from "../../img/Arrow_up.png";
import ButtonModal from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

export default function Cards(props) {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
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

  const onDelete = (e) => {
    if (props.type === "Incom") {
      dispatch(deleteIncom(e.target.value));
    } else {
      dispatch(deleteExpense(e.target.value));
    }
    return window.location.reload();
  };

  const onSubmit = () => {
    dispatch(editIncom(data));
    dispatch(editExpense(data));
  };

  return (
    <div>
      <div className="Card__container">
        <div className="Card__button">
          <button onClick={handleShow}>
            <AiTwotoneEdit />
          </button>

          <button type="submit" value={data.id} onClick={onDelete}>
            X
          </button>
        </div>
        <div className="Card__img">
          {props.type === "Expense" ? (
            <img src={Arrow_down} alt="" />
          ) : (
            <img src={Arrow_up} alt="" />
          )}
        </div>
        <div className="Card__info">
          <span>{props.concept}</span>
          <p className="category">Category: {props.category}</p>
          <p className="amount">Amount: ${props.amount}</p>
          <p className="date">{props.date}</p>
        </div>
      </div>
      <div class="modal-body">
        <div class="container-fluid"></div>
        <div class="modal-footer"></div>
      </div>
      <>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit {props.type}</Modal.Title>
          </Modal.Header>
          <form className="Modal__form" onSubmit={onSubmit}>
            <Modal.Body>
              <label htmlFor="">Concept</label>
              <input
                type="text"
                name="concept"
                value={data.concept}
                onChange={onChange}
              />
              <label htmlFor="">Category</label>
              <input
                type="text"
                name="category"
                value={data.category}
                onChange={onChange}
              />
              <label htmlFor="">Amount</label>
              <input
                type="text"
                name="amount"
                value={data.amount}
                onChange={onChange}
              />
            </Modal.Body>
            <Modal.Footer>
              <ButtonModal
                type="submit"
                style={{ backgroundColor: "#560bad", border: "none" }}
                onClick={handleClose}
              >
                Save Changes
              </ButtonModal>
            </Modal.Footer>
          </form>
        </Modal>
      </>
    </div>
  );
}
