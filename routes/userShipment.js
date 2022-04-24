const express = require("express");
const router = express.Router();

const userShipmentController = require('../controller/userShipment')
const authenticate = require("../middleware/authenticate.js");

router.post('/set-shipment/:shipmentId', authenticate, userShipmentController.setUserShipment)

module.exports = router;