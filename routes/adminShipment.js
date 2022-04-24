const express = require("express");
const router = express.Router();

const adminShipmentController = require('../controller/adminShipment')
const authenticate = require("../middleware/authenticate.js");

router.post('/add-shipment', authenticate, adminShipmentController.addShipment)
router.get('/info-shipment/:shipmentId', authenticate, adminShipmentController.infoShipment)
router.get('/all-info-shipment', authenticate, adminShipmentController.allInfoShipment)
router.put('/update-shipment/:shipmentId', authenticate, adminShipmentController.updateShipment)
router.delete('/delete-shipment/:shipmentId', authenticate, adminShipmentController.deleteShipment)

module.exports = router;