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

const _Address = mongoose.model('Address', addressSchema);
module.exports = _Address;
