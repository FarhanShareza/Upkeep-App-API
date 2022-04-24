const uuid = require('uuid');
require('dotenv').config();

const productModel = require("../model/adminProduct.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.addProduct = (req, res) => {
    const { userRole } = req.user;  
    if (userRole == userRole) {
        if(!req.file){
            res.json({
                status: false,
                type: "Invalid",
                msg: "Terjadi kesalahan. Pastikan format sesuai!",
            })
        }
        const product = new productModel ({   
            userId: req.user.userId,
            productId: uuid.v4(),
            image : req.file.path,
            nameProduct: req.body.nameProduct,
            description: req.body.description,
            category: req.body.category,
            service: 1,
            duration: req.body.duration,
            normalPrice: req.body.normalPrice,
            discount: req.body.discount,
            price: req.body.normalPrice - (req.body.normalPrice * req.body.discount/100)
        })
        product.save()
        .then(result => {
            res.status(200).json({
                status: true,
                type: "Success",
                data: product,
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
exports.infoProduct = (req, res) => {
    productModel.find({productId : req.params.productId})
    .then(result => {
        res.status(200).json({
            status: true,
            type: "Success",
            data: result,
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

//by userId
exports.allInfoProduct = (req, res) => {
    productModel.find()
    .then(result => {
        res.status(200).json({
            status: true,
            type: "Success",
            data: result,
        })
    })
    .catch(err => {
        console.log(err)
        res.json({
            status: false,
            type: "Invalid",
            msg: "Terjadi kesalahan. Periksa kembali!",
        })
    })
}

exports.updateProduct = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        const updateProduct = {
            nameProduct: req.body.nameProduct,
            description: req.body.description,
            price: req.body.price,
            discount: req.body.discount,
            status: req.body.status,
        }
        productModel.updateOne({productId:req.params.productId}, {$set:updateProduct})
        .then(result => {
            res.status(200).json({
                status: true,
                type: "Success",
                msg: "Berhasil mengubah data",
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

exports.deleteProduct = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        productModel.deleteOne({productId:req.params.productId})
        .then(result => {
            res.status(200).json({
                status: true,
                type: "Success",
                msg: "Berhasil menghapus data",
                data: result,
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

