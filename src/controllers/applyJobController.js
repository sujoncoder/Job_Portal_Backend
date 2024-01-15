import ApplyJob from "../models/applyJobModel.js"
import mongoose from "mongoose"


// applying jobs
export const applyJob = async (req, res) => {
    const {
        userId,
        jobId,
        coverleter,
        resume,
        available,
        userEmail,
        jobtitle,
        companyName
    } = req.body;

    try {
        const existingApplication = await ApplyJob.findOne({ userId, jobId });

        if (existingApplication) {
            return res.status(400).send({
                message: 'You have already applied for this job.'
            });
        };

        // Check if req.file exists (uploaded file information)
        if (!req.file) {
            return res.status(400).send({ message: 'Resume file is required' });
        }

        // If not, create a new application
        const result = await ApplyJob.create({
            userId,
            jobId,
            coverleter,
            resume: req.file.path,
            available,
            userEmail,


        });

        res.status(201).json({
            status: 'success',
            message: 'Applied successfully',
            result
        });

    } catch (err) {
        res.status(400).send({
            message: err.message
        });
    }
};


// get all applications
export const getAllApplication = async (req, res) => {
    try {
        const applications = await ApplyJob.find({})
        if (!applications) {
            res.status(404).send({
                message: 'Job application not found'
            });
            return;
        };

        res.status(200).json({
            status: "success",
            applications,
        });

    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};


// get user application
export const getUserApplications = async (req, res) => {
    const { email } = req.query;

    try {
        const result = await ApplyJob.find({ userEmail: email }).populate('jobId')

        if (!result || result.length === 0) {
            res.status(404).send({
                message: 'Job application not found'
            });
            return;
        };
        res.status(200).json({
            status: 'success',
            data: result,
        });
    } catch (err) {
        res.status(500).send({
            message: err.message
        });
    }
};