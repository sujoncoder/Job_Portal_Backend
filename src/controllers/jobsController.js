import Job from "../models/jobsModel.js";

export const getJobs = async (req, res, next) => {
  try {
    const titleSearch = req.query.search || "";
    // const countrySearch = req.query.country || "";
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const titleSearchRegExp = new RegExp(".*" + titleSearch + ".*", "i");

    const jobs = await Job.find({ titleSearchRegExp }).limit(limit).skip((page - 1) * limit);

    if (jobs.length === 0) {
      return res.status(404).send("search result not found")
    };

    //count document
    const totalJob = await Job.countDocuments();
    res.status(200).json({
      status: 'success',
      total: jobs.length,
      jobs,
      pagination: {
        totalPage: Math.ceil(totalJob / limit),
        currentpage: page,
        previouspage: page - 1 > 0 ? page - 1 : null,
        nextpage: page + 1 <= Math.ceil(totalJob / limit) ? page + 1 : null
      }
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message
    })
  }
};


// post job
export const postJob = async (req, res, next) => {
  const { title, aboutwork, aboutcompany, skills, numberofopening, status, jobtype, locationtype, jobtimetype, duration, location, salary } = req.body;

  try {
    const response = await Job.create({
      title,
      aboutwork,
      aboutcompany,
      skills,
      numberofopening,
      status,
      jobtype,
      locationtype,
      jobtimetype,
      duration,
      location,
      salary
    });

    if (res.length === 0) {
      res.status(401).json({
        status: 'not found'
      })
    };

    res.status(201).json({
      status: 'created successfully',
      data: response
    })

  } catch (err) {
    res.status(401).json({
      status: 'failed to create',
      message: err.message
    })
  }
};


// get job by id
export const getJobById = async (req, res, next) => {
  const { id } = req.params;

  try {
    const response = await Job.findById({ _id: id })
    res.status(200).json({
      status: 'success',
      response
    })

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message
    })
  }
};