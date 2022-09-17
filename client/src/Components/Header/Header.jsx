import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Header.css";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { getUser } from "../../Redux/Actions";
import logo from "../../img/Coin flip.gif";
import { GrLogout } from "react-icons/gr";
import Cookies from "universal-cookie";

export default function Header() {
  const cookies = new Cookies();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const password = cookies.get("password");
  const email = cookies.get("email");
  const [user, setUser] = useState({
    email: email,
    password: password,
  });
  const name = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser(email));
  }, [email]);

  const handleLogOut = (e) => {
    axios({
      method: "put",
      url: "http://localhost:3001/user/logout",
      data: {
        email: user.email,
        password: user.password,
      },
    })
      .then(cookies.remove("email"))
      .then(navigate("/"));
  };
  return (
    <div className="Header__container">
      <div className="Header__title">
        <img src={logo} alt="" className="Header__img" />
        <Link to={"/home"}>
          <h1>Budget Admin</h1>
        </Link>
      </div>
      <button onClick={handleLogOut}>
        Logout <GrLogout />
      </button>
    </div>
  );
}
