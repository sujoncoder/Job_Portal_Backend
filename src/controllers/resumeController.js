import Resume from '../models/editResumeModel.js';

// Controller function to handle creating a new resume
export const createResume = async (req, res) => {
    const { name, email, phone, location, education, workExperience } = req.body;

    try {
        // Create a new resume instance
        const newResume = new Resume({
            name,
            email,
            phone,
            location,
            education,
            workExperience,
        });

        // Save the new resume
        const savedResume = await newResume.save();

        return res.status(201).json(savedResume);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};


// edit resume
export const editResume = async (req, res) => {
    const resumeId = req.params.id;
    const { updatedData } = req.body;

    try {
        const updatedDocument = await Resume.findByIdAndUpdate(resumeId, req.body, { new: true });

        if (!updatedDocument) {
            return res.status(404).json({ message: 'Resume not found' });
        }
        return res.status(200).json(updatedDocument);

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

