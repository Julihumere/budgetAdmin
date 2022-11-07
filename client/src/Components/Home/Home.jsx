import React, { useEffect } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../Redux/Actions";
import { Link, useNavigate } from "react-router-dom";
import Cards from "../Cards/Cards";
import Cookies from "universal-cookie";
import Form from "react-bootstrap/Form";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cookieEmail = cookies.get("email");
  const user = useSelector((state) => state.user);
  const incoms = user.incoms && user.incoms;
  const expenses = user.incoms && user.expenses;

  useEffect(() => {
    dispatch(getUser(cookieEmail));
    if (cookies.get("email") !== cookieEmail) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Total Incom
  let totalIncom = 0;
  let sumIncom = user.incoms && user.incoms.map((e) => e.amount);
  for (let i = 0; i < sumIncom?.length; i++) {
    totalIncom += sumIncom[i];
  }

  //Total Expense
  let totalExpense = 0;
  let sumExpense = user.expenses && user.expenses.map((e) => e.amount);
  for (let i = 0; i < sumExpense?.length; i++) {
    totalExpense += sumExpense[i];
  }

  //Total Balance
  let totalBalance = 0;
  if (totalBalance >= 0) {
    totalBalance = totalIncom - totalExpense;
  }

  return (
    <div className="Home__container">
      {/* <div className="Home__filtros">
        <div className="Home__filtros__incom">
          <h1 className="Home__filtros__incom__title">Incom</h1>
          <Form.Select size="sm">
            <option>Small select</option>
            <option>Small select</option>
          </Form.Select>
          <Form.Select size="sm">
            <option>Small select</option>
          </Form.Select>
        </div>
        <div className="Home__filtros__expense">
          <h1>Expense</h1>
          <Form.Select size="sm">
            <option>Small select</option>
            <option>Small select</option>
          </Form.Select>
          <Form.Select size="sm">
            <option>Small select</option>
          </Form.Select>
        </div>
      </div> */}
      <div className="Home__box">
        <header className="Home__box__header">
          <div className="Home__box__add">
            <Link to={"/addIncom"}>
              <button className="Home__Add__button">Add Incom</button>
            </Link>
          </div>
          <div className="Home__box__filter">
            <Link to={"/addExpense"}>
              <button className="Home__Add__button">Add Expense</button>
            </Link>
          </div>
        </header>
        <div className="Home__box__info">
          <div className="incom">
            {incoms &&
              incoms.map((e) => (
                <Cards
                  key={e.id}
                  id={e.id}
                  concept={e.concept}
                  category={e.category}
                  amount={e.amount}
                  date={e.date}
                  type={e.type}
                />
              ))}
          </div>
          <div className="expense">
            {expenses &&
              expenses.map((e) => (
                <Cards
                  key={e.id}
                  id={e.id}
                  concept={e.concept}
                  category={e.category}
                  amount={e.amount}
                  date={e.date}
                  type={e.type}
                />
              ))}
          </div>
        </div>

        <footer className="Home__box__footer">
          <div className="Home__box__total__incom">
            <h1>Total Incom: ${totalIncom}</h1>
          </div>
          <div className="Home__box__total__expense">
            <h1>Total Expense: ${totalExpense}</h1>
          </div>
        </footer>
        <div className="Home__box__total__balance">
          <h1>Balance: ${totalBalance}</h1>
        </div>
      </div>
    </div>
  );
}
