const express = require("express");
const router = express.Router();

const passwordResetController = require('../controller/passwordReset')

router.post('/request-reset-password', passwordResetController.requestPasswordReset)
router.post('/reset-password', passwordResetController.resetPassword)

module.exports = router;