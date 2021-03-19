import React from "react";
import logo from "./images/logo.png";
import Homepage from "./components/Homepage/index";
import Login from "./components/Forms/Login";
import Registration from "./components/Forms/Registration";
import Hos_Registration from "./components/Forms/Hos_Registration";
import AddChild from "./components/Forms/AddChild";

export default function App() {
  return (
  	    <div>
          <Login />
          <Registration />
          <Hos_Registration />
          <AddChild />
        </div>
    )
         
}
