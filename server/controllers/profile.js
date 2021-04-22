import User from '../models/user.js';

export const getUserProfile = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const profile = await User.findById(id);
        res.status(200).json(profile);
    } catch (error) {
        console.log(error);
    }
}