import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router";
import { LOGOUT } from "../../constants";
import profile from "../../images/profile.png";
import moment from "moment";

export default function Index({ logo }) {
  let token = localStorage.getItem("token");
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
      .then((data) => setChildInfo(data[0]));
  }, [token]);
  console.log(childInfo);
  let dob = new Date(childInfo.dob);
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
      isDone: childInfo.bcg,
    },
    {
      name: "OPV_0",
      disease: "Polio",
      time: 0,
      isDone: childInfo.opv_0,
    },
    {
      name: "Pentavalent_1",
      disease: "Cough/Hapatites",
      time: 42,
      isDone: childInfo.pentavalent_1,
    },
    {
      name: "OPV_1",
      disease: "Polio",
      time: 42,
      isDone: childInfo.opv_1,
    },
    {
      name: "PCV_1",
      disease: "Phneumonia",
      time: 42,
      isDone: childInfo.pcv_1,
    },
    {
      name: "Pentavalent_2",
      disease: "Cough/Hapatites",
      time: 75,
      isDone: childInfo.pentavalent_2,
    },
    {
      name: "OPV_2",
      disease: "Polio",
      time: 75,
      isDone: childInfo.opv_2,
    },
    {
      name: "PCV_2",
      disease: "Polio",
      time: 75,
      isDone: childInfo.pcv_2,
    },
    {
      name: "Pentavalent_3",
      disease: "Cough/Hapatites",
      time: 105,
      isDone: childInfo.pentavalent_3,
    },
    {
      name: "OPV_3",
      disease: "Polio",
      time: 105,
      isDone: childInfo.opv_3,
    },
    {
      name: "PCV_3",
      disease: "Polio",
      time: 105,
      isDone: childInfo.pcv_3,
    },
    {
      name: "IPV",
      disease: "Phneumonia",
      time: 105,
      isDone: childInfo.ipv,
    },
    {
      name: "MEASLES_1",
      disease: "Chiken pox",
      time: 270,
      isDone: childInfo.measles_1,
    },
    {
      name: "MEASLES_2",
      disease: "Chiken pox",
      time: 455,
      isDone: childInfo.measles_2,
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
      <main>
        {child ? (
          <div className="container">
            <div className="row mt-5">
              <div className="col-6">
                <h3 className="text-black-50">Child Information</h3>
                <div className="info-wrapper mt-5 mb-5">
                  <h1>{childInfo.name}</h1>
                  <p>
                    Date of birth :{" "}
                    {`${dob.getDate()}/${dob.getMonth()}/${dob.getFullYear()} `}
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
                              .format("M/D/YYYY")}
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
