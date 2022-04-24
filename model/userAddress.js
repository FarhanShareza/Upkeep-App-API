const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userAddressSchema = new Schema({
    userId: {
        type: String,
        required:true
    },
    addressId: {
        type: String,
        required:true
    },
    status: {
        type: Boolean,
        required:true
    },
    titleAddress: {
        type: String,
        required:true
    },
    recipientsName: {
        type: String,
        required:true
    },
    address: {
        type: String,
        required:true
    },
    city: {
        type: String,
        required:true
    },
    districts: {
        type: String,
        required:true
    },
    codePos: {
        type: Number,
        required:true
    },
    phone: {
        type: String,
        required:true
    },
    coordinate: {
        type: String
    }
});

const userAddress = mongoose.model('userAddress',userAddressSchema);
module.exports = userAddress