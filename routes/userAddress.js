const express = require("express");
const router = express.Router();

const userAddressController = require('../controller/userAddress')
const authenticate = require("../middleware/authenticate.js");


router.post('/add-user-address', authenticate, userAddressController.addUserAddress)
router.get('/info-address/:addressId', authenticate, userAddressController.infoUserAddress)
router.get('/all-info-address', authenticate, userAddressController.allInfoUserAddress)
router.put('/set-default-address/:addressId', authenticate, userAddressController.setDefaultUserAddress)
router.post('/set-address/:addressId', authenticate, userAddressController.setUserAddress)
router.put('/update-address/:addressId', authenticate, userAddressController.updateUserAddress)
router.delete('/delete-address/:addressId', authenticate, userAddressController.deleteUserAddress)

module.exports = router;