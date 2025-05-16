import React from "react";
import "./myProfile.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toggleContext } from "../../App";
import axios from "axios";
import login from "../login/login";
function myProfile() {
  const {
    role,
    setRole,
    userId,
    setUserId,
    myJobs,
    setMyJobs,
    selectedJob,
    setSelectedJob,
    resultMessage,
    setResultMessage,
    showeAlertMessage,
    setShoweAlertMessage,
    loginToggle,
    setLoginToggle,
    registerToggle,
    setRigisterToggle,
  } = useContext(toggleContext);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const [showPostedJobs, setShowPostedJobs] = useState(false);
  const [showApplications, setShowApplications] = useState(false);
  const [myApplications, setMyApplications] = useState([]);
  const [noApplicationsMessage, setNoApplicationsmessage] = useState(false);
  const [applicationsDiv, setApplicationsDiv] = useState(false);

  if (role === "recruiter") {
    useEffect(() => {
      axios
        .get(`http://localhost:5000/jobs/${userId}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((result) => {
          setMyJobs(result.data.data);
          setShowPostedJobs(true);
        })
        .catch((error) => {});
    }, []);
  } else if (role === "job_seeker") {
    useEffect(() => {
      axios
        .get(`http://localhost:5000/applications/${userId}`, {
          headers: {
            Authorization: `bearer ${token}`,
          },
        })
        .then((result) => {
          setShowApplications(true);

          if (result.data.data.length === 0) {
            setNoApplicationsmessage(true);
          } else {
            setApplicationsDiv(true);
            setMyApplications(result.data.data);
          }
        })
        .catch((error) => {});
    }, []);
  }

  if (token !== null) {
    setLoginToggle(true);
    setRigisterToggle(true);
  } else {
    setLoginToggle(false);
    setRigisterToggle(false);
  }
  const deleteJob = (idOftheJob) => {
    axios
      .delete(`http://localhost:5000/jobs/${idOftheJob}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((result) => {
        setShoweAlertMessage(true);
        setResultMessage("The Job Has Been deleted");

        setTimeout(() => {
          setShoweAlertMessage(false);
          navigate("/myProfile");
        }, 2000);
      })
      .catch((error) => {});
  };

  return (
    <div className="myProfilePage">
      {showPostedJobs && (
        <div className="postedJobsOuterSection">
          <strong className="myPostedJobs">My Posted Jobs:</strong>
          <div className="postedJobsSection">
            {myJobs.map((ele, i) => {
              return (
                <div key={i} className="jobDetails">
                  <div>
                    <strong className="JobTitleH"> Job Title</strong>:{" "}
                    {ele.title}
                  </div>
                  <div>
                    <strong className="DescriptionH">Description</strong>:{" "}
                    {ele.description}
                  </div>
                  <div>
                    <strong className="requirmentsH">Requirments</strong>:{" "}
                    {ele.requirements}
                  </div>
                  <div>
                    {" "}
                    <strong className="LocationH">Location</strong>:{" "}
                    {ele.location}
                  </div>
                  <div>
                    <strong className="ExperinceH">Experience</strong>:{" "}
                    {ele.experince}
                  </div>
                  <div>
                    <strong className="RoleH">Role</strong>: {ele.role}
                  </div>
                  <div>
                    {" "}
                    <strong className="SalaryRangeH">Salary Range</strong>:{" "}
                    {ele.salaryRange}
                  </div>
                  <div className="numberOfApplicationsSec">
                    {" "}
                    <span className="numberOfApplicationsH">
                      {" "}
                      Number Of Applications:
                    </span>{" "}
                    {ele.applications.length}{" "}
                    <button
                      className="viewButton"
                      onClick={() => {
                        setSelectedJob(ele._id);
                        navigate("applications");
                      }}
                    >
                      View
                    </button>
                  </div>
                  <div className="editAndDelete">
                    <button
                      className="editJobButton"
                      onClick={() => {
                        setSelectedJob(ele._id);
                        navigate("editJob");
                      }}
                    >
                      Edit Job
                    </button>

                    <button
                      className="editJobButton"
                      onClick={() => {
                        
                        deleteJob(ele._id);
                        
                      }}
                    >
                      Delete Job
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
      {showApplications && (
        <div className="showApplicationsDiv">
          {noApplicationsMessage && (
            <div className="noApplicationsMessageDiv">
              <div className="noApplicationMessage">
                {" "}
                You Have No Applications{" "}
              </div>
              <button
                className="seejobsButton"
                onClick={() => {
                  navigate("/");
                }}
              >
                {" "}
                See Jobs
              </button>
            </div>
          )}
          {applicationsDiv && (
            <div className="applicationsDiv">
              <div className="myapplication"> Your Application: </div>
              <div className="AllApplications">
                {" "}
                {myApplications.map((ele, i) => {
                  return (
                    <div key={i} className="jobDetails">
                      <div>
                        <strong className="JobTitleH"> Job Title</strong>:{" "}
                        {ele.jobId.title}
                      </div>
                      <div>
                        <strong className="DescriptionH">Description</strong>:{" "}
                        {ele.jobId.description}
                      </div>
                      <div>
                        <strong className="requirmentsH">Requirments</strong>:{" "}
                        {ele.jobId.requirements}
                      </div>
                      <div>
                        {" "}
                        <strong className="LocationH">Location</strong>:{" "}
                        {ele.jobId.location}
                      </div>
                      <div>
                        <strong className="ExperinceH">Experience</strong>:{" "}
                        {ele.jobId.experince}
                      </div>
                      <div>
                        <strong className="RoleH">Role</strong>: {ele.role}
                      </div>
                      <div>
                        {" "}
                        <strong className="SalaryRangeH">
                          Salary Range
                        </strong>: {ele.jobId.salaryRange}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      )}
      {showeAlertMessage && <div className="alertMessage">{resultMessage}</div>}
    </div>
  );
}

export default myProfile;
