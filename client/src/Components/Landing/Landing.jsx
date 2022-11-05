import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import image from "../../img/Landing_money.png";
export default function Landing() {
  return (
    <div className="Landing__container">
      <div className="Landing__overview">
        <div className="img">
          <h1>Control your finance!</h1>
          <img src={image} alt="" width={300} height={300} />
        </div>

        <div className="Landing__card">
          <h1 className="Landing__title">Welcome!</h1>
          <h4 className="Landing__description">Choose the option to enter!</h4>
          <div>
            <Link to={"/login"}>
              <button className="Landing__button">Login</button>
            </Link>
            <Link to={"/register"}>
              <button className="Landing__button">Register</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
