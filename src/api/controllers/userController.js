import userService from '../services/userService';

const getUserById = async (req, res) => {
    try {
        let data = await userService.getUserById(req.params);
        return res.status(200).json({
            status: data.status,
            message: data.message,
            data: data.data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'error from server',
            data: '',
        });
    }
};
const disableUserById = async (req, res) => {
    try {
        let data = await userService.disableUserById(req.query);
        return res.status(200).json({
            status: data.status,
            message: data.message,
            data: data.data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'error from server',
            data: '',
        });
    }
};
const getAllUser = async (req, res) => {
    try {
        let data = await userService.getAllUser(req);
        return res.status(200).json({
            status: data.status,
            message: data.message,
            data: data.data,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            status: 'error',
            message: 'error from server',
            data: '',
        });
    }
};

module.exports = {
    getUserById,
    disableUserById,
    getAllUser,
};
