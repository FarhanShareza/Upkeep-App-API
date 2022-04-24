const express = require("express");
const router = express.Router();

const courierReturnController = require('../controller/courierReturn')
const authenticate = require("../middleware/authenticate.js");

router.get('/return/info-order/:orderId', authenticate, courierReturnController.infoReturn)
router.get('/return/all-info-order', authenticate, courierReturnController.allInfoReturn)
router.post('/return/process-order/:orderId', authenticate, courierReturnController.processReturn)

module.exports = router;