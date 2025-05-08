import React from "react";
import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./newJob.css";
import axios from "axios";
import { toggleContext } from "../../App";

function newJob() {
    const  navigate= useNavigate()
  const {
    resultMessage,
    setResultMessage,
    showeAlertMessage,
    setShoweAlertMessage,
  } = useContext(toggleContext);
  const [token, setToken] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [requirements, setRequirements] = useState("");
  const [location, setLocation] = useState("");
  const [experince, setExperince] = useState("");
  const [role, setRole] = useState("");
  const [salaryRange, setSalaryRange] = useState("");

  useEffect(() => {
    setToken(localStorage.getItem("token"));
  }, []);
  console.log(token);

  const handleAddJob = () => {
    axios
      .post(
        "http://localhost:5000/jobs",
        {
          title,
          description,
          requirements,
          location,
          experince,
          role,
          salaryRange,
        },
        {
          headers: {
            authorization: `bearer ${token}`,
          },
        }
      )
      .then((result) => {
        console.log("token: ", token);
        console.log("result: ", result);
        setShoweAlertMessage(true);
        console.log("showeAlertMessage: ", showeAlertMessage);
        console.log("result.data.message: ",result.data.message);
        
        setResultMessage(result.data.message);
        setTimeout(() => {
          setShoweAlertMessage(false);
          navigate("/");
        }, 3000);
      })
      .catch((error) => {
        console.log("  token:  ", token);
        console.log("error: ", error);
        setShoweAlertMessage(true);
        setResultMessage(error.response.data.message);
        setTimeout(() => {
          setShoweAlertMessage(false);
          navigate("/")
        }, 3000);
     
      });
  };

  return (
    <div className="newJobPage">
      <div className="newJobInputs">
        <div className="titleSec">
          <div className="titleText"> Title</div>
          <input
            className="input"
            onChange={(e) => {
              setTitle(e.target.value);
            }}
            placeholder="Enter Job Title"
          ></input>
        </div>
        <div className="descriptionSec">
          <div className="descriptionText"> Description</div>
          <textarea
            className="textArea"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Enter Job Description"
          />
        </div>
        <div className="requirmentsSec">
          <div className="requirmentsText"> Requirments</div>
          <textarea
            className="textArea"
            onChange={(e) => {
              setRequirements(e.target.value);
            }}
            placeholder="Enter Job Requirments"
          />
        </div>
        <div className="locationSec">
          <div className="locationText"> Location</div>
          <input
            className="input"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            placeholder="Enter Job Location"
          ></input>
        </div>
        <div className="experinceSec">
          <div className="experinceText"> Experince</div>
          <input
            className="input"
            onChange={(e) => {
              setExperince(e.target.value);
            }}
            placeholder="Enter Job Experince"
          ></input>
        </div>
        <div className="roleSec">
          <div className="roleText"> Role</div>
          <select
            className="selectRole"
            onChange={(e) => {
              setRole(e.target.value);
            }}
            placeholder="Enter Job Role"
          >
            <option className="input"> Please Select</option>
            <option className="input"> Part-Time</option>
            <option className="input">Full-Time</option>
          </select>
        </div>
        <div className="salaryRangeSec">
          <div className="salaryRangeText"> Salary Range</div>
          <input
            className="input"
            onChange={(e) => {
              setSalaryRange(e.target.value);
            }}
            placeholder="Enter Job Salary Range"
          ></input>
        </div>
      </div>

      <button
        className="addJobButton"
        onClick={() => {
          handleAddJob();
        }}
      >
        Add Job
      </button>
      {showeAlertMessage && <div className="alertMessage">{resultMessage}</div>}
    </div>
  );
}

export default newJob;
