const uuid = require('uuid');

require('dotenv').config();

const userModel = require("../model/user.js");
const productModel = require("../model/adminProduct.js");
const emailStatusOrder = require("../view/email/statusConfirm.js")

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

const Order = require("../model/userOrder.js");
const Cart = require("../model/userCart.js");
const Address = require("../model/userAddress.js");
const { getMaxListeners } = require('process');

exports.toCheckout = async (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    if (userRole == userRole){
        try{
            let cart = await Cart.findOne({ userId });
            let order = await Order.findOne({ userId, statusdb:true });
            let address = await Address.findOne({ userId, status:true });
            
            if(cart.products[0]){
                if(order){
                    if (order.statusdb == true){
                        order.products = [];
                        order.products = cart.products
                        order.subTotal = cart.subTotal 
                        order = await order.save();
                    }
                    else if (order.statusdb == false){
                        const newOrder = await Order.create({
                            userId,
                            orderId : uuid.v4(),
                            products: cart.products,
                            subTotal: cart.subTotal,
                            address: address
                        })
                        return res.status(201).send(newOrder).json({
                            status: true,
                            type: "Success",
                        });
                    }
                    return res.status(201).send(order).json({
                        status: true,
                        type: "Success"
                    });
                }
                else{
                    const newOrder = await Order.create({
                        userId,
                        orderId : uuid.v4(),
                        products: cart.products,
                        subTotal: cart.subTotal,
                        address: address
                    });
                    return res.status(201).send(newOrder).json({
                        status: true,
                        type: "Success"
                    });
                }
            }
            else{
                res.status(400).json({
                    status: false,
                    type: "Invalid",
                    msg: "Pilih produk terlebih dahulu",
                })
            }
        }
        catch (err) {
            console.log(err)
            res.status(400).json({
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
// Get info order
exports.infoCheckout = async (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    if (userRole == userRole){
        try{
            let order = await Order.findOne({ userId });
            res.status(200).json({
                status: true,
                type: "Success",
                data: order
            })
        }
        catch (err) {
            console.log(err)
            res.status(400).json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Periksa kembali!",
                err: err
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
//final post order
exports.checkout = async (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    const user = req.user;
    if (userRole == userRole){
        let order = await Order.findOne({ userId: userId, statusdb: true });

        let date_ob = new Date();
        let date = ("0" + date_ob.getDate()).slice(-2);
        let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);
        let year = date_ob.getFullYear();
        let hours = date_ob.getHours();
        let minutes = date_ob.getMinutes();

        const uniqNumber = (min = 1000, max = 9999) => {
            min = Math.ceil(min);
            max = Math.floor(max);
            const num =  Math.floor(Math.random() * (max - min + 1)) + min;
            return num;
        };

        try{
            if (order.address[0]){
                if (order.shipment[0]){
                    if (order.payment[0]){
                        order.statusOrder = "Menunggu konfirmasi"        
                        order.statusdb = false
                        order.noInvoice = "INV/"+ year + month + date + "/SRC/"+ hours + minutes + "/" + uniqNumber()
                        order = await order.save();

                        let cart = await Cart.findOne({ userId });
                        cart.products = [];
                        cart.subTotal = 0
                        cart.save();
                        
                        emailStatusOrder(order, user, res);
                        res.status(200).json({
                            status: true,
                            type: "Success",
                            msg: "Orderan berhasil dibuat",
                        })
                    }
                    else{
                        res.status(400).json({
                            status: false,
                            type: "Invalid",
                            msg: "Pilih pembayaran",
                        })
                    }
                }
                else{
                    res.status(400).json({
                        status: false,
                        type: "Invalid",
                        msg: "Pilih pengiriman",
                    })
                }
            }
            else{
                res.status(400).json({
                    status: false,
                    type: "Invalid",
                    msg: "Pilih alamat pengiriman",
                })
            }
        }
        catch (err) {
            console.log(err)
            res.status(400).json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Periksa kembali!",
                err: err
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

exports.removeCheckout = async (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    if (userRole == userRole){
        try{
            let order = await Order.deleteOne({ userId, statusdb: true });
            console.log("AAA",order)
            res.status(200).json({
                status: false,
                type: "Success",
                msg: "Berhasil dihapus",
            })
        }
        catch (err) {
            console.log(err)
            res.status(400).json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Periksa kembali!",
                err: err
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