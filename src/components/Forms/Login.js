import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { LOGIN } from "../../constants";
import { useDispatch } from "react-redux";

import "./forms.css";
function Login({ logo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();

  const dispatch = useDispatch();

  const login = (user) => {
    return {
      type: LOGIN,
      payload: {
        user: user,
        authorized: true,
      },
    };
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch("http://localhost:5000/api/login", {
      method: "post",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        if (user.user_role === "hospital") {
          dispatch(login(user));
          history.push("/hospital");
        } else if (user.user_role === "admin") {
          dispatch(login(user));
          history.push("/admin");
        } else {
          dispatch(login(user));
          history.push("/parents");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand d-flex flex-auto" href="/">
            <img src={logo} alt="Vacci-cure logo" width="150px" />
          </a>
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
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <div className="d-flex float-right">
                <li className="nav-item">
                  <a
                    className="nav-link btn btn-primary text-light"
                    href="/register"
                  >
                    Register Parent
                  </a>
                </li>
                <li className="nav-item ms-2">
                  <a
                    className="nav-link btn btn-warning text-dark"
                    href="/register-hospital"
                  >
                    Register Hospital
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container form-conatainer">
        <main className="forms">
          <legend className="h1">Login</legend>
          <form method="get" onSubmit={(e) => handleSubmit(e)}>
            <label className="form-label mt-4" htmlFor="email">
              Email
            </label>
            <input
              className="form-control"
              type="email"
              name="email"
              id="email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />

            <label className="form-label mt-3" htmlFor="password">
              Password
            </label>
            <input
              className="form-control"
              type="password"
              name="password"
              id="password"
              autoComplete="current-password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="submit"
              name="submit"
              value="Login"
              className="btn btn-primary mt-4"
            />
          </form>

          <div className="form-text mt-2">
            Not have an account?
            <span>
              <a href="/register">register</a>
            </span>
          </div>
        </main>
      </div>
    </>
  );
}

export default Login;
