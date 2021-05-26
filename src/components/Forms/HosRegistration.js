import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { REGISTER_HOSPITAL } from "../../constants";
import hero from "../../images/hero.png";
import "./forms.css";
import jwt_decode from "jwt-decode";

function HosRegistration({ logo }) {
  let token = localStorage.getItem("token");
  let decoded = "";
  try {
    decoded = jwt_decode(token);
  } catch (e) {
    console.log(e);
  }
  const history = useHistory();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");
  const [publicOrPrivate, setPublicOrprivate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const dispatch = useDispatch();

  const registerHospital = (user) => {
    return {
      type: REGISTER_HOSPITAL,
      payload: {
        user: user,
        authorized: true,
      },
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      fetch("http://localhost:5000/api/register-hospital", {
        method: "post",
        mode: "cors",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({
          hospital_name: name,
          email: email,
          contact_number: phoneNum,
          govt_private: publicOrPrivate,
          password: password,
          address: address,
          user_role: "hospital",
        }),
      })
        .then((res) => res.json())
        .then((user) => {
          dispatch(registerHospital(user));
          if (decoded.user_role === "admin") {
            history.push("/admin");
          } else {
            history.push("/hospital");
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Password and confirm password doesn't match");
    }
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container">
          <button
            className="navbar-toggler "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse " id="navbarNav">
            <ul className="navbar-nav w-100 d-flex justify-content-between">
              <li className="nav-item">
                <Link className="navbar-brand d-flex flex-auto" to="/">
                  <img src={logo} alt="Vacci-cure logo" width="150px" />
                </Link>
              </li>
              <div className="d-flex float-right  justify-content-center align-items-center">
                <li className="nav-item">
                  <Link className="nav-link" aria-current="page" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item ms-2">
                  <Link
                    className="nav-link btn"
                    to="/register"
                    id="loginRegBtn"
                  >
                    Register as parent
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <Link className="nav-link" id="loginBtn" to="/login">
                    Login
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container form-conatainer pb-4">
        <div className="row">
          <div className="col-6">
            <main className="form">
              <legend className="h1">Register Hospital</legend>
              <form method="get" onSubmit={(e) => handleSubmit(e)}>
                <div className="row mt-4">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    required
                    placeholder="Hospital name *"
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email *"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    className="form-control"
                    type="tel"
                    name="phone-number"
                    id="phone-number"
                    placeholder="Phone number *"
                    required
                    onChange={(e) => setPhoneNum(e.target.value)}
                  />

                  <select
                    className="form-control"
                    onChange={(e) => setPublicOrprivate(e.target.value)}
                  >
                    <option>Govt or private⤵</option>
                    <option>Govt</option>
                    <option>Private</option>
                    <option>Semi_Govt</option>
                  </select>

                  <input
                    placeholder="Address"
                    className="form-control"
                    type="text"
                    name="address"
                    id="address"
                    onChange={(e) => setAddress(e.target.value)}
                  />

                  <input
                    className="form-control"
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Password *"
                    required
                    autoComplete="true"
                    onChange={(e) => setPassword(e.target.value)}
                  />

                  <input
                    className="form-control"
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="Re-enter password *"
                    required
                    autoComplete="true"
                    onChange={(e) => setConfirmPassword(e.target.value)}
                  />
                  <br />
                  <input
                    type="submit"
                    value="Register hospital ➡"
                    className="btn mt-4"
                    id="loginLoginBtn"
                  />
                </div>
              </form>
              <div className="form-text">
                Have Account?
                <span>
                  <a href="/login">Login</a>
                </span>
                <br />
                <span>
                  <a href="/register">Register a user</a>
                </span>
              </div>
            </main>
          </div>
          <div
            id="middleBorder"
            className="col-6 d-flex justify-content-center align-items-center"
          >
            <img
              src={hero}
              id="loginImage"
              style={{ width: "90%" }}
              alt="illustration"
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default HosRegistration;
