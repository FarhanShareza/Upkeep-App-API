const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const userSchema = new Schema({
    userRole: {
        type: Number,
        default : 1
    },
    userId: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    phone: {
        type: Number,
        required:true
    },
    gender: {
        type: String,
    },
    dateOfBirth: {
        type: Date,
    },
    created: {
        type: Date,
    },
    password:{
        type: String,
        required:true
    },
    verified:{
        type: Boolean
    }
    
});

const user = mongoose.model('user',userSchema);
module.exports = user