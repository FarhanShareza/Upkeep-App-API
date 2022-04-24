const express = require("express");
const router = express.Router();

const adminPaymentController = require('../controller/adminPayment')
const authenticate = require("../middleware/authenticate.js");

router.post('/add-payment', authenticate, adminPaymentController.addPayment)
router.get('/info-payment/:paymentId', authenticate, adminPaymentController.infoPayment)
router.get('/all-info-payment', authenticate, adminPaymentController.allInfoPayment)
router.put('/update-payment/:paymentId', authenticate, adminPaymentController.updatePayment)
router.delete('/delete-payment/:paymentId', authenticate, adminPaymentController.deletePayment)

module.exports = router;