require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

const db = require("./models/db");
const app = express();
const PORT = process.env.PORT;


app.use(cors());
app.use(express.json());

const usersRouter = require("./routes/usersRouter");
const jobsRouter = require("./routes/jobsRouter");
const rolesRouter = require("./routes/rolesRouter");
const applicationsRouter = require("./routes/applicationsRouter");
const cvRouter= require("./routes/cvRouter")
// Handles any other endpoints [unassigned - endpoints]
app.use("/users", usersRouter);
app.use("/jobs", jobsRouter);
app.use("/roles", rolesRouter);
app.use("/applications", applicationsRouter);
app.use("/cv",cvRouter);
app.use("*", (req, res) => res.status(404).json("NO content at this path"));

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
