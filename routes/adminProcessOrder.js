const express = require("express");
const router = express.Router();

const adminProcessOrderController = require('../controller/adminProcessOrder')
const authenticate = require("../middleware/authenticate.js");

router.get('/info-order/:orderId', authenticate, adminProcessOrderController.infoOrder)
router.get('/all-info-order', authenticate, adminProcessOrderController.allInfoOrder)
router.post('/process-cleaning/:orderId', authenticate, adminProcessOrderController.processOrder)

router.get('/info-order/cleaning/:orderId', authenticate, adminProcessOrderController.infoOrderCleaning)
router.get('/all-info-order/cleaning', authenticate, adminProcessOrderController.allInfoOrderCleaning)
router.post('/finish-cleaning/:orderId', authenticate, adminProcessOrderController.finishOrderCleaning)

module.exports = router;