const express = require("express");
const router = express.Router();

const adminInfoUser = require('../controller/adminInfoUser')
const authenticate = require("../middleware/authenticate.js");

router.get('/info-user', authenticate,adminInfoUser.infoUserByAdmin)
router.get('/all-info-user/:userId', authenticate,adminInfoUser.allInfoUserByAdmin)

router.get('/info-address/:addressId', authenticate,adminInfoUser.infoAddressUserByAdmin)
router.get('/all-info-address/:userId', authenticate,adminInfoUser.allInfoAddressUserByAdmin)

module.exports = router;