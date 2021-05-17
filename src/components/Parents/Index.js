import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { LOGOUT } from "../../constants";
import profile from "../../images/profile.png";
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
        setPassErr("An internal error occurs.");
      });
  };

  const [childInfo, setChildInfo] = useState({});
  useEffect(() => {
    fetch("http://localhost:5000/api/child", {
      method: "get",
      mode: "cors",
      headers: {
        "content-type": "application/json",
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setChildInfo(data[0]))
      .catch((err) => console.log("No child found"));
  }, [token]);
  let dob = childInfo ? new Date(childInfo.dob) : "";
  let child = childInfo;
  const { authorized } = useSelector((state) => state);
  const dispatch = useDispatch();
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

  if (!authorized) {
    return <Redirect to="/login" />;
  }

  const vaccineInfo = [
    {
      name: "BCG",
      disease: "Child Tb",
      time: 0,
      isDone: childInfo ? childInfo.bcg : "",
    },
    {
      name: "OPV_0",
      disease: "Polio",
      time: 0,
      isDone: childInfo ? childInfo.opv_0 : "",
    },
    {
      name: "Pentavalent_1",
      disease: "Cough/Hapatites",
      time: 42,
      isDone: childInfo ? childInfo.pentavalent_1 : "",
    },
    {
      name: "OPV_1",
      disease: "Polio",
      time: 42,
      isDone: childInfo ? childInfo.opv_1 : "",
    },
    {
      name: "PCV_1",
      disease: "Phneumonia",
      time: 42,
      isDone: childInfo ? childInfo.pcv_1 : "",
    },
    {
      name: "Pentavalent_2",
      disease: "Cough/Hapatites",
      time: 75,
      isDone: childInfo ? childInfo.pentavalent_2 : "",
    },
    {
      name: "OPV_2",
      disease: "Polio",
      time: 75,
      isDone: childInfo ? childInfo.opv_2 : "",
    },
    {
      name: "PCV_2",
      disease: "Polio",
      time: 75,
      isDone: childInfo ? childInfo.pcv_2 : "",
    },
    {
      name: "Pentavalent_3",
      disease: "Cough/Hapatites",
      time: 105,
      isDone: childInfo ? childInfo.pentavalent_3 : "",
    },
    {
      name: "OPV_3",
      disease: "Polio",
      time: 105,
      isDone: childInfo ? childInfo.opv_3 : "",
    },
    {
      name: "PCV_3",
      disease: "Polio",
      time: 105,
      isDone: childInfo ? childInfo.pcv_3 : "",
    },
    {
      name: "IPV",
      disease: "Phneumonia",
      time: 105,
      isDone: childInfo ? childInfo.ipv : "",
    },
    {
      name: "MEASLES_1",
      disease: "Chiken pox",
      time: 270,
      isDone: childInfo ? childInfo.measles_1 : "",
    },
    {
      name: "MEASLES_2",
      disease: "Chiken pox",
      time: 455,
      isDone: childInfo ? childInfo.measles_2 : "",
    },
  ];

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
                  <a href="/add-child" className="btn btn-primary">
                    + Register child
                  </a>
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

      <main>
        {child ? (
          <div className="container">
            <div className="row mt-5">
              <div className="col-6">
                <h3 className="text-black-50">Child Information</h3>
                <div className="info-wrapper mt-5 mb-5">
                  <h1>{childInfo.name}</h1>
                  <p>
                    Date of birth :
                    {/* {`${dob.getDate()}/${dob.getMonth()}/${dob.getFullYear()} `} */}
                    {moment
                      .utc(dob, "YYYY-MM-DD hh:mm:ss a")
                      .format("D/M/YYYY")}
                  </p>
                  <h3>S/O: {childInfo.father_name} </h3>
                  <p>Contact: {childInfo.contact_number} </p>
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
                              .utc(childInfo.dob, "YYYY-MM-DD hh:mm:ss a")
                              .add(item.time, "days")
                              .format("D/M/YYYY")}
                          </td>
                          <td className="text-center">
                            <input
                              type="checkbox"
                              id={childInfo.v_id}
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
        ) : (
          <h1>No child registered yet</h1>
        )}
      </main>
    </>
  );
}
