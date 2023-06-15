import React, { useEffect, useState } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../Redux/Actions";
import { Link, useNavigate } from "react-router-dom";
import Cards from "../Cards/Cards";
import Cookies from "universal-cookie";
import deleteIcon from "../../img/borrar.png";
import editIcon from "../../img/editar.png";
import add from "../../img/add.png";
import Loading from "../Loading/Loading";

export default function Home() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cookies = new Cookies();
  const cookieEmail = cookies.get("email");
  const user = useSelector((state) => state.user);
  const incoms = user.incoms && user.incoms;
  const expenses = user.expenses && user.expenses;
  let [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
    dispatch(getUser(cookieEmail));
    if (cookies.get("email") !== cookieEmail) {
      navigate("/login");
    }
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
        <section className="info_user">
          <h2>Incoms: ${totalIncom}</h2>
          <h2>Expenses: ${totalExpense}</h2>
          <h2>Balance: ${totalBalance}</h2>
        </section>
        {loading ? (
          <Loading />
        ) : (
          <section className="cards">
            {/* INCOMS */}
            <div className="container_item">
              <div className="addItem">
                <h1>Add Incom</h1>
                <Link to="/addIncom">
                  <img src={add} className="iconAdd" />
                </Link>
              </div>
              {user.incoms?.map((e) => (
                <Cards
                  id={e.id}
                  concept={e.concept}
                  category={e.category}
                  amount={e.amount}
                  date={e.date}
                  type={e.type}
                />
              ))}
            </div>

            {/* EXPENSE */}
            <div className="container_item">
              <div className="addItem">
                <h1>Add Expense</h1>
                <Link to="/addExpense">
                  <img src={add} className="iconAdd" />
                </Link>
              </div>
              {user.expenses?.map((e) => (
                <Cards
                  id={e.id}
                  concept={e.concept}
                  category={e.category}
                  amount={e.amount}
                  date={e.date}
                  type={e.type}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
