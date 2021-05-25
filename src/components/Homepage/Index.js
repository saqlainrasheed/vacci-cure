import React from "react";
import { Link } from "react-router-dom";
import "./style.css";
import hero from "../../images/hero.png";
import hospital from "../../images/hospital.png";
import parents from "../../images/parents.png";
export default function Index({ logo }) {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <div className="container">
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
                <Link className="navbar-brand d-flex flex-auto" to="/">
                  <img src={logo} alt="Vacci-cure logo" width="150px" />
                </Link>
              </li>
              <div className="d-flex float-right  justify-content-center align-items-center">
                <li className="nav-item">
                  <Link className="nav-link active" aria-current="page" to="/">
                    Home
                  </Link>
                </li>

                <li className="nav-item ms-2">
                  <Link className="nav-link" to="/register">
                    Register as parent
                  </Link>
                </li>
                <li className="nav-item ms-2">
                  <Link className="nav-link" to="/register-hospital">
                    Register as hospital
                  </Link>
                </li>
                <li className="nav-item">
                  <Link className="nav-link btn" to="/login" id="loginBtn">
                    Login
                  </Link>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>

      {/* Hero section of home page */}
      <header className="hero">
        <div
          className="container w-100 d-flex align-items-center"
          style={{ height: "inherit", zIndex: "2" }}
        >
          <div className="row" id="heroRow">
            <div className="col-6 infoArea">
              <div>
                <h1 className="h1" id="heroHeadline">
                  Virtual healthcare for your child
                </h1>
                <p id="heroSubHeadline">
                  Vacci-cure provides a complete system for parents and
                  hospitals to manage new born childs vaccination to safe them
                  from deadly deseases.
                </p>

                <a className="btn" id="regBtn" href="/register">
                  Register now
                </a>
              </div>
            </div>
            <div className="col-6">
              <img id="heroImg" src={hero} alt="Hero illustration" />
            </div>
          </div>
        </div>
      </header>

      {/* SERVICES SECTION */}
      <section className=" container" id="services">
        <h2 className="heading">Our Services</h2>
        <hr />

        <div className="row">
          <div className="col-6">
            <img src={parents} alt="Illustration" className="servicesImg" />
          </div>
          <div className="col-6">
            <h2 className="heading">As a parent you’ll get !</h2>
            <hr />
            <ul className="servicesBenefit">
              <li>SMS alert so never miss any vaccination date</li>
              <li>Complete digital child vaccination chart</li>
              <li>A ability to make changes in your chart</li>
            </ul>
            <br />
            <Link to="register" className="btn secondaryButton">
              Register as parent
            </Link>
          </div>
        </div>
        <hr />
        <div className="row">
          <div className="col-6">
            <h2 className="heading">As a hospital you will get !</h2>
            <hr />
            <ul className="servicesBenefit">
              <li>Ability to register chiild on behalf of parents</li>
              <li>Ability to re-confirm before giving a dose</li>
              <li>Power to edit vaccination-chart</li>
              <li>and many more</li>
            </ul>
            <br />
            <Link className="btn secondaryButton " to="/register-hospital">
              Register as hospital
            </Link>
          </div>
          <div className="col-6">
            <img src={hospital} alt="Illustration" className="servicesImg" />
          </div>
        </div>
      </section>

      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-6">
              <img src={logo} alt="logo" className="footerImage" />
              <hr />
              <p className="text-justify">
                Vacci-Cure is a portal constructed to prevent new born childs
                from getting deadly deseases and to ensure that they get
                vaccinated on time.
              </p>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Made with 🧡 by Muhammad Saqlain Rasheed
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
