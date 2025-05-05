import React from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toggleContext } from "../../App";
function login() {
  const { loginToggle, setLoginToggle, registerToggle, setRigisterToggle } =
    useContext(toggleContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginFailedMessage, setLoginFailedMessage] = useState("");
  const [loginFailed, setLoginFailed] = useState(false);
  const [token, setToken] = useState("");
  console.log(token);

  const loginfunction = () => {
    axios
      .post("http://localhost:5000/users/login", {
        email,
        password,
      })
      .then((result) => {
        console.log(result.data.token);
        setToken(result.data.token);
        localStorage.setItem("token", result.data.token);
        console.log("result ", result);
        navigate("/");  
        setLoginToggle(true)
        setRigisterToggle(true)
      })
      .catch((error) => {
        console.log("error", error);
        setLoginFailedMessage(error.response.data.message);
        setLoginFailed(true);
        setTimeout(() => {
          setLoginFailed(false);
        }, 4000);
      });
  };
  return (
    <div className="loginPage">
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
  );
}

export default login;
