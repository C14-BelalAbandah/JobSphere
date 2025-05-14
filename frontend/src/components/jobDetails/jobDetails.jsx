import React from "react";
import { use } from "react";
import { useState, useEffect, useContext } from "react";
import { toggleContext } from "../../App";
import { useNavigate } from "react-router-dom";
import "./jobsDetails.css";

function jobDetails() {
  const navigate = useNavigate();
  const { jobIndex, setJobIndex, applyJob, setApplyJob } =
    useContext(toggleContext);
  const [allJobs, setAllJobs] = useState(
    JSON.parse(localStorage.getItem("allJobs")) || []
  );

  return (
    <div className="jobDetailsPage">
      <div className="selectedJobInMedia">
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
          <strong className="RoleH">Role</strong>: {allJobs[jobIndex].role}
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
            }else{
              setApplyJob(allJobs[jobIndex]);
              navigate("/applyNow");
            }
           
          }}
        >
          Apply Now
        </button>
      </div>
    </div>
  );
}

export default jobDetails;
