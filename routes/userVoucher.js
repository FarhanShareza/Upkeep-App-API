const express = require("express");
const router = express.Router();

const userVoucherController = require('../controller/userVoucher')
const authenticate = require("../middleware/authenticate.js");

router.post('/set-voucher/:voucherId', authenticate, userVoucherController.setUserVoucher)

module.exports = router;