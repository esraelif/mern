const express = require('express');


const { register, login, logOut, forgotPassword, resetPassword, userDetails } = require('../controllers/user.js');
const { authenticationMid } = require('../middleware/auth.js');
const router = express.Router();


router.post('/register', register);
router.post('/login', login);
router.post('/logout', logOut);
router.post('/forgotPassword', forgotPassword);
router.post('/reset/:token', resetPassword);
router.get('/me', authenticationMid, userDetails);
module.exports = router;