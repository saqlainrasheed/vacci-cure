import React from "react";

export default function Index({ logo }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <a className="navbar-brand d-flex flex-auto" href="/">
            <img src={logo} alt="Vacci-cure logo" width="150px" />
          </a>
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
                <a className="nav-link active" aria-current="page" href="/">
                  Home
                </a>
              </li>
              <div className="d-flex float-right">
                <li className="nav-item">
                  <a
                    className="nav-link btn btn-primary text-light"
                    href="/login"
                  >
                    Login
                  </a>
                </li>
                <li className="nav-item ms-2">
                  <a
                    className="nav-link btn btn-warning text-dark"
                    href="/register"
                  >
                    Register
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero section of home page */}
      <header
        className="hero"
        style={{
          width: "100%",
          height: "90vh",
          backgroundColor: "lightblue",
        }}
      >
        <div
          className="container w-100 d-flex align-items-center"
          style={{ height: "inherit", zIndex: "2" }}
        >
          <div className="">
            <h1 className="h1" style={{ fontSize: "5rem" }}>
              Vacci-Cure
            </h1>
            <h5 style={{ fontSize: "2rem" }}>
              Get Your Child Vaccinated on Time
            </h5>
            <br />
            <br />
            <a className="btn btn-warning" href="/register">
              Register your child
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
