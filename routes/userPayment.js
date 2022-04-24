const express = require("express");
const router = express.Router();

const userPaymentController = require('../controller/userPayment')
const authenticate = require("../middleware/authenticate.js");

router.post('/set-payment/:paymentId', authenticate, userPaymentController.setUserPayment)

module.exports = router;