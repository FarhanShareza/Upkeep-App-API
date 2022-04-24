const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer')

const moment = require('moment')

const uuid = require('uuid');
require('dotenv').config();

const adminShipmentModel = require("../model/adminShipment.js");

const router = require('../routes/user.js');
const { error } = require('console');

// path for static verified page
const path = require("path")

exports.addShipment = async (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        try {
            const addShipment = await adminShipmentModel.create({
                shipmentId : uuid.v4(),
                nameShipment: req.body.nameShipment,
                description: req.body.description,
                location: req.body.location,
                price: req.body.price,
            });
            return res.status(201).send(addShipment).json({
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

exports.updateShipment = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        const updateShipment = {
            nameShipment: req.body.nameShipment,
            description: req.body.description,
            location: req.body.location,
            price: req.body.price,
        }
        adminShipmentModel.updateOne({shipmentId:req.params.shipmentId}, {$set:updateShipment})
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

exports.infoShipment = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        adminShipmentModel.find({shipmentId : req.params.shipmentId})
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

exports.allInfoShipment = (req, res) => {
    const { userRole } = req.user;  
    if (userRole == userRole){
        adminShipmentModel.find({})
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

exports.deleteShipment = (req, res) => {
    const { userRole } = req.user;
    if (userRole == userRole){
        adminShipmentModel.deleteOne({shipmentId:req.params.shipmentId})
        .then(result => {
            res.json({
                status: true,
                type: "Success",
                msg: "Data berhasil dihapus!",
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