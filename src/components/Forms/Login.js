import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { LOGIN } from "../../constants";
import { useDispatch } from "react-redux";
import hospital from "../../images/hospital.png";

import "./forms.css";
function Login({ logo }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const history = useHistory();
  const [errMsg, setErrMsg] = useState("");

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
    let token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/login", {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    })
      .then((res) => res.json())
      .then((user) => {
        const { data, token } = user;
        setErrMsg(user.message);
        localStorage.setItem("token", `Bearer ${token}`);
        if (data.user_role === "hospital") {
          dispatch(login(data));
          history.push("/hospital");
        } else if (data.user_role === "admin") {
          dispatch(login(data));
          history.push("/admin");
        } else {
          dispatch(login(data));
          history.push("/parents");
        }
      })
      .catch((err) => console.log(err));
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
                  <Link className="nav-link" to="/register">
                    Register as parent
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
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container form-conatainer">
        <div className="row">
          <div className="col-6">
            <main className="form" id="loginFirstCol">
              <legend className="h1">Login</legend>
              <form method="get" onSubmit={(e) => handleSubmit(e)}>
                {errMsg ? <p className="text-danger alert">{errMsg}</p> : ""}
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  required
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                />

                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <input type="checkbox" name="checkbox" id="rememberMe" />
                <span>Remember me!</span>
                <br />
                <br />

                <input
                  type="submit"
                  name="submit"
                  value="Login"
                  id="loginLoginBtn"
                  className="btn  mt-4"
                />
              </form>

              <div className="form-text mt-2">
                Not have an account?
                <span>
                  <a href="/register">Register</a>
                </span>
              </div>
            </main>
          </div>

          <div className="col-6">
            <img src={hospital} id="loginImage" alt="Illustration" />
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
