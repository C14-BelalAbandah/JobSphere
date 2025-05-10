import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toggleContext } from "../../App";
import axios from "axios";
import "./editJob.css";
function editJob() {
  const navigate = useNavigate();
  const { selectedJob, setSelectedJob, myJobs, setMyJobs } =
    useContext(toggleContext);
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [showTitleInput, setShowTitleInput] = useState(false);
  const [showDescriptionInput, setShowDescriptionInput] = useState(false);
  const [showRequirmentsInput, setShowRequirmentsInput] = useState(false);
  const [showLocationInput, setShowLocationInput] = useState(false);
  const [showExperienceInput, setShowExperienceInput] = useState(false);
  const [showRoleInput, setShowRoleInput] = useState(false);
  const [showSalaryRangeInput, setShowSalaryRangeInput] = useState(false);
  

  const jobApplications = myJobs.find((ele, i) => {
    return ele._id === selectedJob;
  });

  const [newTitle, setNewTitle] = useState(jobApplications.title);
  const [newDescription, setNewDescription] = useState(jobApplications.description);
  const [newRequirments, setNewRequirments] = useState(jobApplications.requirements);
  const [newLocation, setNewLocation] = useState(jobApplications.location);
  const [newExperience, setNewExperience] = useState(jobApplications.experince);
  const [newRole, setNewRole] = useState(jobApplications.role);
  const [newSalaryRange, setNewSalaryRange] = useState(jobApplications.salaryRange);

  const saveChange= ()=>{
    
    axios.put(
        `http://localhost:5000/jobs/${selectedJob}`,
        {title:newTitle,
            description: newDescription, 
            requirements: newRequirments,
            location: newLocation,
            experince: newExperience,
            role: newRole,
            salaryRange: newSalaryRange},
        { headers: { Authorization: `bearer ${token}` } }
      ).then((result)=>{
console.log(result);

      }).catch((error)=>{
console.log(error);

      })
  }
  

  console.log(myJobs);
  return (
    <div className="editJobPage">
      <div className="headInEditJobPage"> Please Enter New </div>
      <div className="jobSection">
        <div className="editTitle">
          <div className="currentTitle">
            {" "}
            <strong className="JobTitleH"> Job Title:</strong>
            {jobApplications.title}{" "}
          </div>
          <div className="NewTitle">
            <button
              className="editButton"
              onClick={() => {
                setShowTitleInput(true);
              }}
            >
              Edit Title
            </button>
            {showTitleInput && (
              <input className="inputInEditJob" placeholder="Enter The New Title"
                onChange={(e) => {
                  setNewTitle(e.target.value);
                }}
              ></input>
            )}
          </div>
        </div>

        <div className="editDescription">
          <div className="currentDescription">
            {" "}
            <strong className="DescriptionH">Description:</strong>
            {jobApplications.description}
          </div>
          <div className="NewDescription">
            <button className="editButton" onClick={() => {
                setShowDescriptionInput(true);
              }}>Edit Description</button>
            {showDescriptionInput && (
              <textarea className="inputInEditJob" placeholder="Enter The New Title"
                onChange={(e) => {
                    if(e.target.value!==""){
                        setNewDescription(e.target.value);
                    }
                    
                }}
              />
            )}
          </div>
        </div>
        <div className="editRequirments">
          <div className="currentRequirments">
            <strong className="requirmentsH">Requirments:</strong>
            {jobApplications.requirements}
          </div>
          <div className="NewRequirments">
            <button className="editButton" onClick={() => {
                setShowRequirmentsInput(true);
              }}>Edit Requirments</button>
            {showRequirmentsInput && (
              <textarea className="inputInEditJob" placeholder="Enter The New Requirments"
                onChange={(e) => {
                    if(e.target.value!==" "){
                        setNewRequirments(e.target.value);
                    }

                }}
              />
            )}
          </div>
        </div>
        <div className="editLocation">
          <div className="currentLocation">
            {" "}
            <strong className="LocationH">Location:</strong>{" "}
            {jobApplications.location}
          </div>
          <div className="NewLocation">
            <button className="editButton" onClick={() => {
                setShowLocationInput(true);
              }}>Edit Location</button>
            {showLocationInput && (
              <input className="inputInEditJob" placeholder="Enter The New Location"
                onChange={(e) => {
                    if(e.target.value!==undefined){
                        setNewLocation(e.target.value);
                    }else {
                        setNewLocation(newLocation);
                    }

                  
                }}
              ></input>
            )}
          </div>
        </div>
        <div className="editExperience">
          <div className="currentExperience">
            {" "}
            <strong className="ExperinceH">Experience:</strong>{" "}
            {jobApplications.experince}
          </div>

          <div className="NewExperince">
            <button className="editButton" onClick={() => {
                setShowExperienceInput(true);
              }}>Edit Experience</button>
            {showExperienceInput && (
              <input className="inputInEditJob" placeholder="Enter The New Experience"
                onChange={(e) => {
                    if(e.target.value!==""){
                        setNewExperience(e.target.value);

                    }
                }}
              ></input>
            )}
          </div>
        </div>
        <div className="editRole">
          <div className="currentRole">
            {" "}
            <strong className="RoleH">Role:</strong> {jobApplications.role}
          </div>
          <div className="NewRole">
            <button className="editButton" onClick={() => {
                setShowRoleInput(true);
              }}>Edit Role</button>
            {showRoleInput && (
              <select
                className="selectRole"
                onChange={(e) => {
                    if(e.target.value!=="undefined"){
                        console.log("qqqqqqqqqqqqq");
                        
                        setNewRole(e.target.value);
                    }else{
                        console.log("ssssss");
                        
                        setNewRole(jobApplications.role)
                    }
                    if(e.target.value===undefined){
                        console.log("qqqqqqqqqqqqq");
                        
                        setNewRole("s;lkjhg");
                    }
                }}
                placeholder="Enter The New Role "
              >
                <option className="input"> Please Select</option>
                <option className="input"> Part-Time</option>
                <option className="input">Full-Time</option>
              </select>
            )}
          </div>
        </div>
        <div className="editSalaryRange">
          <div className="currentSalaryRange">
            {" "}
            <strong className="SalaryRangeH">Salary Range:</strong>{" "}
            {jobApplications.salaryRange}
          </div>
          <div className="NewSalaryRange">
            <button className="editButton" onClick={() => {
                setShowSalaryRangeInput(true);
              }}>Edit SalaryRange</button>
            {showSalaryRangeInput && (
              <input className="inputInEditJob" placeholder="Enter The New Salary Range"
                onChange={(e) => {
                    if(e.target.value!==""){
                        setNewSalaryRange(e.target.value);
                    }
                  
                }}
              ></input>
            )}
          </div>
        </div>

        <button onClick={()=>{
 console.log(newRole);

            saveChange()
        }} className="saveChangeButton">Save Change</button>
      </div>
    </div>
  );
}

export default editJob;
