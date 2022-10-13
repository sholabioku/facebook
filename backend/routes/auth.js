const express = require('express');
const { register, activateAccount, login } = require('../controllers/auth');
const { authUser } = require('../middlewares/auth');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/activate', authUser, activateAccount);

module.exports = router;
