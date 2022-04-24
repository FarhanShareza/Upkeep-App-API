require('dotenv').config();

const adminPaymentModel = require("../model/adminPayment.js");
const Order = require("../model/userOrder.js");
const User = require("../model/user.js")
const emailStatusOrder = require("../view/email/statusConfirm.js")

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.infoReturn = (req, res) => {
    const { userRole } = req.user;
    const cariOrderId= req.params.orderId;
    if (userRole == userRole){
        Order.findOne({orderId:cariOrderId, statusOrder: "Proses pengembalian"})
        .then(result => {
            res.status(200).json({
                status: true,
                type: "Success",
                msg: "Data berhasil ditemukan!",
                data: result
            })
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Periksa kembali!",
                err: err
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

exports.allInfoReturn = async (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        Order.find({statusOrder: "Proses pengembalian"})
        .then(result => {
            res.status(200).json({
                status: true,
                type: "Success",
                data: result
            })
        })
        .catch(err => {
            res.status(400).json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Periksa kembali!",
                err: err
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

exports.processReturn = async (req, res) => {
    const { userRole } = req.user;
    const cariOrderId= req.params.orderId;
    if (userRole == userRole){
        let order =  await Order.findOne({orderId:cariOrderId, statusOrder: "Proses pengembalian"})
        let user = await User.findOne({userId: order.userId})
        try {
            order.active = false
            order.statusOrder = "Pesanan selesai"
            order = await order.save();
            emailStatusOrder(order, user, res);
            res.status(200).json({
                status: true,
                type: "Success",
                msg: "Pesanan telah diselesaikan",
            })
        }
        catch(err) {
            console.log(err);
            res.status(400).send({
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