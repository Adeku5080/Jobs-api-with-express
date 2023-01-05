const Job = require("../models/Job");
const { StatusCodes } = require("http-status-codes");

//get all jobs associated with this user
const getJobs = async (req, res, next) => {
  try {
    const userId = req.user.userId;

    const jobs = await Job.find({ createdBy: userId }).sort("createdAt");

    res.status(StatusCodes.OK).json({ jobs });
  } catch (err) {
    next(err);
  }
};

const createJob = async (req, res, next) => {
  try {
    req.body.createdBy = req.user.userId;

    const job = await Job.create(req.body);
    if (!job) {
      return res.status("404").json({ msg: "job with this id does not exist" });
    }
    res.status(StatusCodes.CREATED).json({ job });
  } catch (err) {
    next(err);
  }
};

const getJob = async (req, res, next) => {
  try {
    const id = req.params.id;

    const job = await job.findOne({ _id: id, createdBy: req.user.userId });

    if (!job) {
      return res
        .status(404)
        .json({ msg: "Job with the given id does not exist" });
    }

    res.status(200).json({ job });
  } catch (err) {
    next(err);
  }
};

const updateJob = async (req, res, next) => {
  try {
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

    if (!job) {
      return res.status(404).json({ msg: "No job with this id" });
    }
    res.status(StatusCodes.OK).json({ job });
  } catch (err) {
    next(err);
  }
};

const deleteJob = async (req, res, next) => {
  try {
    const {
      body: { company, position },
      params: { id: jobId },
      user: { userId },
    } = req;

    const job = await Job.findOneAndRemove({ _id: jobId, createdBy: userId });

    if (!job) {
      return res.status(404).json({ msg: "No job with this id" });
    }
    res.status(StatusCodes.OK).send();
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getJobs,
  createJob,
  getJob,
  updateJob,
  deleteJob,
};
