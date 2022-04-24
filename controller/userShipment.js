const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const moment = require('moment')

const uuid = require('uuid');
require('dotenv').config();

const adminShipmentModel = require("../model/adminShipment.js");
const Order = require("../model/userOrder.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.setUserShipment = async (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    const cariShipmentId= req.params.shipmentId;
    if (userRole == userRole){
        let order = await Order.findOne({ userId, statusdb:true });
        let shipment = await adminShipmentModel.findOne({ shipmentId:cariShipmentId });
        try {
            if(shipment){
                order.shipment = shipment
                order.total = order.subTotal + shipment.price
                order = await order.save();
                res.status(200).json({
                    status: true,
                    type: "Success",
                    msg: "Pengiriman berhasil digunakan",
                })  
            }
            else{
                res.json({
                    status: false,
                    type: "Invalid",
                    msg: "Terjadi kesalahan. Pengiriman tidak ditemukan"
                })
            }
        }
        catch(err) {
            console.log(err);
            res.status(500).json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Periksa kembali!"
            });
        }
    }
    else{
        res.json({
            status: false,
            type: "Invalid",
            msg: "Role not appropriate!"
        })
    }
}
