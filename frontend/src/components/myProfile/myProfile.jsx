import React from "react";
import "./myProfile.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toggleContext } from "../../App";
import axios from "axios";
import login from "../login/login";
function myProfile() {
  const { role, setRole, userId, setUserId,myJobs, setMyJobs,selectedJob, setSelectedJob } = useContext(toggleContext);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  
  const [showPostedJobs, setShowPostedJobs] = useState(false);
  console.log(userId);

  useEffect(() => {
    axios
      .get(`http://localhost:5000/jobs/${userId}`, {
        headers: {
          Authorization: `bearer ${token}`,
        },
      })
      .then((result) => {
        console.log(result);
        setMyJobs(result.data.data);
        setShowPostedJobs(true);
        console.log("app: ", result.data.data.applications);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  console.log(myJobs);

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
                    <button className="viewButton" onClick={()=>{

                      console.log(ele._id);
                      setSelectedJob(ele._id)
                      navigate("applications")
                    }}>View</button>
                  </div>
                  <button className="editJobButton" onClick={()=>{

console.log(ele._id);
setSelectedJob(ele._id)
navigate("editJob")
}} >Edit Job</button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default myProfile;
