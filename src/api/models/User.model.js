const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    street: {
        type: String,
    },
    district: {
        type: String,
    },
    city: {
        type: String,
    },
});

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    dob: {
        type: Date,
        require: true,
    },
    address: {
        type: addressSchema,
        default: {},
    },
    email: {
        type: String,
        require: true,
    },
    phone: {
        type: String,
        require: true,
    },
    password: {
        type: String,
        require: true,
    },
    role: {
        type: String,
        default: 'CUSTOMER',
    },
    isDisabled: {
        type: Boolean,
        default: false,
    },
    sex: {
        type: String,
        require: true,
    },
    isWorking: {
        type: Boolean,
        default: false,
    },
});

const _User = mongoose.model('User', userSchema);
module.exports = _User;
