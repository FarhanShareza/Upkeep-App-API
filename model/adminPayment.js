const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const paymentSchema = new Schema({
    paymentId: {
        type: String,
        required:true
    },
    namePayment: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    }
});

const adminPayment = mongoose.model('adminPayment',paymentSchema);
module.exports = adminPayment