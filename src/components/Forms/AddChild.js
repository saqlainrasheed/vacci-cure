import React, { useState } from "react";
import { useHistory } from "react-router";
import "./forms.css";
import jwt_decode from "jwt-decode";
import { Link } from "react-router-dom";
import addChildImage from "../../images/addChildImage.jpg";

function AddChild({ logo }) {
  const [childName, setChildName] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const [placeOfBirth, setPlaceOfBirth] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [address, setAddress] = useState("");

  const history = useHistory();

  const handleSubmit = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");
    let decoded = "";

    try {
      decoded = jwt_decode(token);
    } catch (e) {
      console.log(e);
    }

    fetch("http://localhost:5000/api/register-child", {
      method: "post",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: childName,
        father_name: fatherName,
        dob: dateOfBirth,
        place_of_birth: placeOfBirth,
        contact_number: contactNumber,
        address: address,
        registered_by: decoded.email,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (decoded.user_role === "hospital") {
          history.push("/hospital");
        } else if (decoded.user_role === "admin") {
          history.push("/admin");
        } else {
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
                  <Link
                    className="nav-link"
                    // style={{ backgroundColor: "red" }}
                    id="loginBtn"
                    to="/logout"
                  >
                    Logout
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <div className="container form-conatainer pb-5">
        <main className="form">
          <legend className="h1">Register a child</legend>
          <form method="post" onSubmit={(e) => handleSubmit(e)}>
            <div className="row">
              <div className="col-6">
                <input
                  className="form-control"
                  placeholder="Child name *"
                  type="text"
                  name="child-name"
                  id="child-name"
                  onChange={(e) => setChildName(e.target.value)}
                  required
                />

                <input
                  className="form-control"
                  placeholder="Father/Gaurdian name *"
                  type="text"
                  name="father-name"
                  id="father-name"
                  required
                  onChange={(e) => setFatherName(e.target.value)}
                />

                <label className="form-label" htmlFor="date-of-birth">
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

                <input
                  className="form-control"
                  type="text"
                  name="place-of-birth"
                  placeholder="Place of birth"
                  id="place-of-birth"
                  onChange={(e) => setPlaceOfBirth(e.target.value)}
                />

                <input
                  className="form-control"
                  type="text"
                  name="address"
                  placeholder="Address"
                  id="address"
                  required
                  onChange={(e) => setAddress(e.target.value)}
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
                  className="btn mt-4"
                  type="submit"
                  value="Register child"
                  id="loginLoginBtn"
                />
              </div>
              <div id="middleBorder" className="col-6">
                <img src={addChildImage} alt="illustration" id="loginImage" />
              </div>
            </div>
          </form>
        </main>
      </div>
    </>
  );
}

export default AddChild;
