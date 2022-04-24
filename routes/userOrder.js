const express = require("express");
const router = express.Router();

const orderController = require('../controller/userOrder.js')
const authenticate = require("../middleware/authenticate.js");

//Start
router.post('/to-checkout', authenticate,orderController.toCheckout)

//Final checkout
router.get('/info-checkout', authenticate,orderController.infoCheckout)
router.post('/checkout', authenticate,orderController.checkout)
router.delete('/remove-checkout', authenticate,orderController.removeCheckout)

module.exports = router;