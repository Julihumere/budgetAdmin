import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
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
  const [user] = useState({
    email: email,
  });
  console.log(email);
  useEffect(() => {
    dispatch(getUser(email));
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
      {email !== undefined ? (
        <button onClick={handleLogOut}>
          Logout <GrLogout />
        </button>
      ) : null}
    </div>
  );
}
