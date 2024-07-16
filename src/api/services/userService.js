import _User from '../models/User.model';

const getUserById = async (data) => {
    try {
        const { id } = data;
        const user = await _User.findOne({ _id: id });
        if (user) {
            return {
                status: 'success',
                message: 'Get user detail success !',
                data: user,
            };
        }
        return {
            status: 'error',
            message: 'can not get user detail !',
            data: '',
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};
const disableUserById = async (data) => {
    try {
        const { id } = data;
        const user = await _User.findByIdAndUpdate(id, { isDisabled: true }, { new: true });
        if (user) {
            return {
                status: 'success',
                message: 'Disable user success !',
                data: user,
            };
        }
        return {
            status: 'error',
            message: 'can not find user !',
            data: '',
        };
    } catch (error) {
        console.log(error);
        return {
            status: 'error',
            message: 'something was wrong in service',
            data: '',
        };
    }
};

module.exports = {
    getUserById,
    disableUserById,
};
