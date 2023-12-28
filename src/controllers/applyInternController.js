import ApplyIntern from "../models/applyInternModel"



export const applyIntern = async (req, res) => {

    try {
        const result = ApplyIntern.create(req.body)
        res.status(201).json({
            status: 'success',
            result
        })
    } catch (err) {

        res.status(400).json({
            status: 'failed',
            message: err.message
        })
    }


}