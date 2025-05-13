import React from "react";
import "./register.css";
import { useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
function register() {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [registerFailed, setRegisterFailed] = useState(false);
  const [registerFailedMessage, setRegisterFailedMessage] = useState("");

  const createAccountfunction = () => {
    axios
      .post("http://localhost:5000/users/register", {
        firstName,
        lastName,
        email,
        password,
        role,
      })
      .then((result) => {
        console.log(result);
        console.log("result ", result);
        navigate("/");
      })
      .catch((error) => {
        console.log("errorrrrrrr ", error);
        setRegisterFailedMessage(error.response.data.message);
        setRegisterFailed(true);
        setTimeout(() => {
        setRegisterFailed(false);
        }, 4000);
      });
  };
  return (
    <div className="registerPage">
      
      <div className="registerTitleAndInputs">
      <div className="registerTitle">A number of jobs await</div>
      <div className="inputs">
        <input
          className="input"
          placeholder="First Name"
          onChange={(e) => {
            setFirstName(e.target.value);
          }}
        ></input>
        <input
          className="input"
          placeholder="Last Name"
          onChange={(e) => {
            setLastName(e.target.value);
          }}
        ></input>
        <input
          className="input"
          placeholder="Email"
          onChange={(e) => {
            setEmail(e.target.value);
          }}
        ></input>
        <input
          className="input"
          placeholder="Password"
          type="password"
          onChange={(e) => {
            setPassword(e.target.value);
          }}
        ></input>
        <div className="roleInput" placeholder="Role">
          <select
            className="roleSelector"
            onInput={(e) => {
              console.log(e.target.value);
              setRole(e.target.value);
              console.log(role);
            }}
          >
            <option> recruiter</option>
            <option> job seeker</option>
          </select>
        </div>
        {registerFailed && (
          <div className="registrationFailed"> {registerFailedMessage} </div>
        )}
        <button
          className="createAccountButton"
          onClick={() => {
            createAccountfunction();
          }}
        >
          Create Account
        </button>
      </div>
      </div>
      
     
      <img src="./images/registerImage-Photoroom.png" className="registerImage"></img>

    </div>
  );
}

export default register;
