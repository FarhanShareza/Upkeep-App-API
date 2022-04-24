const uuid = require('uuid');
require('dotenv').config();

const Voucher = require("../model/adminVoucher.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

//voucher
exports.addVoucher = async (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        try {
            const addVoucher = await Voucher.create({
                voucherId : uuid.v4(),
                nameVoucher: req.body.nameVoucher,
                description: req.body.description,
                code: req.body.code,
            });
            return res.status(201).send(addVoucher).json({
                status: true,
                type: "Success",
            });
        }
        catch(err) {
            console.log(err);
            res.status(400).json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Periksa kembali!",
            });
        }
    }
    else{
        res.json({
            status: false,
            type: "Invalid",
            msg: "Role not appropriate!",
        })
    }
}

exports.infoVoucher = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        Voucher.find({voucherId: req.params.voucherId})
        .then(result => {
            res.status(200).json({
                status: true,
                type: "Success",
                data: result
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
exports.allInfoVoucher = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        Voucher.find({})
        .then(result => {
            res.status(200).json({
                status: true,
                type: "Success",
                data: result
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
exports.deleteVoucher = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        Voucher.deleteOne({voucherId:req.params.voucherId})
        .then(result => {
            res.json({
                status: true,
                type: "Success",
                msg: 'Data berhasil dihapus!',
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