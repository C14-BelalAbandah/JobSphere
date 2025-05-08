import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./jobs.css";
import { toggleContext } from "../../App";
import { useNavigate } from "react-router-dom";

function jobs() {
  const {
    loginToggle,
    setLoginToggle,
    registerToggle,
    setRigisterToggle,
    userInfo,
    setUserInfo,
    userName,
    setUserName,
    applyJob,
    setApplyJob,
    role, setRole,
    showAddPost, setShowAddPost,
  } = useContext(toggleContext);
  const navigate= useNavigate()
  const [allJobs, setAllJobs] = useState([]);
  const [allJobsAfterFilteration, setAllJobsAfterFilteration] = useState([]);
  const [jobDetails, setJobDetails] = useState(false);
  const [jobIndex, setJobIndex] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [token, setToken] = useState("");
  const [searchResults, setSearchResults] = useState(false);
  const [showeAlertMessage, setShoweAlertMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  console.log(token);

  if (role === "recruiter") {
    setShowAddPost(true)
    
  } else {
    setShowAddPost(false)
  }

  if (token !== null) {
    setLoginToggle(true);
    setRigisterToggle(true);
    setUserInfo(true);
  } else {
    setLoginToggle(false);
    setRigisterToggle(false);
    setUserInfo(false);
  }

  useEffect(() => {
    axios
      .get("http://localhost:5000/jobs")
      .then((result) => {
        console.log(result.data.data);
        console.log(result.data.data[0].jobPoster.email);
        setAllJobs(result.data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const findJob = () => {
    axios
      .get(`http://localhost:5000/jobs/jobByTitle/${jobTitle}`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result.data);
        setAllJobsAfterFilteration(result.data.data);
        setSearchResults(true);
      })
      .catch((error) => {
        console.log("error: ", error.response.data.message);
        setShoweAlertMessage(true);
        setAlertMessage(error.response.data.message);
        setTimeout(() => {
          setShoweAlertMessage(false);
        }, 3000);
      });
  };

  return (
    <div className="jobsPage">
      <div className="searchSection">
        <input
          className="searchBar"
          placeholder="Search for Job By Title"
          onChange={(e) => {
            console.log(e.target.value);
            setJobTitle(e.target.value);
          }}
        ></input>
        <button
          className="searchButton"
          onClick={() => {
            findJob();
          }}
        >
          Search
        </button>
      </div>
      {!searchResults && (
        <div>
          <div className="allJobsAndJobDetails">
            <div className="allJobs">
              {allJobs.map((ele, i) => {
                return (
                  <div key={i} className="jobBox">
                    <div className="jobTitle">
                      {" "}
                      <strong className="JobTitleH"> Job Title</strong>:{" "}
                      {ele.title}
                    </div>
                    <div className="description">
                      {" "}
                      <strong className="DescriptionH">
                        Description
                      </strong>: {ele.description}
                    </div>
                    <div className="locationPart">
                      {" "}
                      <svg
                        className="locationIcon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                      </svg>
                      <strong className="LocationH">Location</strong>:{" "}
                      {ele.location}{" "}
                    </div>

                    <button
                      className="detailsButton"
                      id={i}
                      onClick={(e) => {
                        setJobDetails(true);
                        setJobIndex(e.target.id);
                        console.log(e.target.id);
                        console.log("jobIndex: ", jobIndex);
                        console.log(
                          "jobDetails[jobIndex]: ",
                          allJobs[jobIndex]
                        );
                      }}
                    >
                      Details
                    </button>
                  </div>
                );
              })}
            </div>

            {jobDetails && (
              <div className="selectedJob">
                <div>
                  <strong className="JobTitleH"> Job Title</strong>:{" "}
                  {allJobs[jobIndex].title}
                </div>
                <div>
                  <strong className="DescriptionH">Description</strong>:{" "}
                  {allJobs[jobIndex].description}
                </div>
                <div>
                  <strong className="requirmentsH">Requirments</strong>:{" "}
                  {allJobs[jobIndex].requirements}
                </div>
                <div>
                  <strong className="ExperinceH">Experience</strong>:{" "}
                  {allJobs[jobIndex].experince}
                </div>
                <div>
                  <strong className="RoleH">Role</strong>:{" "}
                  {allJobs[jobIndex].role}
                </div>
                <div>
                  <strong className="SalaryRangeH">Salary Range</strong>:{" "}
                  {allJobs[jobIndex].salaryRange}
                </div>
                
                <div className="locationPart">
                  <svg
                    className="locationIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                  <strong className="LocationH">Location</strong>:{" "}
                  {allJobs[jobIndex].location}
                </div>
                <div>
                  <strong className="LocationH">Poster Email</strong>:{" "}
                  {allJobs[jobIndex].jobPoster.email}
                </div>
                <button
                  className="applyNow"
                  id={jobIndex}
                  onClick={(e) => {
                    console.log(e.target.id);
                    console.log(allJobs[jobIndex]);
                    setApplyJob(allJobs[jobIndex])
                    console.log("applyJob: ",applyJob);
                    
                    navigate("/applyNow")
                  }}
                >
                  Apply Now
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {searchResults && (
        <div>
          <div className="allJobsAndJobDetails">
            <div className="allJobs">
              {allJobsAfterFilteration.map((ele, i) => {
                return (
                  <div key={i} className="jobBox">
                    <div className="jobTitle">
                      {" "}
                      <strong className="JobTitleH"> Job Title</strong>:{" "}
                      {ele.title}
                    </div>
                    <div className="description">
                      {" "}
                      <strong className="DescriptionH">
                        Description
                      </strong>: {ele.description}
                    </div>

                    
                    <div className="locationPart">
                      {" "}
                      <svg
                        className="locationIcon"
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="14"
                        fill="currentColor"
                        viewBox="0 0 16 16"
                      >
                        <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                      </svg>
                      <strong className="LocationH">Location</strong>:{" "}
                      {ele.location}{" "}
                    </div>

                    <button
                      className="detailsButton"
                      id={i}
                      onClick={(e) => {
                        setJobDetails(true);
                        setJobIndex(e.target.id);
                        console.log(e.target.id);
                        console.log("jobIndex: ", jobIndex);
                        console.log(
                          "jobDetails[jobIndex]: ",
                          allJobsAfterFilteration[jobIndex]
                        );
                      }}
                    >
                      Details
                    </button>
                  </div>
                );
              })}
            </div>

            {jobDetails && (
              <div className="selectedJob">
                <div>
                  <strong className="JobTitleH"> Job Title</strong>:{" "}
                  {allJobsAfterFilteration[jobIndex].title}
                </div>
                <div >
                  <strong className="DescriptionH">Description</strong>:{" "}
                  {allJobsAfterFilteration[jobIndex].description}
                </div>
                <div>
                  <strong className="requirmentsH">Requirments</strong>:{" "}
                  {allJobsAfterFilteration[jobIndex].requirements}
                </div>
                <div>
                  <strong className="ExperinceH">Experience</strong>:{" "}
                  {allJobsAfterFilteration[jobIndex].experince}
                </div>
                <div>
                  <strong className="RoleH">Role</strong>:{" "}
                  {allJobsAfterFilteration[jobIndex].role}
                </div>
                <div>
                  <strong className="SalaryRangeH">Salary Range</strong>:{" "}
                  {allJobsAfterFilteration[jobIndex].salaryRange}
                </div>
                <div className="locationPart">
                  <svg
                    className="locationIcon"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6" />
                  </svg>
                  <strong className="LocationH">Location</strong>:{" "}
                  {allJobsAfterFilteration[jobIndex].location}
                </div>
                <div>
                  <strong className="LocationH">Poster Email</strong>:{" "}
                  {allJobsAfterFilteration[jobIndex].jobPoster.email}
                </div>
                <button className="applyNow"
                onClick={(e) => {
                  console.log(e.target.id);
                  console.log(allJobsAfterFilteration[jobIndex]);
                  setApplyJob(allJobsAfterFilteration[jobIndex])
                  console.log("applyJob: ",applyJob);
                  
                  navigate("/applyNow")
                }}>Apply Now</button>
              </div>
            )}
          </div>
        </div>
      )}

      {showeAlertMessage && <div className="alertMessage">{alertMessage}</div>}
    </div>
  );
}

export default jobs;
