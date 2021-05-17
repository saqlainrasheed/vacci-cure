import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { LOGOUT } from "../../constants";
import profile from "../../images/profile.png";
import "./style.css";
import jwt_decode from "jwt-decode";
import moment from "moment";

export default function Index({ logo }) {
  let token = localStorage.getItem("token");

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
        setPassErr(err.message);
      });
  };

  let decoded = "";
  try {
    decoded = jwt_decode(token);
  } catch (e) {
    console.log(e);
  }
  //react mapStateToProps and MapDispatchToprops hooks
  const { authorized, user } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [hospitalData, setHospitalData] = useState([]);
  const [number, setNumber] = useState("");
  const [child, setChild] = useState({});

  useEffect(() => {
    if (number === "") {
      setChild({});
    }

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
  }, [token, decoded.hospital_id, number, authorized]);

  const completely_vaccinated = hospitalData.filter(
    (item) => item.increment >= 5
  );

  const logout = () => {
    return {
      type: LOGOUT,
      payload: {
        user: [],
        authorized: false,
      },
    };
  };

  const handleSearch = (e) => {
    e.preventDefault();
    let token = localStorage.getItem("token");

    fetch(`http://localhost:5000/api/child/${number}`, {
      method: "get",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.length) {
          setChild(data[0]);
        } else {
          console.log({ message: "No Child found against this number." });
        }
      });
  };

  const handleCheck = (e) => {
    // e.preventDefault();
    const id = e.target.id;
    const name = e.target.className.toLowerCase();

    fetch(`http://localhost:5000/api/child/vaccine/${id}/${name}`, {
      method: "post",
      mode: "cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value: e.target.checked }),
    })
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  const handleLogout = (e) => {
    localStorage.removeItem("token");
    dispatch(logout());
  };

  if (!authorized || user.length === 0) {
    return <Redirect to="/login" />;
  }

  const vaccineInfo = [
    {
      name: "BCG",
      disease: "Child Tb",
      time: 0,
      isDone: child ? child.bcg : "",
    },
    {
      name: "OPV_0",
      disease: "Polio",
      time: 0,
      isDone: child ? child.opv_0 : "",
    },
    {
      name: "Pentavalent_1",
      disease: "Cough/Hapatites",
      time: 42,
      isDone: child ? child.pentavalent_1 : "",
    },
    {
      name: "OPV_1",
      disease: "Polio",
      time: 42,
      isDone: child ? child.opv_1 : "",
    },
    {
      name: "PCV_1",
      disease: "Phneumonia",
      time: 42,
      isDone: child ? child.pcv_1 : "",
    },
    {
      name: "Pentavalent_2",
      disease: "Cough/Hapatites",
      time: 75,
      isDone: child ? child.pentavalent_2 : "",
    },
    {
      name: "OPV_2",
      disease: "Polio",
      time: 75,
      isDone: child ? child.opv_2 : "",
    },
    {
      name: "PCV_2",
      disease: "Polio",
      time: 75,
      isDone: child ? child.pcv_2 : "",
    },
    {
      name: "Pentavalent_3",
      disease: "Cough/Hapatites",
      time: 105,
      isDone: child ? child.pentavalent_3 : "",
    },
    {
      name: "OPV_3",
      disease: "Polio",
      time: 105,
      isDone: child ? child.opv_3 : "",
    },
    {
      name: "PCV_3",
      disease: "Polio",
      time: 105,
      isDone: child ? child.pcv_3 : "",
    },
    {
      name: "IPV",
      disease: "Phneumonia",
      time: 105,
      isDone: child ? child.ipv : "",
    },
    {
      name: "MEASLES_1",
      disease: "Chiken pox",
      time: 270,
      isDone: child ? child.measles_1 : "",
    },
    {
      name: "MEASLES_2",
      disease: "Chiken pox",
      time: 455,
      isDone: child ? child.measles_2 : "",
    },
  ];
  // let dob = child[0] ? new Date(child.dob) : "";

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
                        <button
                          className="dropdown-item"
                          data-bs-toggle="modal"
                          data-bs-target="#changePasswordModal"
                        >
                          Change Password
                        </button>
                      </li>
                      <li>
                        {/* <Link className="dropdown-item" to="/edit-profile">
                          Edit profile
                        </Link> */}
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

      {Object.keys(child).length !== 0 ? (
        <main>
          <div className="container">
            <div className="row mt-5">
              <div className="col-6">
                <h3 className="text-black-50">Child Information</h3>
                <div className="info-wrapper mt-5 mb-5">
                  <h1>{child.name}</h1>
                  <p>
                    Date of birth :
                    {moment
                      .utc(child.dob, "YYYY-MM-DD hh:mm:ss a")
                      .format("D/M/YYYY")}
                    {/* {`${dob.getDate()}/${dob.getMonth()}/${dob.getFullYear()} `} */}
                  </p>
                  <h3>S/O: {child.father_name} </h3>
                  <p>Contact: {child.contact_number} </p>
                </div>
              </div>
              <div className="col-6">
                <h3 className="text-black-50">Schedule</h3>
                <div className="schedule-wrapper info-wrapper mt-5 mb-5">
                  <table className="table">
                    <thead>
                      <tr>
                        <th>Vaccine</th>
                        <th>Disease</th>
                        <th>Date of Vaccination</th>
                        <th>Vaccinated</th>
                      </tr>
                    </thead>
                    <tbody>
                      {vaccineInfo.map((item, index) => (
                        <tr key={index}>
                          <td>{item.name}</td>
                          <td>{item.disease}</td>
                          <td>
                            {moment
                              .utc(child.dob, "YYYY-MM-DD hh:mm:ss a")
                              .add(item.time, "days")
                              .format("D/M/YYYY")}
                          </td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              id={child.v_id}
                              className={item.name}
                              defaultChecked={item.isDone}
                              onChange={(e) => handleCheck(e)}
                            ></input>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
      ) : (
        <h1>No child found yet</h1>
      )}
    </>
  );
}
