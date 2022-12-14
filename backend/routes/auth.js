const express = require('express');
const {
  register,
  activateAccount,
  login,
  sendVerification,
  findUser,
  sendResetPasswordCode,
} = require('../controllers/auth');
const { authUser } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/activate', authUser, activateAccount);
router.post('/sendVerification', authUser, sendVerification);
router.post('/findUser', findUser);
router.post('/sendResetPasswordCode', sendResetPasswordCode);

module.exports = router;
