import React, { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { REGISTER } from "../../constants";
import { Link } from "react-router-dom";
import "./forms.css";
import jwt_decode from "jwt-decode";
import regPage from "../../images/regPage.png";

function Registration({ logo }) {
  let token = localStorage.getItem("token");
  let decoded = "";
  try {
    decoded = jwt_decode(token);
  } catch (e) {
    console.log(e);
  }
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const register = (user) => {
    return {
      type: REGISTER,
      payload: {
        user: user,
        authorized: true,
      },
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      let token = localStorage.getItem("token");
      fetch("http://localhost:5000/api/register", {
        method: "post",
        headers: {
          "content-type": "application/json",
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          fullname: name,
          email: email,
          contact_number: contactNumber,
          address: address,
          password: password,
        }),
      })
        .then((res) => res.json())
        .then((user) => {
          if (user) {
            dispatch(register(user));
            if (decoded.user_role === "admin") {
              history.push("/admin");
            } else {
              history.push("/parents");
            }
          }
        })
        .catch((err) => console.log(err.message));
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
                    to="/register-hospital"
                    id="loginRegBtn"
                  >
                    Register as hospital
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

      <div className="container form-conatainer pb-5">
        <div className="row">
          <div className="col-6 d-flex justify-content-center align-items-center">
            <main className="form">
              <legend className="h1">Register as parent</legend>
              <form method="get" onSubmit={(e) => handleSubmit(e)}>
                <div className="row mt-4">
                  <input
                    className="form-control"
                    type="text"
                    name="name"
                    id="name"
                    placeholder="Fullname *"
                    required
                    onChange={(e) => setName(e.target.value)}
                  />

                  <input
                    className="form-control"
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Email *"
                    onChange={(e) => setEmail(e.target.value)}
                  />

                  <input
                    className="form-control"
                    type="tel"
                    name="contact-number"
                    id="contact-number"
                    placeholder="Contact number *"
                    required
                    onChange={(e) => setContactNumber(e.target.value)}
                  />
                  <input
                    className="form-control"
                    type="text"
                    name="address"
                    placeholder="Address"
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

                  <input
                    type="submit"
                    value="Register"
                    className="btn mt-4"
                    id="loginLoginBtn"
                  />
                </div>
              </form>
              <div className="form-text">
                Have Account?{" "}
                <span>
                  <a href="/login">Login</a>
                </span>
                <br />
                <span>
                  <a href="/register-hospital">Register as a hospital.</a>
                </span>
              </div>
            </main>
          </div>
          <div
            id="middleBorder"
            className="col-6 d-flex justify-content-center align-items-center"
          >
            <img
              src={regPage}
              style={{ width: "70%" }}
              alt="illustration"
              id="loginImage"
            />
          </div>
        </div>
      </div>
    </>
  );
}
export default Registration;
