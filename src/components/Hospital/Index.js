import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../constants";
import profile from "../../images/profile.png";
import "./style.css";

export default function Index({ logo }) {
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
                  Registered Child by "hospital name"
                </h5>
                <p className="card-text h1">24</p>
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
                <p className="card-text h1">4</p>
                <Link to="/">View all</Link>
              </div>
            </div>
          </div>
        </div>
      </main>

      <div className="container">
        <form className="row">
          <div className="col-8">
            <label htmlFor="inputPassword2" className="visually-hidden">
              Search child by name or ID
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword2"
              placeholder="Search child by name or ID"
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
