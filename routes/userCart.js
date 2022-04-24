const express = require("express");
const router = express.Router();

const cartController = require('../controller/userCart.js')
const authenticate = require("../middleware/authenticate.js");

router.post('/to-cart/:productId', authenticate,cartController.addItemToCart)
router.get('/info-cart', authenticate,cartController.getCart)
router.put('/update-quantity/:productId', authenticate,cartController.updateQuantity)
router.delete('/delete-product/:_id', authenticate,cartController.deleteProductid)
router.delete('/empty-cart', authenticate,cartController.emptyCart)

module.exports = router;