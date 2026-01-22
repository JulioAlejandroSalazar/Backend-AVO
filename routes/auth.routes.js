const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const {verifyToken} = require('../middleware/auth');
const { loginLimiter } = require("../middleware/rateLimit");

router.post('/register', authController.register);
router.post('/login', loginLimiter, authController.login);
router.get('/me', verifyToken, authController.getMe);

module.exports = router;