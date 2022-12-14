const asyncHandler = require('express-async-handler');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const { sendVerificationEmail, sendResetCode } = require('../helpers/mailer');
const { generateToken } = require('../helpers/tokens');
const {
  validateEmail,
  validateLength,
  validateUsername,
} = require('../helpers/validation');
const User = require('../models/User');
const Code = require('../models/Code');
const generateCode = require('../helpers/generateCode');

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

// @desc Activate account
// @route POST /activate
// @access Private
exports.activateAccount = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const user = jwt.verify(token, process.env.TOKEN_SECRET);

  if (req.user.id !== user.id)
    return res.status(400).json({
      message: "You don't have the authorization to complete this operation",
    });

  const check = await User.findById(user.id);
  if (check.verified === true)
    return res
      .status(400)
      .json({ message: 'This account is already activated' });

  await User.findByIdAndUpdate(user.id, { verified: true });
  res.status(200).json({ message: 'Account has been activated successfully' });
});

// @desc Login User
// @route POST /login
// @access Public
exports.login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    return res.status(400).json({
      message: 'The email address you entered is not connected to an account',
    });

  const matchPassword = await bcrypt.compare(password, user.password);
  if (!matchPassword)
    return res
      .status(400)
      .json({ message: 'Invalid credentials. please try again.' });

  const token = generateToken({ id: user._id.toString() }, '7d');

  res.send({
    id: user._id,
    username: user.username,
    picture: user.picture,
    first_name: user.first_name,
    last_name: user.last_name,
    token,
    verified: user.verified,
  });
});

// @desc Resend Verification code
// @route POST /sendVerification
// @access Private
exports.sendVerification = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const user = await User.findById(userId);

  if (user.verified === true)
    return res
      .status(400)
      .json({ message: 'This account is already activated' });

  const emailVerificationToken = generateToken(
    { id: user._id.toString() },
    '30d'
  );

  const url = `${process.env.BASE_URL}/activate/${emailVerificationToken}`;
  sendVerificationEmail(user.email, user.first_name, url);

  res
    .status(200)
    .json({ message: 'Email verification link has been sent to your email' });
});

// @desc Find User
// @route POST /findUser
// @access Public
exports.findUser = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select('-password');
  if (!user) return res.status(400).json({ message: 'Account does not exist' });

  res.status(200).json({ email: user.email, picture: user.picture });
});

// @desc Send reset password code
// @route POST /sendResetPasswordCode
// @access Public
exports.sendResetPasswordCode = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const user = await User.findOne({ email }).select('-password');
  await Code.findByIdAndRemove({ user: user._id });

  const code = generateCode(5);

  const savedCode = await new Code({
    code,
    user: user._id,
  });
  sendResetCode(user.email, user.first_name, code);

  res.status(200).json({
    message: 'Email reset code has been sent to your email address',
  });
});
