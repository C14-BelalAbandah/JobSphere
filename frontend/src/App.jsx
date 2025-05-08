import React, { useEffect } from "react";
import "./App.css";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import Jobs from "./components/jobs/jobs";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import Register from "./components/register/register";
import Login from "./components/login/login";
import Apply from "./components/apply/apply";
import NewJob from "./components/newJob/newJob";
import MyProfile from "./components/myProfile/myProfile";
export const toggleContext = createContext();

const App = () => {
  const navigate = useNavigate();
  const [loginToggle, setLoginToggle] = useState(false);
  const [registerToggle, setRigisterToggle] = useState(false);
  const [userInfo, setUserInfo] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  const [userName, setUserName] = useState(
    localStorage.getItem("userName") || ""
  );
  const [applyJob, setApplyJob] = useState({});
  const [resultMessage, setResultMessage] = useState(false);
  const [showeAlertMessage, setShoweAlertMessage] = useState(false);
  const [role, setRole] = useState(localStorage.getItem("role") || "");
  const [showAddPost, setShowAddPost] = useState(false);
  const [userId, setUserId] = useState(localStorage.getItem("userId") || "");

  return (
    <div className="App">
      <div className="header">
        <div className="headerPartOne">
          <div className="title">
            J<img className="logo" src="./images/logo.png" />
            bSphere
          </div>
          <div className="jobsIcon">Jobs</div>
        </div>
        <div className="headerPartTwo">
          {!loginToggle && (
            <button
              className="loginIcon"
              onClick={() => {
                navigate("login");
              }}
            >
              {" "}
              <svg
                className="iconOfLogin"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"
                />
                <path
                  fillRule="evenodd"
                  d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"
                />
              </svg>
              Login
            </button>
          )}

          {!registerToggle && (
            <button
              onClick={() => {
                navigate("register");
              }}
              className="registerIcon"
            >
              {" "}
              <svg
                className="iconOfRegister"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M6.835 5.092v2.777h1.549c.995 0 1.573-.463 1.573-1.36 0-.913-.596-1.417-1.537-1.417z" />
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.5 4.002h3.11c1.71 0 2.741.973 2.741 2.46 0 1.138-.667 1.94-1.495 2.24L11.5 12H9.98L8.52 8.924H6.836V12H5.5z" />
              </svg>
              Register
            </button>
          )}
          {showAddPost && (
            <div
              className="addJobSec"
              onClick={() => {
                navigate("/addNewJob");
              }}
            >
              {
                <svg
                  className="addJobIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3z" />
                </svg>
              }
              <button className="addJob"> Add Job</button>
            </div>
          )}
          {userInfo && (
            <div
              className="userInfo"
              onClick={() => {
                navigate("/myProfile");
              }}
            >
              <div className="userProfile">
                <svg
                  className="userIcon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                >
                  <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0" />
                  <path
                    fillRule="evenodd"
                    d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"
                  />
                </svg>
                {userName}
              </div>
            </div>
          )}
        </div>
      </div>

      <toggleContext.Provider
        value={{
          loginToggle,
          setLoginToggle,
          registerToggle,
          setRigisterToggle,
          allJobs,
          setAllJobs,
          userInfo,
          setUserInfo,
          userName,
          setUserName,
          applyJob,
          setApplyJob,
          resultMessage,
          setResultMessage,
          showeAlertMessage,
          setShoweAlertMessage,
          role,
          setRole,
          showAddPost,
          setShowAddPost,
          userId,
          setUserId,
        }}
      >
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/applyNow" element={<Apply />} />
          <Route path="/addNewJob" element={<NewJob />} />
          <Route path="/myProfile" element={<MyProfile />} />
        </Routes>
      </toggleContext.Provider>
    </div>
  );
};

export default App;
