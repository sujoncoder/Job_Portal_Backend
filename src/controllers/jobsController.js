import Job from "../models/jobsModel.js";

export const getJobs = async (req, res, next) => {
  try {
    const titleSearch = req.query.search || "";
    // const countrySearch = req.query.country || "";
    const page = Number(req.query.page)
    const limit = Number(req.query.limit)


    const filters = { ...req.query }

    const excludeFields = ['page', 'limit', 'type', 'title', 'jobtimetype', 'locationtype']

    excludeFields.forEach(field => delete filters[field])

    const queries = {}
    //type search
    if (req.query.type) {
      const type = req.query.type
      queries.type = type
    }
    //title search
    if (req.query.title) {
      const titleSearch = req.query.title
      queries.title = { $regex: titleSearch, $options: "i" }
    }
    //jobtimetype search
    if (req.query.jobtimetype) {
      const jobtimetype = req.query.jobtimetype
      queries.jobtimetype = { $regex: jobtimetype, $options: "i" }
    }
    if (req.query.locationtype) {
      const locationtype = req.query.locationtype
      queries.locationtype = { $regex: locationtype, $options: "i" }
    };

    const jobs = await Job.find(queries, filters).limit(limit).skip((page - 1) * limit)
    // Count total documents based on the applied filters
    const totaljob = await Job.countDocuments(jobs);

    if (jobs.length === 0) {
      return res.status(400).send('no jobs  found')
    }

    res.status(200).json({
      status: 'success',
      data: jobs,
      length: jobs.length,
      pagination: {
        totalPage: Math.ceil(totaljob / limit),
        currentpage: page,
        previouspage: page - 1 > 0 ? page - 1 : null,
        nextpage: page + 1 <= Math.ceil(totaljob / limit) ? page + 1 : null,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message,
    });
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
      data: response
    })

  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message
    })
  }
};