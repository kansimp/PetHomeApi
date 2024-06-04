const mongoose = require('mongoose');
import _Address from './Address.model';

const orderSchema = new mongoose.Schema({
    dateOrder: {
        type: Date,
        default: Date.now,
    },
    totalPrice: {
        type: Number,
    },
    status: {
        type: String,
    },
    addressShipping: {
        type: _Address.schema,
    },
});

const _Order = mongoose.model('Order', orderSchema);
module.exports = _Order;
