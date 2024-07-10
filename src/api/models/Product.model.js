const mongoose = require('mongoose');
import _Image from './Image.model';

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true,
    },
    image: {
        type: _Image.schema,
        require: true,
    },
    des: {
        type: String,
        require: true,
    },
    price: {
        type: Number,
        require: true,
    },
    type: {
        type: String,
        enum: ['product', 'service'],
        default: 'product',
    },
    quantity: {
        type: Number,
        require: true,
    },
    status: {
        type: String,
        enum: ['In stock', 'Out of stock'],
        default: 'In stock',
    },
    category: { type: mongoose.Schema.Types.ObjectId, ref: 'ProductCategory' },
});

const _Product = mongoose.model('Product', productSchema);
module.exports = _Product;
