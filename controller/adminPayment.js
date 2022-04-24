const uuid = require('uuid');
require('dotenv').config();

const adminPaymentModel = require("../model/adminPayment.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.addPayment = async (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        try {
            const addPayment = await adminPaymentModel.create({
                paymentId : uuid.v4(),
                namePayment: req.body.namePayment,
                description: req.body.description,
            });
            return res.status(201).send(addPayment).json({
                status: true,
                type: "Success",
            });
        }
        catch(err) {
            console.log(err);
            res.status(500).json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Periksa kembali!",
            })
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

exports.updatePayment = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        const updatePayment = {
            namePayment: req.body.namePayment,
            description: req.body.description,
        }
        adminPaymentModel.updateOne({paymentId:req.params.paymentId}, {$set:updatePayment})
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

exports.infoPayment = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        adminPaymentModel.find({paymentId : req.params.paymentId})
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

exports.allInfoPayment = (req, res) => {
    const { userRole } = req.user;  
    if (userRole == userRole){
        adminPaymentModel.find({})
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

exports.deletePayment = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        adminPaymentModel.deleteOne({paymentId:req.params.paymentId})
        .then(result => {
            res.json({
                status: true,
                type: "Success",
                msg: "Data berhasil dihapus",
            })
        })
        .catch(err => {
            res.json({
                status: false,
                type: "Invalid",
                msg: "Terjadi Kesalahan. paymentId tidak ditemukan",
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