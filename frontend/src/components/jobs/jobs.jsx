import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import "./jobs.css";

function jobs() {
  const [allJobs, setAllJobs] = useState([]);
  const [jobDetails, setJobDetails] = useState(false);
  const [jobIndex, setJobIndex] = useState(0);

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
  return (
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
                <svg className="locationIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
</svg>
                <strong className="LocationH">Location</strong>: {ele.location}{" "}
              </div>
            
              <button className="detailsButton"
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
          <svg className="locationIcon" xmlns="http://www.w3.org/2000/svg" width="16" height="14" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10m0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6"/>
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
  );
}

export default jobs;
