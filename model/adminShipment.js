const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const shipmentSchema = new Schema({
    shipmentId: {
        type: String,
        required:true
    },
    nameShipment: {
        type: String,
        required:true
    },
    description: {
        type: String,
        required:true
    },
    location: {
        type: String,
        required:true
    },
    price: {
        type: Number,
    }
});

const adminShipment = mongoose.model('adminShipment',shipmentSchema);
module.exports = adminShipment