const userModel = require("../model/user.js");
const userAddressModel = require("../model/userAddress.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.infoUserByAdmin = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        userModel.find({}, {__v:0, password:0,})
        .then(result => {
            res.json({
                status: true,
                type: "Success",
                data:result,
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
exports.allInfoUserByAdmin = (req, res) => {
    const { userRole } = req.user;
    const cariUserId = req.params.userId;
    if (userRole == userRole){
        userModel.find({userId : cariUserId}, {__v:0, password:0,})
        .then(result => {
            res.json({
                status: true,
                type: "Success",
                data:result,
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
exports.infoAddressUserByAdmin = (req, res) => {
    const { userRole } = req.user;
    const cariAddressId = req.params.addressId;
    if (userRole == userRole){
        userAddressModel.find({addressId : cariAddressId}, {})
        .then(result => {
            res.json({
                status: true,
                type: "Success",
                data:result,
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
exports.allInfoAddressUserByAdmin = (req, res) => {
    const { userRole } = req.user;
    const cariUserId = req.params.userId;
    if (userRole == userRole){
        userAddressModel.find({userId : cariUserId}, {})
        .then(result => {
            res.json({
                status: true,
                type: "Success",
                data:result,
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