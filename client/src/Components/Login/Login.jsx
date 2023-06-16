import React, { useState, useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./Login.css";
import Swal from "sweetalert2";
import Cookie from "universal-cookie";
import { auth, logIn } from "../../Redux/Actions";

export default function Login() {
  const cookies = new Cookie();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [error] = useState({});
  const msg = useSelector((state) => state.msg);

  useEffect(() => {
    if (msg === "User has started session") {
      cookies.set("email", user.email);
      navigate("/home");
    }
    if (msg === "Password incorrect") {
      Swal.fire({
        title: "Password is incorrect",
        icon: "error",
        confirmButtonText: "Ok",
      });
    }
    if (msg === "User not found") {
      Swal.fire({
        title: "Please, correct the errors",
        text: "Do you want register?",
        icon: "error",
        showDenyButton: "true",
        confirmButtonText: "Ok",
        denyButtonText: "No",
      }).then((result) => {
        if (result.isConfirmed) {
          navigate("/register");
        } else if (result.isDenied) {
          navigate("/");
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [msg]);

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(logIn(user));
  };
  return (
    <div className="Login__container">
      <form onSubmit={onSubmit} class="Login__form Login__card">
        <div class="Login__card_header">
          <h1 class="Login__form_heading">Sign in</h1>
        </div>
        <div class="Login__field">
          <label for="username">Email</label>
          <input
            class="Login__input"
            type="text"
            placeholder="user@example.com"
            id="email"
            name="email"
            value={user.email}
            onChange={onChange}
          />
          {error.email && <p>{error.email}</p>}
        </div>
        <div class="Login__field">
          <label for="password">Password</label>
          <input
            class="Login__input"
            type="password"
            placeholder="*******"
            id="password"
            name="password"
            value={user.password}
            onChange={onChange}
          />
          {error.password && <p>{error.password}</p>}
        </div>
        <div className="Login__field">
          <button type="submit" className="Login__button">
            Login
          </button>
        </div>
      </form>
    </div>
  );
}
