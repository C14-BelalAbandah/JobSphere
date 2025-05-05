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
          {!loginToggle && <button className="loginIcon"> <svg className="iconOfLogin" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
  <path fillRule="evenodd" d="M6 3.5a.5.5 0 0 1 .5-.5h8a.5.5 0 0 1 .5.5v9a.5.5 0 0 1-.5.5h-8a.5.5 0 0 1-.5-.5v-2a.5.5 0 0 0-1 0v2A1.5 1.5 0 0 0 6.5 14h8a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-8A1.5 1.5 0 0 0 5 3.5v2a.5.5 0 0 0 1 0z"/>
  <path fillRule="evenodd" d="M11.854 8.354a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H1.5a.5.5 0 0 0 0 1h8.793l-2.147 2.146a.5.5 0 0 0 .708.708z"/>
</svg>
            Login</button>}
          {!registerToggle && <button className="registerIcon"> <svg className="iconOfRegister" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
  <path d="M6.835 5.092v2.777h1.549c.995 0 1.573-.463 1.573-1.36 0-.913-.596-1.417-1.537-1.417z"/>
  <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm3.5 4.002h3.11c1.71 0 2.741.973 2.741 2.46 0 1.138-.667 1.94-1.495 2.24L11.5 12H9.98L8.52 8.924H6.836V12H5.5z"/>
</svg>
            Register</button>}
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
