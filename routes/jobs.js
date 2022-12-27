const express = require("express");
const jobRouter = express.Router();
const { getJob,getJobs,createJob,deleteJob,updateJob } = require("../src/controllers/jobs");

jobRouter.route("/").get(getJobs).post(createJob);
jobRouter.route("/:id").get(getJob).patch(updateJob).delete(deleteJob);


module.exports=jobRouter;
