import User from "./userModel.js";


export const updatePassword = async () => {
    const { oldPass, newPass, confirmPass } = req.body;
    try {
        const user = await User.exists()
    } catch (error) {

    }
}