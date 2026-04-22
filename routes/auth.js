const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');
const { isLogin } = require('../middlewares/auth');
const validate = require('../middlewares/validate')
const { resgisterUserSchema } = require('../validators/user')

router.post('/register',validate(resgisterUserSchema), authController.register);
router.post('/login', authController.login);
router.get('/verify-email', authController.verificationEmail);
router.post('/resend-verification-email', authController.resendVerificationEmail);
// console.log(authController);
router.get('/profile', isLogin, authController.getMe);
 

// router.get('/user/:id', isLogin, authController.getUserById);

module.exports = router;