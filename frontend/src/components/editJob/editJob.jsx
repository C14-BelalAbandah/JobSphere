import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { toggleContext } from "../../App";
import axios from "axios";
import "./editJob.css";
function editJob() {
  const navigate = useNavigate();
  const {
    selectedJob,
    setSelectedJob,
    myJobs,
    setMyJobs,
    resultMessage,
    setResultMessage,
    showeAlertMessage,
    setShoweAlertMessage,
  } = useContext(toggleContext);
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
  const [newDescription, setNewDescription] = useState(
    jobApplications.description
  );
  const [newRequirments, setNewRequirments] = useState(
    jobApplications.requirements
  );
  const [newLocation, setNewLocation] = useState(jobApplications.location);
  const [newExperience, setNewExperience] = useState(jobApplications.experince);
  const [newRole, setNewRole] = useState(jobApplications.role);
  const [newSalaryRange, setNewSalaryRange] = useState(
    jobApplications.salaryRange
  );

  const saveChange = () => {
    axios
      .put(
        `http://localhost:5000/jobs/${selectedJob}`,
        {
          title: newTitle,
          description: newDescription,
          requirements: newRequirments,
          location: newLocation,
          experince: newExperience,
          role: newRole,
          salaryRange: newSalaryRange,
        },
        { headers: { Authorization: `bearer ${token}` } }
      )
      .then((result) => {
        setShoweAlertMessage(true);
        setResultMessage(result.data.message);
        setTimeout(() => {
          setShoweAlertMessage(false);
          navigate("/myProfile");
        }, 3000);
      })
      .catch((error) => {
        setShoweAlertMessage(true);
        setResultMessage(error.response.data.message);
        setTimeout(() => {
          setShoweAlertMessage(false);
        }, 3000);
      });
  };

  return (
    <div className="editJobPage">
      <div className="headInEditJobPage"></div>
      <div className="jobSection">
        <div className="editTitle">
          <div className="currentTitle">
            {" "}
            <strong className="JobTitleH"> Job Title:</strong>
            {jobApplications.title}{" "}
          </div>
          <div className="NewTitle">
            
            {showTitleInput && (
              <input
                className="inputInEditJob"
                placeholder="Enter The New Title"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setNewTitle(e.target.value);
                  }
                }}
              ></input>
            )}
            <button
              className="editButton"
              onClick={() => {
                setShowTitleInput(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>

        <div className="editDescription">
          <div className="currentDescription">
            {" "}
            <strong className="DescriptionH">Description:</strong>
            {jobApplications.description}
          </div>
          <div className="NewDescription">
            
            {showDescriptionInput && (
              <textarea
                className="inputInEditJob"
                placeholder="Enter The New Title"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setNewDescription(e.target.value);
                  }
                }}
              />
            )}
            <button
              className="editButton"
              onClick={() => {
                setShowDescriptionInput(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="editRequirments">
          <div className="currentRequirments">
            <strong className="requirmentsH">Requirments:</strong>
            {jobApplications.requirements}
          </div>
          <div className="NewRequirments">
            
            {showRequirmentsInput && (
              <textarea
                className="inputInEditJob"
                placeholder="Enter The New Requirments"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setNewRequirments(e.target.value);
                  }
                }}
              />
            )}
            <button
              className="editButton"
              onClick={() => {
                setShowRequirmentsInput(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="editLocation">
          <div className="currentLocation">
            {" "}
            <strong className="LocationH">Location:</strong>{" "}
            {jobApplications.location}
          </div>
          <div className="NewLocation">
            
            {showLocationInput && (
              <input
                className="inputInEditJob"
                placeholder="Enter The New Location"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    jobApplications.location;
                    setNewLocation(e.target.value);
                  }
                }}
              ></input>
            )}
            <button
              className="editButton"
              onClick={() => {
                setShowLocationInput(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="editExperience">
          <div className="currentExperience">
            {" "}
            <strong className="ExperinceH">Experience:</strong>{" "}
            {jobApplications.experince}
          </div>

          <div className="NewExperince">
            
            {showExperienceInput && (
              <input
                className="inputInEditJob"
                placeholder="Enter The New Experience"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setNewExperience(e.target.value);
                  }
                }}
              ></input>
            )}
            <button
              className="editButton"
              onClick={() => {
                setShowExperienceInput(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="editRole">
          <div className="currentRole">
            {" "}
            <strong className="RoleH">Role:</strong> {jobApplications.role}
          </div>
          <div className="NewRole">
            
            {showRoleInput && (
              <select
                className="selectRole"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setNewRole(e.target.value);
                  }
                }}
                placeholder="Enter The New Role "
              >
                <option className="input"> Please Select</option>
                <option className="input"> Part-Time</option>
                <option className="input">Full-Time</option>
              </select>
            )}
            <button
              className="editButton"
              onClick={() => {
                setShowRoleInput(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>
        <div className="editSalaryRange">
          <div className="currentSalaryRange">
            {" "}
            <strong className="SalaryRangeH">Salary Range:</strong>{" "}
            {jobApplications.salaryRange}
          </div>
          <div className="NewSalaryRange">
            
            {showSalaryRangeInput && (
              <input
                className="inputInEditJob"
                placeholder="Enter The New Salary Range"
                onChange={(e) => {
                  if (e.target.value !== "") {
                    setNewSalaryRange(e.target.value);
                  }
                }}
              ></input>
            )}
            <button
              className="editButton"
              onClick={() => {
                setShowSalaryRangeInput(true);
              }}
            >
              Edit
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            saveChange();
          }}
          className="saveChangeButton"
        >
          Save Change
        </button>
      </div>
      {showeAlertMessage && <div className="alertMessage">{resultMessage}</div>}
    </div>
  );
}

export default editJob;
