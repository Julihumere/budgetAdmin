import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postUsers } from "../../Redux/Actions";
import "./Register.css";
import Swal from "sweetalert2";
export default function Register() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState({});

  const onChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const validate = (input) => {
    let errors = {};
    if (!input.firstName) {
      errors.firstName = "Firstname is required";
    }
    if (!input.lastName) {
      errors.lastName = "Lastname is required";
    }
    if (!input.email) {
      errors.email = "Email is required";
    } else if (
      !/^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/.test(input.email)
    ) {
      errors.email = "Email shoul be [...]@[...].com";
    }
    if (!input.password) {
      errors.password = "Password is required";
    }
    return errors;
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setError(validate(user));
    const err = validate(user);
    if (Object.values(err).length !== 0) {
      Swal.fire({
        title: "Please, correct the errors",
        icon: "error",
        confirmButtonText: "Ok",
      });
    } else {
      setTimeout(() => {
        dispatch(postUsers(user));
        navigate("/login");
      }, 3000);
    }
  };

  return (
    <div className="Register__container">
      <form onSubmit={onSubmit} className="Register__form Register__card">
        <div className="Register__card_header">
          <h1 className="Register__form_heading">Sign up</h1>
        </div>

        {/* firstName */}
        <div className="Register__field">
          <label>Firstname</label>
          <input
            className="Register__input"
            type="text"
            placeholder="Firstname"
            name="firstName"
            value={user.firstName}
            onChange={onChange}
          />
          {error.firstName && <p className="error">{error.firstName}</p>}
        </div>
        {/* lastName */}
        <div className="Register__field">
          <label>Lastname</label>
          <input
            className="Register__input"
            type="text"
            placeholder="Lastname"
            name="lastName"
            value={user.lastName}
            onChange={onChange}
          />
          {error.lastName && <p className="error">{error.lastName}</p>}
        </div>
        {/* email */}
        <div className="Register__field">
          <label>Email</label>
          <input
            className="Register__input"
            type="text"
            placeholder="Email"
            name="email"
            value={user.email}
            onChange={onChange}
          />
          {error.email && <p className="error">{error.email}</p>}
        </div>
        <div className="Register__field">
          <label for="password">Password</label>
          <input
            className="Register__input"
            type="password"
            placeholder="Password"
            id="password"
            name="password"
            value={user.password}
            onChange={onChange}
          />
          {error.password && <p className="error">{error.password}</p>}
        </div>
        <div className="Register__field">
          <button type="submit" className="Register__button">
            Register
          </button>
        </div>
      </form>
    </div>
  );
}
