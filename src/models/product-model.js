const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Product = mongoose.model('Product', new Schema(
    {
        productName: { type: String, required: true },
        productSKU: { type: String, required: true },
        productCategory: { type: String, required: true },
        region: { type: String, required: true },
        rating: { type: Number, required: true },
        price: { type: Number, required: true },
    }
));

module.exports = Product;