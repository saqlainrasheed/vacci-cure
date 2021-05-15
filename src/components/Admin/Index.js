import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { LOGOUT } from "../../constants";
import profile from "../../images/profile.png";
import "./style.css";

export default function Index({ logo }) {
  const { authorized } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [child, setChild] = useState([]);
  const [hospital, setHospital] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/all-childs")
      .then((res) => res.json())
      .then((data) => setChild(data))
      .catch((err) => console.log);

    fetch("http://localhost:5000/api/all-hospitals")
      .then((res) => res.json())
      .then((data) => setHospital(data))
      .catch((err) => console.log);
  }, []);

  console.log(hospital);

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
      .then((data) => setChild(data))
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
                        <a className="dropdown-item" href="/change-password">
                          Change Password
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="/edit-profile">
                          Edit profile
                        </a>
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
                <a href="/" className="text-end">
                  View all
                </a>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card p-4">
              <div className="card-body">
                <h5 className="card-title">Total Registered Hospitals</h5>
                <p className="card-text h1">{hospital.length}</p>
                <a href="/">View all</a>
              </div>
            </div>
          </div>
        </div>
      </main>

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
                      onClick={(e) => handleDelete(e)}
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
