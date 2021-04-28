import React from "react";
import profile from "../../images/profile.png";

export default function Index({ logo }) {
  const child = true;
  const childInfo = {
    name: "Muhammad Ahsan",
    age: "2 weeks",
    dob: "02/02/2021",
    fatherName: "Raza Ali",
    contact: "03474173782",
  };

  const vaccineInfo = [
    {
      name: "BCG",
      disease: "Child Tb",
      dateOfVaccination: "02/02/2021",
      isDone: true,
    },
    {
      name: "OPV (zero)",
      disease: "Polio",
      dateOfVaccination: "02/02/2021",
      isDone: false,
    },
    {
      name: "Pentavalent - I",
      disease: "Cough/Hapatites",
      dateOfVaccination: "18/03/2021",
      isDone: false,
    },
    {
      name: "PCV - I",
      disease: "Phneumonia",
      dateOfVaccination: "18/03/2021",
      isDone: false,
    },
    {
      name: "OPV - I",
      disease: "Polio",
      dateOfVaccination: "18/03/2021",
      isDone: false,
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
                        <a className="dropdown-item" href="/logout">
                          Logout
                        </a>
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
                  <p>{childInfo.age} old </p>
                  <p>Date of birth : {childInfo.dob} </p>
                  <h3>S/O: {childInfo.fatherName} </h3>
                  <p>Contact: {childInfo.contact} </p>
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
                          <td>{item.dateOfVaccination}</td>
                          <td className="text-center">
                            <input
                              class="form-check-input"
                              type="checkbox"
                              checked={item.isDone}
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
      {/* if child registered => show schedule */}
      {/* else => show No child registered yet */}
    </>
  );
}
