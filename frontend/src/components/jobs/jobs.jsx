import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./jobs.css";
import { toggleContext } from "../../App";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "react-responsive";
import { FillLightAction } from "@cloudinary/url-gen/actions/adjust/FillLightAction";
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
    role,
    setRole,
    showAddPost,
    setShowAddPost,
    jobIndex,
    setJobIndex,
  } = useContext(toggleContext);
  const navigate = useNavigate();
  const [allJobs, setAllJobs] = useState([]);
  const [allJobsAfterFilteration, setAllJobsAfterFilteration] = useState([]);
  const [jobDetails, setJobDetails] = useState(false);
  const [jobTitle, setJobTitle] = useState("");
  const [token, setToken] = useState("notoken");
  const [searchResults, setSearchResults] = useState(false);
  const [showeAlertMessage, setShoweAlertMessage] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  const isDesktop = useMediaQuery({ query: "(max-width: 500px)" });
  localStorage.setItem("allJobs", JSON.stringify(allJobs));

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);

  if (role === "recruiter") {
    setShowAddPost(true);
  } else {
    setShowAddPost(false);
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
        setAllJobs(result.data.data);
      })
      .catch((error) => {});
  }, []);

  const findJob = () => {
    setJobIndex(0)
    axios
      .get(`http://localhost:5000/jobs/jobByTitle/${jobTitle}`, {
        headers: {
          authorization: `bearer ${token}`,
        },
      })
      .then((result) => {
        setAllJobsAfterFilteration(result.data.data);
        setSearchResults(true);
      })
      .catch((error) => {
        setShoweAlertMessage(true);
        setAlertMessage(error.response.data.message);
        setTimeout(() => {
          setShoweAlertMessage(false);
        }, 2000);
      });

      
  };
 console.log("allJobsAfterFilteration: ",allJobsAfterFilteration);
 console.log("jobIndex: ",jobIndex);
 
 
  return (
    <div className="jobsPage">
      <div className="searchSection">
        <input
          className="searchBar"
          placeholder="Search for Job By Title"
          onChange={(e) => {
            setJobTitle(e.target.value);
          }}
        ></input>
        <button
          className="searchButton"
          onClick={() => {
            findJob();
          }}
        >
          <svg
            className="searchIcon"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
          </svg>
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
                        if (isDesktop) {
                          navigate("/jobDetails");
                          setJobIndex(e.target.id);
                        } else {
                          setJobDetails(true);
                          setJobIndex(e.target.id);
                        }
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
                    if (token === null) {
                      setShoweAlertMessage(true);
                      setAlertMessage("Login to Apply For Jobs");
                      navigate("/login");
                      setTimeout(() => {
                        setShoweAlertMessage(false);
                      }, 2000);
                    } else {
                      setApplyJob(allJobs[jobIndex]);
                      navigate("/applyNow");
                    }
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
                        if (isDesktop) {
                          navigate("/jobDetails");
                          setJobIndex(e.target.id);
                        } else {
                          setJobDetails(true);
                          setJobIndex(e.target.id);
                        }
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
                <div>
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
                <button
                  className="applyNow"
                  onClick={(e) => {
                    if (token === null) {
                      setShoweAlertMessage(true);
                      setAlertMessage("Login to Apply For Jobs");
                      navigate("/login");
                      setTimeout(() => {
                        setShoweAlertMessage(false);
                      }, 2000);
                    } else {
                      setApplyJob(allJobsAfterFilteration[jobIndex]);
                      navigate("/applyNow");
                    }

                    
                  }}
                >
                  Apply Now
                </button>
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
