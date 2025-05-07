const { populate } = require("../models/applicationSchema");
const jobsModel = require("../models/jobsSchema");
const applicationModel = require("../models/applicationSchema");
const { application } = require("express");

const getAllJobs = (req, res) => {
  jobsModel
    .find({})
    .populate("jobPoster")
    .then((result) => {
      res.status(201).json({
        data: result,
        message: "All jobs",
      });
    })
    .catch((error) => {
      res.status(501).json({
        data: error,
        message: "error in getting jobs",
      });
    });
};
const addJob = (req, res) => {
  const { title, description, requirements, location } = req.body;
  const jobPoster = req.token.userId;
  const newJob = new jobsModel({
    title,
    description,
    requirements,
    location,
    jobPoster,
  });

  newJob
    .save()
    .then((result) => {
      res.status(201).json({
        data: result,
        message: "the job has been added successfully",
      });
    })
    .catch((error) => {
      res.status(501).json({
        data: error,
        message: "error in adding the job",
      });
    });
};
const editJob = (req, res) => {
  const jobId = req.params.id;
  const { title, description, requirements, location } = req.body;
  const modifierId = req.token.userId;
  const midifiedJob = { title, description, requirements, location };

  jobsModel
    .findById(jobId)
    .populate("jobPoster", "_id")
    .then((result) => {
      if (result.jobPoster._id.toString() === modifierId) {
        jobsModel
          .findOneAndUpdate(
            { _id: jobId },
            { $set: midifiedJob },
            { new: true }
          )
          .then((result) => {
            res.status(200).json({
              data: result,
              message: "the job has been modified successfully",
            });
          })
          .catch((error) => {
            res.status(501).json({
              data: error,
              message: "error in modifying the job",
            });
          });
      } else {
        res.status(501).json({
          message: "you are not allowed to edit this job",
        });
      }
    })
    .catch((error) => {
      res.status(404).json({
        data: error,
        message: "error in finding the job",
      });
    });
};
const removeJob = (req, res) => {
  const jobId = req.params.id;
  const modifierId = req.token.userId;
  jobsModel
    .findById(jobId)
    .populate("jobPoster", "_id")
    .then((result) => {
      if (result.jobPoster._id.toString() === modifierId) {
        jobsModel
          .findOneAndDelete({ _id: jobId })
          .then((result) => {
            res.status(200).json({
              data: result,
              message: "the job has been modified successfully",
            });
          })
          .catch((error) => {
            res.status(501).json({
              data: error,
              message: "error in modifying the job",
            });
          });
      } else {
        res.status(501).json({
          message: "you are not allowed to remove this job",
        });
      }
    })
    .catch((error) => {
      res.status(404).json({
        data: error,
        message: "error in finding the job",
      });
    });
};

const newApplication = (req, res) => {
  const { firstName, lastName, email, education } = req.body;
  const userId = req.token.userId;
  const jobId = req.params.jobId;

  jobsModel
    .findById(jobId)
    .populate("applications")
    .then((result) => {
      const appliedUsersIdArray = result.applications.map((ele) => {
        return ele.userId.toString();
      });

      if (appliedUsersIdArray.includes(userId)) {
        res.status(501).json({
          message: "You already applied for this jobs",
        });
      } else {
        const addApplication = new applicationModel({
          firstName,
          lastName,
          email,
          education,
          userId,
          jobId,
        });
        addApplication
          .save()
          .then((result) => {
            console.log(result);

            console.log(result.id);

            jobsModel
              .findOneAndUpdate(
                { _id: jobId },
                { $push: { applications: result.id } },
                { new: true }
              )
              .populate("applications")
              .then((result) => {
                res.status(201).json({
                  data: result,
                  message: "Your application was submitted successfully",
                });
              })
              .catch((error) => {
                console.log(error);

                res.status(501).json({
                  data: error,
                  message: "Error in adding the application in jobs page",
                });
              });
          })
          .catch((error) => {
            console.log(error);

            res.status(501).json({
              data: error,
              message: "Error in submitting the application",
            });
          });
      }
    })
    .catch((error) => {
      res.status(501).json({
        data: error,
        message: "Error in getting the job",
      });
    });
};

const getJobByPosterId = (req, res) => {
  const jobPosterId = req.params.jobPosterId;
  jobsModel
    .find({ jobPoster: jobPosterId })
    .populate("jobPoster", "firstName")
    .then((result) => {
      res.status(200).json({
        data: result,
        message: "Your Jobs",
      });
    })
    .catch((error) => {
      console.log(error);

      res.status(404).json({
        data: error,
        message: "Error in getting the job",
      });
    });
};

const getJobByTitle=(req,res)=>{
  const jobTitle= req.params.jobTitle.toUpperCase()
  console.log("jobTitle: ",jobTitle);
  
  jobsModel.find({})
  
  .then((result)=>{
    console.log(result);

    const titlesArray= result.map((ele,i)=>{
      return ele.title
    })
    console.log("line 232: ",titlesArray);

    const jobByTitleArray= titlesArray.filter((ele)=>{
      console.log(ele);
      console.log("ele.toUpperCase().includes(jobTitle): " ,ele.toUpperCase().includes(jobTitle));
      
      return ele.toUpperCase().includes(jobTitle)
    })

    console.log(jobByTitleArray.length);
    if(jobByTitleArray.length===0){
      res.status(404).json({
        message: "No Jobs Found",
      });
    }
     console.log("jobByTitleArray",jobByTitleArray);
     const jobsArray=[]
     const jobs= jobByTitleArray.map((ele,i)=>{
       jobsModel.find({title:ele})
       .populate("jobPoster")
       .then((result)=>{
        jobsArray.push(result)
        if(i===jobByTitleArray.length-1){
          console.log(jobsArray);
          const newJobsArray= jobsArray.map((ele)=>{
            return ele[0]
          })
          res.status(200).json({
            data: newJobsArray,
            message: "The Jobs",
          });
        }    
       })
       .catch((error)=>{
        res.status(404).json({
          data: error,
          message: "Error in getting the job",
        });
       })
       
     })
  })
  .catch((error)=>{    
    res.status(404).json({
      data: error,
      message: "Error in getting the job",
    });
  })
}

module.exports = {
  getAllJobs,
  addJob,
  editJob,
  removeJob,
  newApplication,
  getJobByPosterId,
  getJobByTitle
};
