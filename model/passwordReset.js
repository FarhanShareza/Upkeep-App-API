const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const passwordResetSchema = new Schema({
    userId:{
        type: String
    },
    resetString: {
        type: String
    },
    createdAt: {
        type: Date
    },
    expiresAt: {
        type: Date
    }
});

const passwordReset = mongoose.model('passwordReset',passwordResetSchema);
module.exports = passwordReset