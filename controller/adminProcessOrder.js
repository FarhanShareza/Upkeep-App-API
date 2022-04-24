require('dotenv').config();

const Order = require("../model/userOrder.js");
const User = require("../model/user.js")
const emailStatusOrder = require("../view/email/statusConfirm.js")

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.infoOrder = (req, res) => {
    const { userRole } = req.user;
    const cariOrderId= req.params.orderId;
    if (userRole == userRole){
        Order.findOne({orderId:cariOrderId, statusOrder: "Pesanan telah dioutlet"})
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

exports.allInfoOrder = async (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        Order.find({statusOrder: "Pesanan telah dioutlet"})
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

exports.processOrder = async (req, res) => {
    const { userRole } = req.user;
    const cariOrderId= req.params.orderId;
    if (userRole == userRole){
        let order =  await Order.findOne({orderId:cariOrderId, statusOrder: "Pesanan telah dioutlet"})
        try {
            order.statusOrder = "Proses cleaning"
            order = await order.save();
            res.status(200).json({
                status: true,
                type: "Success",
                msg: "Pesanan telah diantrian cleaning",
            })
        }
        catch(err) {
            console.log(err);
            res.status(500).json({
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

exports.infoOrderCleaning = (req, res) => {
    const { userRole } = req.user;
    const cariOrderId= req.params.orderId;
    if (userRole == userRole){
        Order.findOne({orderId:cariOrderId, statusOrder: "Proses cleaning"})
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

exports.allInfoOrderCleaning = async (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        Order.find({statusOrder: "Proses cleaning"})
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

exports.finishOrderCleaning = async (req, res) => {
    const { userRole } = req.user;
    const cariOrderId= req.params.orderId;
    if (userRole == userRole){
        let order =  await Order.findOne({orderId:cariOrderId, statusOrder: "Proses cleaning"})
        let user = await User.findOne({userId: order.userId})
        try {
            if(order.shipment[0].nameShipment == "Internal Outlet Shipment"){
                order.statusOrder = "Proses pengembalian"
                order = await order.save();
                emailStatusOrder(order, user, res);
                res.status(200).json({
                    status: true,
                    type: "Success",
                    msg: "Pesanan telah dikirim ke kurir",
                })
            }
            else if(order.shipment[0].nameShipment == "Shipment to Outlet"){
                order.statusOrder = "Pesanan selesai"
                order.active = false
                order = await order.save();
                res.status(200).json({
                    status: true,
                    type: "Success",
                    msg: "Pesanan telah selesai",
                })
            }
        }
        catch(err) {
            console.log(err);
            res.status(500).json({
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