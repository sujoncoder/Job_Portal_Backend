import ApplyJob from "../models/applyJobModel.js"
import mongoose from "mongoose"

//apply
export const applyJob = async (req, res) => {
    try {
        const { userId, jobId, coverleter, resume, available, userEmail,
            jobtitle, companyName } = req.body;

        // Check if the user has already applied for this job
        const existingApplication = await ApplyJob.findOne({ userId, jobId });

        if (existingApplication) {
            return res.status(400).json({
                status: 'failed',
                message: 'You have already applied for this job.'
            });
        }



        // Check if req.file exists (uploaded file information)
        if (!req.file) {
            return res.status(400).json({ status: 'failed', message: 'Resume file is required' });
        }


        // If not, create a new application
        const result = await ApplyJob.create({
            userId,
            jobId,
            coverleter,
            resume: req.file.path,
            available,
            userEmail,
            jobtitle,
            companyName

        });

        res.status(201).json({
            status: 'success',
            message: 'Applied successfully',
            result
        });
    } catch (err) {
        res.status(400).json({
            status: 'failed',
            message: err.message
        });
    }
};

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
    const { email } = req.query

    try {
        const result = await ApplyJob.find({ userEmail: email })

        if (!result || result.length === 0) {
            // Handle the case where no job application is found with the given ID
            res.status(404).json({
                status: 'failed',
                message: 'Job application not found'
            });
            return;
        }
        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (err) {
        // Handle other errors
        res.status(500).json({
            status: 'failed',
            message: err.message
        });
    }

}