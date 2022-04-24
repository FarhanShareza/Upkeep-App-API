require('dotenv').config();

const adminPaymentModel = require("../model/adminPayment.js");
const Order = require("../model/userOrder.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.setUserPayment = async (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    const cariPaymentId= req.params.paymentId;
    if (userRole == userRole){
        let order = await Order.findOne({ userId, statusdb:true });
        let payment = await adminPaymentModel.findOne({ paymentId:cariPaymentId });
        try {
            if(payment){
                order.payment = payment
                order = await order.save();
                res.status(200).json({
                    status: true,
                    type: "Success",
                    msg: "Pembayaran berhasil digunakan"
                })  
            }
            else{
                res.json({
                    status: false,
                    type: "Invalid",
                    msg: "Terjadi kesalahan. Pembayaran tidak ditemukan"
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
