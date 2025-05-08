import React from "react";
import "./myProfile.css";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toggleContext } from "../../App";
import axios from "axios";
import login from "../login/login";
function myProfile() {
  const { role, setRole, userId, setUserId } = useContext(toggleContext);
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [myJobs, setMyJobs] = useState([]);
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
        <div className="postedJobsSection">
          <strong className="myPostedJobs">My Posted Jobs:</strong>
          {myJobs.map((ele, i) => {
            return (
              <div key={i} className="jobDetails">
                <div>{ele.title}</div>
                <div>{ele.description}</div>
                <div>{ele.requirements}</div>
                <div>{ele.location}</div>
                <div>{ele.experince}</div>
                <div>{ele.role}</div>
                <div>{ele.salaryRange}</div>
                <div>
                  {" "}
                  {ele.applications.map((ele, i) => {
                    return (
                      <div key={i} className="applications">
                        <div>{ele.firstName}</div>
                        <div>{ele.lastName}</div>
                        <div>{ele.email}</div>
                        <div>{ele.education}</div>
                      </div>
                    );
                  })}
                </div>
                <button className="editJobButton">Edit Job</button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default myProfile;
