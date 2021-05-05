import React, { useState } from "react";
import { useHistory } from "react-router";
import "./forms.css";
function Registration({ logo }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      fetch("http://localhost:5000/api/register", {
        method: "post",
        headers: { "content-type": "application/json" },
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
            history.push("/parents");
          }
        })
        .catch((err) => console.log(err));
    } else {
      alert("Password and confirm password doesn't match");
    }
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
                    href="/login"
                  >
                    Login
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
          <legend className="h1">Register</legend>
          <form method="get" onSubmit={(e) => handleSubmit(e)}>
            <div className="row mt-4">
              <div className="col-6">
                <label className="form-label mt-3" htmlFor="name">
                  Fullname*
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  id="name"
                  required
                  onChange={(e) => setName(e.target.value)}
                />

                <label className="form-label mt-3" htmlFor="email">
                  Email*
                </label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  id="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />

                <label className="form-label mt-3" htmlFor="contact-number">
                  Contact number*
                </label>
                <input
                  className="form-control"
                  type="tel"
                  name="contact-number"
                  id="contact-number"
                  required
                  onChange={(e) => setContactNumber(e.target.value)}
                />
              </div>

              <div className="col-6">
                <label className="form-label mt-3" htmlFor="address">
                  Address
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  id="address"
                  onChange={(e) => setAddress(e.target.value)}
                />

                <label className="form-label mt-3" htmlFor="password">
                  Password*
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="password"
                  id="password"
                  required
                  autoComplete="true"
                  onChange={(e) => setPassword(e.target.value)}
                />

                <label className="form-label mt-3" htmlFor="confirm-password">
                  Confirm password*
                </label>
                <input
                  className="form-control"
                  type="password"
                  name="confirm-password"
                  id="confirm-password"
                  required
                  autoComplete="true"
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <input
                type="submit"
                value="Register"
                className="btn btn-primary mt-3"
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
    </>
  );
}
export default Registration;
