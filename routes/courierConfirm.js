const express = require("express");
const router = express.Router();

const courierConfirmController = require('../controller/courierConfirm')
const authenticate = require("../middleware/authenticate.js");

router.get('/confirm/info-order/:orderId', authenticate, courierConfirmController.infoOrder)
router.get('/confirm/all-info-order', authenticate, courierConfirmController.allInfoOrder)
router.post('/confirm/reject-order/:orderId', authenticate, courierConfirmController.rejectOrder)
router.post('/confirm/accept-order/:orderId', authenticate, courierConfirmController.acceptOrder)

module.exports = router;