import React, { useState } from "react";
import "./forms.css";
function Registration() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [body, setBody] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();

    if (password === confirmPassword) {
      const innerBody = {
        name,
        email,
        contactNumber,
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
          </div>
        </main>
      </div>
    </>
  );
}
export default Registration;
