const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const adminProductSchema = new Schema({
    userId: {
        type: String,
        required:true
    },
    productId: {
        type: String,
        required:true
    },
    image:{
        type: String,
        required: true,
    },
    nameProduct: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    category: {
        type: Number,
        required:true
    },
    service: {
        type: Number,
        required:true
    },
    duration: {
        type: Number,
        required:true
    },
    normalPrice: {
        type: Number,
        required:true
    },
    discount: {
        type: Number,
        required:true
    },
    price: {
        type: Number,
        required:true
    },
    active: {
        type: Boolean,
        default: true
    },
});

const adminProduct = mongoose.model('adminProduct',adminProductSchema);
module.exports = adminProduct