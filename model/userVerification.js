const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userVerificationSchema = new Schema({
    userId:{
        type: String
    },
    uniqueString: {
        type: String
    },
    createdAt: {
        type: Date
    },
    expiresIn: {
        type: Date
    }
});

const userVerification = mongoose.model('userVerification',userVerificationSchema);
module.exports = userVerification