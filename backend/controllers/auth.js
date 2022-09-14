const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');

const { sendVerificationEmail } = require('../helpers/mailer');
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

  const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
  sendVerificationEmail(user.email, user.first_name, url);
  const token = generateToken({ id: user._id.toString() }, '7d');

  res.send({
    id: user._id,
    username: user.username,
    picture: user.picture,
    first_name: user.first_name,
    last_name: user.last_name,
    token,
    verified: user.verified,
    message: 'Register success! please activate your email to start',
  });
});

exports.activateAccount = async (req, res) => {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.TOKEN_SECRET);
  const check = await User.findById(user.id);
  if (check.verified === true)
    return res
      .status(400)
      .json({ message: 'This account is already acctivated' });

  await User.findByIdAndUpdate(user.id, { verified: true });
  res.status(200).json({ message: 'Account has been activated successfully' });
};
