const express = require('express');
const router = express.Router();
const adminController = require("../contorller/adminController")
const admin = require('../middleware/adminAuth')


router.get('/login',admin.isLogin,adminController.login);
router.post('/login',adminController.loggedIn)

router.get('/dashboard',admin.checkSession,adminController.dashboard)


module.exports = router;
