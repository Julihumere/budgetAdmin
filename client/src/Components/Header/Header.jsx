import React, { useState, useEffect } from "react";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../Redux/Actions";
import logo from "../../img/Coin flip.gif";
import { GrLogout } from "react-icons/gr";
import Cookies from "universal-cookie";
import { logOut } from "./../../Redux/Actions";

export default function Header() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const email = cookies.get("email");
  let name = useSelector((state) => state.user);
  const [user] = useState({
    email: email,
  });
  useEffect(() => {
    dispatch(getUser(email));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, dispatch]);

  const handleLogOut = (e) => {
    dispatch(logOut(email));
    cookies.remove("email");
    navigate("/");
  };
  console.log(email);
  return (
    <div className="Header__container">
      <div className="Header__title">
        <img src={logo} alt="" className="Header__img" />
        {email !== undefined ? (
          <Link to={"/home"}>
            <h1>Budget Admin</h1>
          </Link>
        ) : (
          <h1>Budget Admin</h1>
        )}
      </div>
      <div className="Header__info">
        {email !== undefined ? (
          <>
            <h1>Hi, {name.firstName}</h1>
            <button onClick={handleLogOut} className="Header__button__logout">
              <GrLogout />
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
