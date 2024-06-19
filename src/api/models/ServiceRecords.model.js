const mongoose = require('mongoose');

const serviceRecordsSchema = new mongoose.Schema({
    dateUseService: {
        type: Date,
        required: true,
    },

    status: {
        type: String,
        enum: ['Processing', 'processed', 'Completed', 'Cancelled'],
        default: 'Processing',
    },
    product: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
    cancellation: {
        type: new mongoose.Schema({
            date: {
                type: Date,
                required: true,
            },
            reason: {
                type: String,
                required: true,
            },
        }),
        default: null,
    },
});

const _ServiceRecords = mongoose.model('ServiceRecords', serviceRecordsSchema);
module.exports = _ServiceRecords;
