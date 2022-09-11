const asyncHandler = require('express-async-handler');
const { validateEmail } = require('../helpers/validation');
const User = require('../models/User');

// @desc Register User
// @route POST /register
// @access Public
exports.register = asyncHandler(async (req, res) => {
  const {
    first_name,
    last_name,
    username,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  } = req.body;

  if (!validateEmail(email))
    return res.status(400).json({ message: 'Invalid email address' });

  const check = await User.findOne({ email });
  if (check)
    return res
      .status(400)
      .json({
        message:
          'This email address already exists, try with a different email address',
      });

  const user = await new User({
    first_name,
    last_name,
    username,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  }).save();

  res.status(201).json(user);
});
