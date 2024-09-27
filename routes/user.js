const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
const crypto = require('crypto');
const user = require('../middleware/userAuth')
const userController = require("../contorller/userController")


router.get('/',userController.home)
router.get('/register',userController.register)
router.post('/register',userController.registered)

router.get('/verifyOTP',userController.otp)
router.get('/reSend',userController.reSend)
router.post('/verifyOTP',userController.registerUser)

router.get('/login',user.isLogin,userController.loadLogin);
router.post('/login',userController.login)

module.exports = router;
