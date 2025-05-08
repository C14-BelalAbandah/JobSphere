import React from 'react'
import { useState,useEffect,useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import "./newJob.css"
function newJob() {
    const [title, setTitle] = useState("")
    const [description, setDescription] = useState("")
    const [requirments, setRequirments] = useState("")
    const [location, setLocation] = useState("")

  return (
    <div className='newJobPage'>
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
          <input
            className="input"
            onChange={(e) => {
              setDescription(e.target.value);
            }}
            placeholder="Enter Job Description"
          ></input>
        </div><div className="requirmentsSec">
          <div className="requirmentsText"> Requirments</div>
          <input
            className="input"
            onChange={(e) => {
              setRequirments(e.target.value);
            }}
            placeholder="Enter Job Requirments"
          ></input>
        </div><div className="locationSec">
          <div className="locationText"> Location</div>
          <input
            className="input"
            onChange={(e) => {
              setLocation(e.target.value);
            }}
            placeholder="Enter Job Location"
          ></input>
        </div>
        <button className='addJobButton'>Add Job</button>
    </div>
  )
}

export default newJob