import React, { useEffect } from "react";
import "./App.css";
import { createContext, useContext, useState } from "react";
import axios from "axios";
import Jobs from "./components/jobs/jobs";
import { Link, Route, Routes, useNavigate, useParams } from "react-router-dom";
export const toggleContext = createContext();


const App = () => {
  const [loginToggle, setLoginToggle] = useState(false);
  const [registerToggle, setRigisterToggle] = useState(false);
  const [allJobs, setAllJobs] = useState([]);
  return (
    <div className="App">
      <div className="header">
        <div className="headerPartOne">
          <div className="title">
            J<img className="logo" src="./images/logo.png" />
            bSphere
          </div>
          <div className="jobsIcon">Jobs</div>
        </div>
        <div className="headerPartTwo">
          {!loginToggle && <div className="loginIcon">Login</div>}
          {!registerToggle && <div className="registerIcon">Register</div>}
        </div>
      </div>

      <toggleContext.Provider
        value={{
          loginToggle,
          setLoginToggle,
          registerToggle,
          setRigisterToggle,
          allJobs,
          setAllJobs,
        }}
      >
        <Routes>
          <Route path="/" element={<Jobs />} />
          
        </Routes>
 
      </toggleContext.Provider>
    </div>
  );
};

export default App;
