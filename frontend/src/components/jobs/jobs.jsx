import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./jobs.css";
import { toggleContext } from "../../App";

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
  } = useContext(toggleContext);
  const [allJobs, setAllJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState(false);
  const [jobIndex, setJobIndex] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [token, setToken] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  console.log(token);

  if (token !== null) {
    setLoginToggle(true);
    setRigisterToggle(true);
    setUserInfo(true)
  } else {
    setLoginToggle(false);
    setRigisterToggle(false);
    setUserInfo(false)

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

  /*
  useEffect(()=>{
axios.get(`http://localhost:5000/jobs/jobByTitle/${jobTitle}`,{
  headers:{
    authorization: `bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODE1MDVmM2YwZGNlZDExMDZkNGFiNTYiLCJyb2xlIjp7Il9pZCI6IjY4MTRlM2RkNzcwOTQ4ZWY2ZThhN2ViMCIsInJvbGUiOiJyZWNydWl0ZXIiLCJwZXJtaXNzaW9ucyI6WyJBRERfUE9TVCIsIlNFRV9BUFBMSUNBVElPTlMiLCJTRUVfUE9TVFMiXSwiX192IjowfSwiaWF0IjoxNzQ2MjE0MDAwLCJleHAiOjE3NDY4MTg4MDB9.SeTYCLORuj9Nwvs4rzH_FWudCZId5lFqryClVOHNQM0`
  }
})
.then((result)=>{
 console.log(result.data);
 
})
.catch((error)=>{
console.log("error: ",error);

})
  },[])
  */
  return (
    <div className="jobsPage">
      <input
        className="searchBar"
        placeholder="Search for Job By Title"
        onChange={(e) => {
          console.log(e.target.value);
          setJobTitle(e.target.value);
        }}
      ></input>
      <div className="allJobsAndJobDetails">
        <div className="allJobs">
          {allJobs.map((ele, i) => {
            return (
              <div key={i} className="jobBox">
                <div className="jobTitle">
                  {" "}
                  <strong className="JobTitleH"> Job Title</strong>: {ele.title}
                </div>
                <div className="description">
                  {" "}
                  <strong className="DescriptionH">Description</strong>:{" "}
                  {ele.description}
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
                    console.log("jobDetails[jobIndex]: ", allJobs[jobIndex]);
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
              {allJobs[jobIndex].requirements.map((ele, i) => {
                return (
                  <div key={i}>
                    <div> {ele} </div>
                  </div>
                );
              })}
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
            <button className="applyNow">Apply Now</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default jobs;
