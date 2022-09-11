const asyncHandler = require('express-async-handler');
const { generateToken } = require('../helpers/tokens');
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validation');
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

  if (!validateLength(first_name, 3, 30))
    return res
      .status(400)
      .json({ message: 'Firstname must be between 3 and 30 characters' });

  if (!validateLength(last_name, 3, 30))
    return res
      .status(400)
      .json({ message: 'Lastname must be between 3 and 30 characters' });

  if (!validateLength(password, 6, 40))
    return res
      .status(400)
      .json({ message: 'Password must be between 6 and 40 characters' });

  const check = await User.findOne({ email });
  if (check)
    return res.status(400).json({
      message:
        'This email address already exists, try with a different email address',
    });

  let tempUsername = first_name + last_name;
  let newUsername = await validateUsername(tempUsername);

  const user = await new User({
    first_name,
    last_name,
    username: newUsername,
    email,
    password,
    bYear,
    bMonth,
    bDay,
    gender,
  }).save();

  const emailVerificationToken = generateToken(
    { id: user._id.toString() },
    '30d'
  );

  console.log(emailVerificationToken);

  res.status(201).json(user);
});
