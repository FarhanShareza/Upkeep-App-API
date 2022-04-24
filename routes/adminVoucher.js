const express = require("express");
const router = express.Router();

const adminVoucherController = require('../controller/adminVoucher')
const authenticate = require("../middleware/authenticate.js");

router.post('/add-voucher', authenticate, adminVoucherController.addVoucher)
router.get('/info-voucher/:voucherId', authenticate, adminVoucherController.infoVoucher)
router.get('/all-info-voucher', authenticate, adminVoucherController.allInfoVoucher)
router.delete('/delete-voucher/:voucherId', authenticate, adminVoucherController.deleteVoucher)

module.exports = router;