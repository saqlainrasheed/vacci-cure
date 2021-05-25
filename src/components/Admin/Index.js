import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { LOGOUT } from "../../constants";
import profile from "../../images/profile.png";
import "./style.css";

import jwt_decode from "jwt-decode";
import moment from "moment";

export default function Index({ logo }) {
  let token = localStorage.getItem("token");
  const { authorized } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [child, setChild] = useState([]);
  // const [hospital, setHospital] = useState([]);
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [checkNewPassword, setCheckNewPassword] = useState("");
  const [passErr, setPassErr] = useState("");

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (oldPassword === newPassword) {
      return setPassErr("Old and new passwords are same...");
    }
    if (newPassword !== checkNewPassword) {
      return setPassErr("New password and Re-enter password does not  match.");
    }

    fetch("http://localhost:5000/api/change-password", {
      method: "put",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        oldPassword,
        newPassword,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.message === "No user found.") return setPassErr(data.message);
        setPassErr(data.message);
        document.querySelector("#close").click();
        const alert = document.getElementById("alert");
        alert.classList.remove("alert-danger");
        alert.classList.add("alert-success");
      })
      .catch((err) => {
        setPassErr("An internal error occurs.");
      });
  };

  useEffect(() => {
    fetch("http://localhost:5000/api/all-childs")
      .then((res) => res.json())
      .then((data) => setChild(data))
      .catch((err) => console.log);

    fetch("http://localhost:5000/api/all-hospitals")
      .then((res) => res.json())
      .then((data) => setAllRegisterHospitals(data))
      .catch((err) => console.log);
  }, []);

  let decoded = "";
  try {
    decoded = jwt_decode(token);
  } catch (e) {
    console.log(e);
  }
  const [allRegistereBy, setAllRegistereBy] = useState([]);
  const [allRegisterHospitals, setAllRegisterHospitals] = useState([]);

  const getAll = () => {
    fetch("http://localhost:5000/api/all-childs")
      .then((res) => res.json())
      .then((data) => setAllRegistereBy(data));
  };

  const getAllHospitals = () => {
    fetch("http://localhost:5000/api/all-hospital")
      .then((res) => res.json())
      .then((data) => setAllRegisterHospitals(data));
  };

  const handleHospitalDelete = (e) => {
    const id = e.target.id;
    fetch(`http://localhost:5000/api/hospital/${id}`, {
      method: "delete",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setAllRegisterHospitals(data);
      })
      .catch((err) => console.log);
  };

  if (!authorized) {
    return <Redirect to="/login" />;
  }

  const handleEdit = (e) => {
    return;
  };

  const handleDelete = (e) => {
    const id = e.target.id;
    console.log(id);
    fetch(`http://localhost:5000/api/child/${id}`, {
      method: "delete",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setChild(data);
        setAllRegistereBy(data);
      })
      .catch((err) => console.log);
  };

  const logout = () => {
    return {
      type: LOGOUT,
      payload: {
        user: [],
        authorized: false,
      },
    };
  };

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  return (
    <>
      {/* Navbar will go here */}
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand d-flex flex-auto" href="/">
            <img src={logo} alt="Vacci-cure logo" width="150px" />
          </a>
          <button
            className="navbar-toggler"
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
              <li className="nav-item"></li>
              <div className="d-flex float-right">
                <li className="nav-item">
                  <div className="dropdown">
                    <button
                      className="btn btn-primary"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      + new
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <a className="dropdown-item" href="/add-child">
                          Register Child
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/register">
                          new-user
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/register-hospital">
                          Register Hospital
                        </a>
                      </li>
                    </ul>
                  </div>
                </li>
                <li className="nav-item ms-2">
                  <div className="dropdown">
                    <button
                      className="btn"
                      type="button"
                      id="dropdownMenuButton1"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <img
                        src={profile}
                        alt="Profile"
                        style={{ width: "2rem", borderRadius: "100%" }}
                      />
                    </button>
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="dropdownMenuButton1"
                    >
                      <li>
                        <button
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#changePasswordModal"
                        >
                          Change Password
                        </button>
                      </li>
                      <li>
                        {/* <a className="dropdown-item" href="/edit-profile">
                          Edit profile
                        </a> */}
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={(e) => {
                            handleLogout(e);
                          }}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      <div
        className="modal fade"
        id="changePasswordModal"
        tabIndex="-1"
        aria-labelledby="changePasswordModaLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Change Password
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                id="close"
              ></button>
            </div>
            <div className="modal-body">
              {passErr ? (
                <div className="alert alert-danger" id="alert" role="alert">
                  {passErr}
                </div>
              ) : (
                ""
              )}
              <label className="form-label mt-3" htmlFor="password">
                Old Password
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                onChange={(e) => setOldPassword(e.target.value)}
              />
              <label className="form-label mt-3" htmlFor="password">
                New Password
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                onChange={(e) => setNewPassword(e.target.value)}
              />
              <label className="form-label mt-3" htmlFor="password">
                Re-enter New Password
              </label>
              <input
                className="form-control"
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                onChange={(e) => setCheckNewPassword(e.target.value)}
              />
            </div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-primary"
                onClick={(e) => handleChangePassword(e)}
              >
                Change password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* // Two grid view will go here 
      //1 --> total registered child 
      //2 --> total
      registered hospitals */}
      <main className="container d-flex mt-5 mb-5 ">
        <div className="row">
          <div className="col-sm-6">
            <div className="card p-4">
              <div className="card-body">
                <h5 className="card-title">Total Registered Child</h5>
                <p className="card-text h1">{child.length}</p>
                <button
                  to="/"
                  className="text-center d-float btn btn-success text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#viewAllRegistered"
                  onClick={(e) => getAll(e)}
                >
                  View all
                </button>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card p-4">
              <div className="card-body">
                <h5 className="card-title">Total Registered Hospitals</h5>
                <p className="card-text h1">{allRegisterHospitals.length}</p>
                <button
                  to="/"
                  className="text-center d-float btn btn-success text-white"
                  data-bs-toggle="modal"
                  data-bs-target="#viewAllHospitals"
                  onClick={(e) => getAllHospitals(e)}
                >
                  View all
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div
        className="modal fade"
        id="viewAllRegistered"
        tabIndex="-1"
        aria-labelledby="viewAllRegisteredLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                All Register Childs
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Dob</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allRegistereBy.length
                    ? allRegistereBy.map((item, index) => {
                        return (
                          <tr key={index} id={item.child_id}>
                            <td>{item.name}</td>
                            <td>
                              {moment
                                .utc(item.dob, "YYYY-MM-DD hh:mm:ss a")
                                .format("D/M/YYYY")}
                            </td>
                            <td>
                              <button
                                id={item.child_id}
                                className="btn btn-danger"
                                onClick={(e) => handleDelete(e)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : "No child Registered yet"}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <div
        className="modal fade"
        id="viewAllHospitals"
        tabIndex="-1"
        aria-labelledby="viewAllHospitalsLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                All Register Hospitals
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <table className="table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact number</th>
                    <th>Delete</th>
                  </tr>
                </thead>
                <tbody>
                  {allRegisterHospitals.length
                    ? allRegisterHospitals.map((item, index) => {
                        return (
                          <tr key={index} id={item.hospital_id}>
                            <td>{item.hospital_name}</td>
                            <td>{item.contact_number}</td>
                            <td>
                              <button
                                id={item.hospital_id}
                                className="btn btn-danger"
                                onClick={(e) => handleHospitalDelete(e)}
                              >
                                Delete
                              </button>
                            </td>
                          </tr>
                        );
                      })
                    : "No Hospital Registered yet"}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* // Here we will show the list registered users */}

      <div className="container">
        <h2 className="h2 text-center user-list mb-4">
          Recent Registered Childs
        </h2>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Child name</th>
              <th scope="col">Father name</th>
              <th scope="col">DOB</th>
              <th scope="col">actions</th>
            </tr>
          </thead>
          <tbody>
            {child.map((child, index) => {
              return (
                <tr key={index}>
                  <th scope="row">{index + 1}</th>
                  <td>{child.name}</td>
                  <td>{child.father_name}</td>
                  <td>{child.dob.split("T")[0]} </td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={(e) => handleEdit(e)}
                    >
                      edit
                    </button>
                    <button
                      id={child.child_id}
                      className="btn btn-danger mx-2"
                      onClick={(e) => handleHospitalDelete(e)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
}
