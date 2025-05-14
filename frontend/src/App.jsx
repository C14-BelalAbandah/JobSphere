import React, { useEffect } from "react";
import "./App.css";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import Jobs from "./components/jobs/jobs";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Register from "./components/register/register";
import Login from "./components/login/login";
import Apply from "./components/apply/apply";
import NewJob from "./components/newJob/newJob";
import MyProfile from "./components/myProfile/myProfile";
import Applications from "./components/applications/applications";
import EditJob from "./components/editJob/editJob";
import { logOut } from "./components/redux/slice/tokenSlice";
import JobDetails from "./components/jobDetails/jobDetails";
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
  const [myJobs, setMyJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState("");
  const [showLogout, setShowLogout] = useState(true);
  const [jobIndex, setJobIndex] = useState(0);

  const token = useSelector((state) => {

    return state.tokenReducer.token;
  });

  useEffect(() => {
    if (token === null) {
      setShowLogout(false);
    }
  }, []);

  const dispatch = useDispatch();

  const logout = () => {
    setShowLogout(false);
    navigate("/");

    dispatch(logOut());
  };

  return (
    <div className="App">
      <div className="header">
        <div className="headerPartOne">
          <div className="title">
            J<img className="logo" src="./images/logo.png" />
            bSphere
          </div>
          <div
            className="jobsIcon"
            onClick={() => {
              navigate("/");
            }}
          >
            Jobs
          </div>
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

          {showLogout && (
            <button
              className="logout"
              onClick={() => {
                logout();
              }}
            >
              <svg
                className="iconOflogout"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"
                />
                <path
                  fill-rule="evenodd"
                  d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"
                />
              </svg>
              Logout
            </button>
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
          myJobs,
          setMyJobs,
          selectedJob,
          setSelectedJob,
          showLogout,
          setShowLogout,
          jobIndex,
          setJobIndex,
        }}
      >
        <Routes>
          <Route path="/" element={<Jobs />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/applyNow" element={<Apply />} />
          <Route path="/addNewJob" element={<NewJob />} />
          <Route path="/myProfile" element={<MyProfile />} />
          <Route path="/myProfile/applications" element={<Applications />} />
          <Route path="/myProfile/editJob" element={<EditJob />} />
          <Route path="/jobDetails" element={<JobDetails />} />
        </Routes>
      </toggleContext.Provider>

      <footer className="footer">
        <div className="footerDetails">
          <div className="websiteLogo">
            {" "}
            J<img className="logo" src="./images/logo.png" />
            bSphere
          </div>
          <div className="websiteInfo">
            <div className="termsOfUse"> Terms Of Use</div>
            <div className="privacyPolicy">Privacy Policy</div>
            <div className="beSafe"> Be Safe</div>
          </div>
          <div className="contactDetails">
            <div className="emailInFooter">
              {" "}
              <svg
                className="emailIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414zM0 4.697v7.104l5.803-3.558zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586zm3.436-.586L16 11.801V4.697z" />
              </svg>{" "}
              JobSphere@gmail.com
            </div>
            <div className="phoneNumber">
              {" "}
              <svg
                className="phoneIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.68.68 0 0 0 .178.643l2.457 2.457a.68.68 0 0 0 .644.178l2.189-.547a1.75 1.75 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.6 18.6 0 0 1-7.01-4.42 18.6 18.6 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877z"
                />
              </svg>{" "}
              007xxxxxxxx
            </div>
            <div className="contactsIcons">
              <svg
                className="facebookIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951" />
              </svg>
              <svg
                className="instagramIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M8 0C5.829 0 5.556.01 4.703.048 3.85.088 3.269.222 2.76.42a3.9 3.9 0 0 0-1.417.923A3.9 3.9 0 0 0 .42 2.76C.222 3.268.087 3.85.048 4.7.01 5.555 0 5.827 0 8.001c0 2.172.01 2.444.048 3.297.04.852.174 1.433.372 1.942.205.526.478.972.923 1.417.444.445.89.719 1.416.923.51.198 1.09.333 1.942.372C5.555 15.99 5.827 16 8 16s2.444-.01 3.298-.048c.851-.04 1.434-.174 1.943-.372a3.9 3.9 0 0 0 1.416-.923c.445-.445.718-.891.923-1.417.197-.509.332-1.09.372-1.942C15.99 10.445 16 10.173 16 8s-.01-2.445-.048-3.299c-.04-.851-.175-1.433-.372-1.941a3.9 3.9 0 0 0-.923-1.417A3.9 3.9 0 0 0 13.24.42c-.51-.198-1.092-.333-1.943-.372C10.443.01 10.172 0 7.998 0zm-.717 1.442h.718c2.136 0 2.389.007 3.232.046.78.035 1.204.166 1.486.275.373.145.64.319.92.599s.453.546.598.92c.11.281.24.705.275 1.485.039.843.047 1.096.047 3.231s-.008 2.389-.047 3.232c-.035.78-.166 1.203-.275 1.485a2.5 2.5 0 0 1-.599.919c-.28.28-.546.453-.92.598-.28.11-.704.24-1.485.276-.843.038-1.096.047-3.232.047s-2.39-.009-3.233-.047c-.78-.036-1.203-.166-1.485-.276a2.5 2.5 0 0 1-.92-.598 2.5 2.5 0 0 1-.6-.92c-.109-.281-.24-.705-.275-1.485-.038-.843-.046-1.096-.046-3.233s.008-2.388.046-3.231c.036-.78.166-1.204.276-1.486.145-.373.319-.64.599-.92s.546-.453.92-.598c.282-.11.705-.24 1.485-.276.738-.034 1.024-.044 2.515-.045zm4.988 1.328a.96.96 0 1 0 0 1.92.96.96 0 0 0 0-1.92m-4.27 1.122a4.109 4.109 0 1 0 0 8.217 4.109 4.109 0 0 0 0-8.217m0 1.441a2.667 2.667 0 1 1 0 5.334 2.667 2.667 0 0 1 0-5.334" />
              </svg>

              <svg
                className="linkedinIcon"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854zm4.943 12.248V6.169H2.542v7.225zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248S2.4 3.226 2.4 3.934c0 .694.521 1.248 1.327 1.248zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016l.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225z" />
              </svg>
            </div>
          </div>
        </div>
        <div className="copyRight">
          {" "}
          <svg
            className="copyRightIcon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M8.146 4.992c.961 0 1.641.633 1.729 1.512h1.295v-.088c-.094-1.518-1.348-2.572-3.03-2.572-2.068 0-3.269 1.377-3.269 3.638v1.073c0 2.267 1.178 3.603 3.27 3.603 1.675 0 2.93-1.02 3.029-2.467v-.093H9.875c-.088.832-.75 1.418-1.729 1.418-1.224 0-1.927-.891-1.927-2.461v-1.06c0-1.583.715-2.503 1.927-2.503" />
          </svg>
          2025 JobSphere | All rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default App;
