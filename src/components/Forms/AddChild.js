import React, { useState } from "react";
import "./forms.css";
function AddChild({ logo }) {
  const [childName, setChildName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  const [body, setBody] = useState({});
  const handleSubmit = (e) => {
    e.preventDefault();
    const innerBody = {
      childName,
      fatherName,
      dateOfBirth,
      placeOfBirth,
      contactNumber,
      address,
    };
    setBody(innerBody);
    console.log("Form submitted with values : ", body);
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
                    href="/logout"
                  >
                    Logout
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container form-conatainer">
        <main className="forms">
          <legend className="h1">Register a child</legend>
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="col-6">
                <label className="form-label mt-3" htmlFor="email-address">
                  Child name*
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="child-name"
                  id="child-name"
                  onChange={(e) => setChildName(e.target.value)}
                  required
                />

                <label className="mt-3 form-label" htmlFor="father-name">
                  Father name*
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="father-name"
                  id="father-name"
                  required
                  onChange={(e) => setFatherName(e.target.value)}
                />

                <label className="form-label mt-3" htmlFor="date-of-birth">
                  Date of birth*
                </label>
                <input
                  className="form-control"
                  type="date"
                  name="date-of-birth"
                  id="date-of-birth"
                  required
                  onChange={(e) => setDateOfBirth(e.target.value)}
                />
              </div>

              <div className="col-6">
                <label className="form-label mt-3" htmlFor="password">
                  Place of birth
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="place-of-birth"
                  id="place-of-birth"
                  onChange={(e) => setPlaceOfBirth(e.target.value)}
                />

                <label className="form-label mt-3" htmlFor="address">
                  Address*
                </label>
                <input
                  className="form-control"
                  type="text"
                  name="address"
                  id="address"
                  required
                  onChange={(e) => setAddress(e.target.value)}
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
            </div>

            <input
              className="btn btn-primary mt-3"
              type="submit"
              value="Register child"
            />
          </form>
        </main>
      </div>
    </>
  );
}

export default AddChild;
