const express = require("express");
const router = express.Router();

const userInfoController = require('../controller/userInfo')
const authenticate = require("../middleware/authenticate.js");

router.get('/info', authenticate, userInfoController.infoUser)
router.put('/update-info-user', authenticate, userInfoController.updateInfoUser)

module.exports = router;