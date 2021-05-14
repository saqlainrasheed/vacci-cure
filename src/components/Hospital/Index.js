import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../constants";
import profile from "../../images/profile.png";
import "./style.css";
import jwt_decode from "jwt-decode";

export default function Index({ logo }) {
  let token = localStorage.getItem("token");
  const decoded = jwt_decode(token);

  const [hospitalData, setHospitalData] = useState([]);
  const [number, setNumber] = useState("");
  const [child, setChild] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:5000/api/hospital/${decoded.hospital_id}`, {
      method: "get",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setHospitalData(data))
      .catch((err) => console.log(err));
  }, [token, decoded.hospital_id]);

  const completely_vaccinated = hospitalData.filter(
    (item) => item.increment >= 5
  );

  //react mapStateToProps and MapDispatchToprops hooks
  const { authorized } = useSelector((state) => state);
  const dispatch = useDispatch();

  if (!authorized) {
    return <Redirect to="/login" />;
  }
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

  const handleSearch = (e) => {
    e.preventDefault();

    fetch(`http://localhost:5000/api/child/${number}`, {
      method: "get",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          console.log(data);
          // setChild(data);
        } else {
          console.log({ message: "No Child found against this number." });
        }
      });
  };

  // console.log(child);

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand d-flex flex-auto" to="/homepage">
            <img src={logo} alt="Vacci-cure logo" width="150px" />
          </Link>
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
                  <Link to="/add-child" className="btn btn-primary">
                    + Register child
                  </Link>
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
                        <Link className="dropdown-item" to="/change-password">
                          Change Password
                        </Link>
                      </li>
                      <li>
                        <Link className="dropdown-item" to="/edit-profile">
                          Edit profile
                        </Link>
                      </li>
                      <li>
                        <button
                          className="dropdown-item"
                          onClick={(e) => handleLogout(e)}
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

      {/* grid here */}

      <main className="container d-flex mt-5 mb-5 ">
        <div className="row">
          <div className="col-sm-6">
            <div className="card p-4">
              <div className="card-body">
                <h5 className="card-title">
                  Registered Child by {decoded.hospital_name}
                </h5>
                <p className="card-text h1">{hospitalData.length}</p>
                <Link to="/" className="text-end">
                  View all
                </Link>
              </div>
            </div>
          </div>
          <div className="col-sm-6">
            <div className="card p-4">
              <div className="card-body">
                <h5 className="card-title">Completely vaccinated</h5>
                <p className="card-text h1">{completely_vaccinated.length}</p>
                <Link to="/">View all</Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="container">
        <form className="row" onSubmit={(e) => handleSearch(e)}>
          <div className="col-8">
            <label htmlFor="number" className="visually-hidden">
              Search child by contact number...
            </label>
            <input
              onChange={(e) => setNumber(e.target.value)}
              type="text"
              className="form-control"
              id="search"
              required
              placeholder="Search child by contact number..."
            />
          </div>
          <div className="col-4">
            <button type="submit" className="btn btn-primary mb-3">
              Search
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
