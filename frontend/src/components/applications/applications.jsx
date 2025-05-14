import React from "react";
import "./applications.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toggleContext } from "../../App";
import login from "../login/login";

function applications() {
  const { myJobs, setMyJobs, selectedJob, setSelectedJob } =
    useContext(toggleContext);

  const jobApplications = myJobs.find((ele, i) => {
    return ele._id === selectedJob;
  });

  return (
    <div>
      <div className="aplicationOnJob">
        {" "}
        The applications on {jobApplications.title} are:{" "}
      </div>
      <div className="applicationsPage">
        {jobApplications.applications.map((ele, i) => {
          return (
            <div className="allApllicationSec">
              <div key={i} className="applications">
                <div>
                  <strong>Name:</strong> {ele.firstName} {ele.lastName}
                </div>
                <div>
                  <strong>Email:</strong> {ele.email}
                </div>
                <div>
                  <strong>Education:</strong> {ele.education}
                </div>
                <div>
                  <strong>CV:</strong>{" "}
                  <a href={ele.cvUrl} target="_blank">
                    Open CV
                  </a>{" "}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default applications;
