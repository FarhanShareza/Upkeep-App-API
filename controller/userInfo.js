require('dotenv').config();

const userModel = require("../model/user.js");
const userAddressModel = require("../model/userAddress.js");
const userVerification = require('../model/userVerification.js');


const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.infoUser = (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    if (userRole == 1){
        userModel.find({userId : userId}, {userRole:0, _id:0, __v:0, password:0,})
        .then(result => {
            res.json({
                status: true,
                type: "Success",
                data :result,
            })
        })
        .catch(err => {
            res.json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Periksa kembali!",
            })
        })  
    }
    else{
        res.json({
            status: false,
            type: "Invalid",
            msg: "Role not appropriate!",
        })
    }
}

exports.updateInfoUser = (req, res) => {
    const { userRole } = req.user;  
    if (userRole == userRole){
        userModel.updateOne({$set:{gender:req.body.gender, dateOfBirth: req.body.dateOfBirth}})
        .then(result => {
            res.json({
                status: true,
                type: "Success",
                msg: "Data berhasil ditambahkan"
            })
        })
        .catch(error => {
            res.json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Periksa kembali!",
            })
        })
    }
    else{
        res.json({
            status: false,
            type: "Invalid",
            msg: "Role not appropriate!",
        })
    }
}

