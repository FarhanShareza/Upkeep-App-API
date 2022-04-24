const express = require("express");
const router = express.Router();

const courierPickupController = require('../controller/courierPickup')
const authenticate = require("../middleware/authenticate.js");

router.get('/pick-up/info-order/:orderId', authenticate, courierPickupController.infoPickup)
router.get('/pick-up/all-info-order', authenticate, courierPickupController.allInfoPickup)
router.post('/pick-up/reject-order/:orderId', authenticate, courierPickupController.rejectOrder)
router.post('/pick-up/process-order/:orderId', authenticate, courierPickupController.processOrder)

module.exports = router;