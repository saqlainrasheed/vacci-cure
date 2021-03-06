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
  let decoded = "";
  try {
    decoded = jwt_decode(token);
  } catch (e) {
    console.log(e);
  }
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

  const [allRegistereBy, setAllRegistereBy] = useState([]);

  const handleDelete = (e) => {
    const id = e.target.id;
    fetch(`http://localhost:5000/api/child/${id}`, {
      method: "delete",
      mode: "cors",
      headers: {
        "content-type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((data) => setAllRegistereBy(data))
      .catch((err) => console.log);
  };

  const getAll = () => {
    fetch("http://localhost:5000/api/all-childs")
      .then((res) => res.json())
      .then((data) => setAllRegistereBy(data));
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

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          <a className="navbar-brand d-flex flex-auto" href="/homepage">
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
                  <Link to="/add-child" className="nav-link ms-2">
                    &#x2b; Register child
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <div className="dropdown p-0">
                    <button
                      className="btn p-0 m-0"
                      type="button"
                      id="dropdownMenuButton1 loginLoginBtn"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      <div
                        id="loginBtn"
                        style={{ padding: "5px 20px 5px 5px" }}
                      >
                        <img
                          src={profile}
                          alt="Profile"
                          style={{ width: "2rem", borderRadius: "100%" }}
                        />
                        <span style={{ color: "white" }}>
                          {decoded.hospital_name}
                        </span>
                      </div>
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
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={(e) => handleChangePassword(e)}
              >
                Change password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* grid here */}

      <h1 className="h1 text-center pb-0">Hospital Panel</h1>
      <main className="container d-flex mt-5 mb-5 ">
        <div className="row gx-5">
          <div className="col-6">
            <div
              className="card p-4"
              style={{
                backgroundColor: "#233348",
              }}
            >
              <div className="card-body">
                <h5 className="card-title text-light">
                  Registered Child by {decoded.hospital_name}
                </h5>
                <p className="card-text text-light h1 p-0">
                  {hospitalData.length}
                </p>
                <button
                  to="/"
                  className="btn bg-light text-dark m-0"
                  id="loginBtn"
                  data-bs-toggle="modal"
                  data-bs-target="#viewAllRegistered"
                  onClick={(e) => getAll(e)}
                >
                  View all
                </button>
              </div>
            </div>
          </div>
          <div className="col-6 ">
            <div className="card p-4" style={{ backgroundColor: "#233348" }}>
              <div className="card-body">
                <h5 className="card-title text-light">Completely vaccinated</h5>
                <p className="card-text text-light h1 p-0">
                  {completely_vaccinated.length}
                </p>
                <button
                  to="/"
                  className="btn bg-light text-dark m-0"
                  id="loginBtn"
                  data-bs-toggle="modal"
                  data-bs-target="#viewAllCompleted"
                >
                  View all
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      {/* VIEW ALL MODAL */}
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
                All Register under {decoded.hospital_name}
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
                    ? allRegistereBy
                        .filter((item) => item.registered_by === decoded.email)
                        .map((item, index) => {
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

      {/* VIEW Completely VACCCINATED MODAL */}
      <div
        className="modal fade"
        id="viewAllCompleted"
        tabIndex="-1"
        aria-labelledby="viewAllCompletedLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Modal title
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
                  {completely_vaccinated.length
                    ? completely_vaccinated.map((item, index) => {
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

      <div className="container">
        <form className="row" onSubmit={(e) => handleSearch(e)}>
          <div className="col-8">
            <label htmlFor="number" className="visually-hidden">
              Search child by contact number...
            </label>
            <input
              onChange={(e) => setNumber(e.target.value)}
              type="text"
              className="form-control w-100"
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
                <h3 className="h1 p-0">Child Information</h3>
                <div className="info-wrapper mt-5 mb-5">
                  <h1
                    style={{
                      fontWeight: "500",
                      borderBottom: "3px solid #233348",
                      width: "80%",
                      paddingBottom: "1rem",
                      marginBottom: "2rem",
                    }}
                  >
                    {child.name}
                  </h1>

                  <p className="h5">
                    <strong>Date of birth: </strong>
                    {/* {`${dob.getDate()}/${dob.getMonth()}/${dob.getFullYear()} `} */}
                    {moment
                      .utc(child.dob, "YYYY-MM-DD hh:mm:ss a")
                      .format("DD/MM/YYYY")}
                  </p>
                  <p className="h5">
                    <strong>Father name:</strong> {child.father_name}
                  </p>
                  <p className="h5">
                    <strong>Contact:</strong> {child.contact_number}{" "}
                  </p>
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
        <p className="h4 text-center p-5">Please search...</p>
      )}
    </>
  );
}
