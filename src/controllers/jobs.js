const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

//get all jobs associated with this user
const getJobs = async (req, res) => {
  const userId = req.user.userId;

  const jobs = await Job.find({ createdBy: userId }).sort("createdAt");

  res.status(StatusCodes.OK).json({ jobs });
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.userId;

  const job = await Job.create(req.body);
  if (!job) {
    return res.status("404").json({ msg: "job with this id does not exist" });
  }
  res.status(StatusCodes.CREATED).json({ job });
};

const getJob = async (req, res) => {
  const id = req.params.id;

  const job = await job.findOne({ _id: id, createdBy: req.user.userId });
};

const updateJob = async (req, res) => {
  const {
    body: { company, position },
    params: { id: jobId },
    user: { userId },
  } = req;

  if (company === "" || position === "") {
    return res
      .status(400)
      .json({ msg: "company or position fields cannot be empty" });
  }

  const job = await Job.findByIdAndUpdate(
    { _id: jobId, createdBy: userId },
    req.body,
    { new: true, runValidators: true }
  ); 

  if(!job){
    return res.status(404).json({msg:'No job with this id'})
  }
  res.status(StatusCodes.OK).json({job})
};

const deleteJob = async (req, res) => {
  const {
    body: { company, position },
    params: { id: jobId },
    user: { userId },
  } = req;
   
  const job = await Job.findOneAndRemove({_id : jobId,createdBy : userId})

  if(!job){
    return res.status(404).json({msg:'No job with this id'})
  }
  res.status(StatusCodes.OK).send()

};

module.exports = {
  getJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
};
