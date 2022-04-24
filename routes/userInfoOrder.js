const express = require("express");
const router = express.Router();

const userInfoOrderController = require('../controller/userInfoOrder')
const authenticate = require("../middleware/authenticate.js");

router.get('/info-order/:orderId', authenticate, userInfoOrderController.infoOrder)
router.get('/all-info-order', authenticate, userInfoOrderController.allInfoOrder)

module.exports = router;