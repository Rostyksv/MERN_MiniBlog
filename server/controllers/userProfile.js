import bcrypt from 'bcryptjs';

import User from '../models/user.js';

export const userProfile = async (req, res) => {
    const { id } = req.params;
    try {
        const profile = await User.findById(id);
        res.status(200).json(profile);
    } catch (error) {
        console.log(error);
    }
};

export const updateProfile = async (req, res) => {
    try {
        const data  = req.body;
        const { _id } = req.body;
        const user = await User.findById(_id);

        if(user.password !== data.password) {
            const hashedPassword = await bcrypt.hash(data.password, 12);
            const updated = await User.findByIdAndUpdate(_id, {...data, password: hashedPassword}, {new: true});
            return res.status(200).json(updated);
        }
        const updated = await User.findByIdAndUpdate(_id, data, {new: true});
        res.status(200).json(updated);
    } catch (error) {
        console.log(error);
    }
}