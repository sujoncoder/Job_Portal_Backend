import ApplyJob from "../models/applyJobModel.js"
import mongoose from "mongoose"

//apply
export const applyJob = async (req, res) => {

    try {
        const result = ApplyJob.create(req.body)
        console.log(req.body)
        res.status(201).json({
            status: 'success',
            "data": {
                "message": "Operation completed successfully",
                "result": result
            }
        })
    } catch (err) {

        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }


}

export const getAllApplication = async (req, res) => {
    try {

        const applications = await ApplyJob.find({})
        if (!applications) {
            // Handle the case where no job application is found with the given ID
            res.status(404).json({
                status: 'failed',
                message: 'Job application not found'
            });
            return;
        }

        res.status(200).json({
            status: "success",
            applications,
        })

    } catch (err) {
        // Handle other errors
        res.status(500).json({
            status: 'failed',
            message: err.message
        });

    }
}
export const getUserApplications = async (req, res) => {
    const { id } = req.params
    try {
        const result = await ApplyJob.find({ userId: id })

        if (!result) {
            // Handle the case where no job application is found with the given ID
            res.status(404).json({
                status: 'failed',
                message: 'Job application not found'
            });
            return;
        }
        res.status(200).json({
            status: 'success',
            result,
        });
    } catch (err) {
        // Handle other errors
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }

}