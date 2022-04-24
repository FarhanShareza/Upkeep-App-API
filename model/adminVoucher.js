const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const voucherSchema = new Schema({
    voucherId: {
        type: String,
        required:true
    },
    nameVoucher: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    code: {
        type: String,
        required:true
    }
});

const adminVoucher = mongoose.model('adminVoucher',voucherSchema);
module.exports = adminVoucher