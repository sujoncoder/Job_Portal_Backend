import Job from "../models/jobsModel.js";

export const getJobs = async (req, res, next) => {

  try {

    //pagination
    let page = Number(req.query.page) || 1
    let limit = Number(req.query.limit) || 2
    // let skip = (page - 1) * limit



    const allintern = await Job.find({}).limit(limit).skip((page - 1) * limit);
    //count document
    const totalIntern = await Intern.countDocuments()
    res.status(200).json({
      status: 'success',

      data: allintern,
      pagination: {
        totalPage: Math.ceil(totalIntern / limit),
        currentpage: page,
        previouspage: page - 1 > 0 ? page - 1 : null,
        nextpage: page + 1 <= Math.ceil(totalIntern / limit) ? page + 1 : null

      }

    })
  } catch (err) {
    res.status(400).json({
      status: 'failed',
      message: err.message
    })
  }
};


//post intern
export const postJob = async (req, res, next) => {
  try {
    const response = await Job.create(req.body);

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


// get intern by id
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