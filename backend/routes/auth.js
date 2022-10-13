const express = require('express');
const {
  register,
  activateAccount,
  login,
  sendVerification,
} = require('../controllers/auth');
const { authUser } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/activate', authUser, activateAccount);
router.post('/sendVerification', authUser, sendVerification);

module.exports = router;
