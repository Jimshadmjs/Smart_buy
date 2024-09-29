const express = require('express');
const router = express.Router();
const adminController = require("../contorller/adminController")
const admin = require('../middleware/adminAuth')


router.get('/login',admin.isLogin,adminController.login);
router.post('/login',adminController.loggedIn)

router.get('/dashboard',admin.checkSession,adminController.dashboard)

router.get('/users',admin.checkSession,adminController.users)
router.patch('/users/:id',adminController.isBlock)


module.exports = router;
