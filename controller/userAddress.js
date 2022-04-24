const uuid = require('uuid');
require('dotenv').config();

const userAddressModel = require("../model/userAddress.js");
const Order = require("../model/userOrder.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.addUserAddress = async (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    if (userRole == userRole){
        let address = await userAddressModel.find({ userId });
        let addressOne = await userAddressModel.findOne({ userId });
        try{
            if(addressOne == null){
                const userAddress = await userAddressModel.create({   
                    userId: req.user.userId,
                    addressId: uuid.v4(),
                    status: true,
                    titleAddress: req.body.titleAddress,
                    recipientsName: req.body.recipientsName,
                    phone: req.body.phone,
                    address: req.body.address,
                    city: req.body.city,
                    districts: req.body.districts,
                    codePos: req.body.codePos,
                    coordinate: 0,
                })
                return res.status(201).send(userAddress).json({
                    status: true,
                    type: "Success",
                });
            }
            else if(address.length <= 4){
                const userAddress = await userAddressModel.create({   
                    userId: req.user.userId,
                    addressId: uuid.v4(),
                    status: false,
                    titleAddress: req.body.titleAddress,
                    recipientsName: req.body.recipientsName,
                    phone: req.body.phone,
                    address: req.body.address,
                    city: req.body.city,
                    districts: req.body.districts,
                    codePos: req.body.codePos,
                    coordinate: 0,
                })
                return res.status(201).send(userAddress).json({
                    status: true,
                    type: "Success",
                });
            }
            else{
                res.json({
                    status: false,
                    type: "Invalid",
                    msg: "Uppss. Alamat maksimal hanya 5"
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

exports.setUserAddress = async (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    const cariaddressId= req.params.addressId;
    if (userRole == userRole){
        let order = await Order.findOne({ userId, statusdb:true });
        let address = await userAddressModel.findOne({ userId, addressId:cariaddressId });
        try {
            if(address){
                order.address = address
                order = await order.save();
                res.status(200).json({
                    status: true,
                    type: "Success",
                    msg: "Alamat berhasil digunakan",
                })  
            }
            else{
                res.json({
                    status: false,
                    type: "Invalid",
                    message: "Terjadi kesalahan. Alamat tidak ditemukan"
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

exports.setDefaultUserAddress = async (req, res) => {
    const { userRole } = req.user;
    const { userId } = req.user;
    const cariddressId= req.params.addressId;
    if (userRole == userRole){
        try {
            let address = await userAddressModel.findOne({addressId:cariddressId})
            let countAddress = await userAddressModel.find({userId:userId})
            if(address) {
                for(var i=0; i<=countAddress.length-1; i++){
                    if (countAddress[i].addressId == cariddressId){
                        if (countAddress[i].status == false){
                            countAddress[i].status = true;
                            userAddressModel.updateOne({addressId:countAddress[i].addressId},{$set:{status:true}})
                            .then((result) => {
                                res.json({
                                    status: true,
                                    type: "Success",
                                    msg: "Berhasil menjadikan alamat utama"
                                }) 
                            })
                            .catch((err) => {
                                res.json({
                                    status: false,
                                    type: "Invalid",
                                    msg: "Tidak berhasil menjadikan alamat utama"
                                })    
                            })
                        } else{
                            countAddress[i].status = true;
                            userAddressModel.updateOne({addressId:countAddress[i].addressId},{$set:{status:true}})
                            .then((result) => {
                                res.json({
                                    status: true,
                                    type: "Success",
                                    msg: "Berhasil menjadikan alamat utama"
                                }) 
                            })
                            .catch((err) => {
                                res.json({
                                    status: false,
                                    type: "Invalid",
                                    msg: "Tidak berhasil menjadikan alamat utama"
                                })  
                            })
                        }
                    }else{
                        if (countAddress[i].status == false){
                            countAddress[i].status = false;
                            userAddressModel.updateOne({addressId:countAddress[i].addressId},{$set:{status:false}})
                            .then((result) => {
                                res.json({
                                    status: true,
                                    type: "Success",
                                    msg: "Berhasil menjadikan alamat utama"
                                }) 
                            })
                            .catch((err) => {
                                res.json({
                                    status: false,
                                    type: "Invalid",
                                    msg: "Tidak berhasil menjadikan alamat utama"
                                })    
                            })
                        } else{
                            countAddress[i].status = false;
                            userAddressModel.updateOne({addressId:countAddress[i].addressId},{$set:{status:false}})
                            .then((result) => {
                                res.json({
                                    status: true,
                                    type: "Success",
                                    msg: "Berhasil menjadikan alamat utama"
                                }) 
                            })
                            .catch((err) => {
                                res.json({
                                    status: false,
                                    type: "Invalid",
                                    msg: "Tidak berhasil menjadikan alamat utama"
                                }) 
                            })
                        }
                    }
                }
                res.json({
                    status: false,
                    type: "Invalid",
                    msg: "Tidak dapat menemukan AdressId"
                })
            }
            else{
                res.json({
                    status: false,
                    type: "Invalid",
                    msg: "Tidak dapat menemukan AdressId"
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

//by Address Id
exports.infoUserAddress = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        userAddressModel.find({addressId : req.params.addressId})
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

// by user id
exports.allInfoUserAddress = (req, res) => {
    const { userRole } = req.user;  
    const { userId } = req.user;
    if (userRole == userRole){
        userAddressModel.find({userId : userId})
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
//
exports.updateUserAddress = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        const updateAddress = {
            titleAddress: req.body.titleAddress,
            recipientsName: req.body.recipientsName,
            phone: req.body.phone,
            address: req.body.address,
            city: req.body.city,
            districts: req.body.districts,
            codePos: req.body.codePos,
            coordinate: 0,
        }
        userAddressModel.updateOne({addressId:req.params.addressId}, {$set:updateAddress})
        .then(result => {
            res.json({
                status: true,
                type: "Success",
                msg: "Berhasil memperbaruhi alamat"
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
exports.deleteUserAddress = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        
        userAddressModel.deleteOne({addressId:req.params.addressId})
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