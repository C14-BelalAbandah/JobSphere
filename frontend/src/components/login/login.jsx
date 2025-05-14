import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toggleContext } from "../../App";
function login() {
  const {
    loginToggle,
    setLoginToggle,
    registerToggle,
    setRigisterToggle,
    userName,
    setUserName,
    role,
    setRole,
    showLogout,
    setShowLogout,
  } = useContext(toggleContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailedMessage, setLoginFailedMessage] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [token, setToken] = useState("");

  if (token !== "") {
    setLoginToggle(true);
    setRigisterToggle(true);
  }

  const loginfunction = () => {
    axios
      .post("http://localhost:5000/users/login", {
        email,
        password,
      })
      .then((result) => {
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        let modifiedFirstName = result.data.data.firstName.split("");
        modifiedFirstName[0] = result.data.data.firstName
          .split("")[0]
          .toUpperCase();
        setUserName(modifiedFirstName.join(""));
        localStorage.setItem("userName", modifiedFirstName.join(""));
        localStorage.setItem("role", result.data.data.role.role);
        localStorage.setItem("userId", result.data.data._id);
        setRole(result.data.data.role.role);
        navigate("/");
        setLoginToggle(true);
        setRigisterToggle(true);
        setShowLogout(true);
      })
      .catch((error) => {
        setLoginFailedMessage(error.response.data.message);
        setLoginFailed(true);
        setTimeout(() => {
          setLoginFailed(false);
        }, 4000);
      });
  };
  return (
    <div className="loginPage">
      <div className="titleAndInputs">
        <div className="loginTitle">Login</div>
        <div className="inputs">
          <div className="emailSec">
            <div className="emailText"> Email</div>
            <input
              className="input"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="Enter Email ID"
            ></input>
          </div>
          <div className="passwordSec">
            <div className="passwordText"> Password</div>
            <input
              className="input"
              type="password"
              placeholder="Enter Your Password"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            ></input>
          </div>
          {loginFailed && (
            <div className="loginFailed"> {loginFailedMessage} </div>
          )}
          <button
            className="loginButton"
            onClick={() => {
              loginfunction();
            }}
          >
            Login
          </button>
          <div>
            {" "}
            New to JobSphere?{" "}
            <strong
              className="newToJobsphereRegister"
              onClick={() => {
                navigate("/register");
              }}
            >
              Register
            </strong>
          </div>
        </div>
      </div>
      <img src="./images/loginImage.png" className="loginImage"></img>
    </div>
  );
}

export default login;
