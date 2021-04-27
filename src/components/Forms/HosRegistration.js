import React, { useState } from "react";
import "./forms.css";

function HosRegistration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNum, setPhoneNum] = useState("");
  const [address, setAddress] = useState("");
  const [publicOrPrivate, setPublicOrprivate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [body, setBody] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const innerBody = {
        name,
        email,
        phoneNum,
        publicOrPrivate,
        address,
        password,
        confirmPassword,
      };
      setBody(innerBody);
      console.log("submitted : ", body);
    } else {
      console.log("Passwords doesn't match");
    }
  };

  return (
    <>
      <div className="container">
        <main className="forms">
          <legend className="h1">Register</legend>
          <form method="get" onClick={(e) => handleSubmit(e)}>
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

                <label className="form-label mt-3" htmlFor="phone-number">
                  Contact number*
                </label>
                <input
                  className="form-control"
                  type="tel"
                  name="phone-number"
                  id="phone-number"
                  required
                  onChange={(e) => setPhoneNum(e.target.value)}
                />

                <label className="form-label mt-3" htmlFor="email-address">
                  Govt or Private
                </label>
                <select
                  className="form-select"
                  onChange={(e) => setPublicOrprivate(e.target.value)}
                >
                  <option>Select a value</option>
                  <option>Govt</option>
                  <option>Private</option>
                  <option>Semi_Govt</option>
                </select>
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
    </>
  );
}

export default HosRegistration;
