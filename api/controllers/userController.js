const User = require("../models/User");
const { sendTokens } = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");

exports.registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const user = await User.create({
      name,
      email,
      password,
      image: {
        public_id: "this is a smaple id",
        url: "profilePic",
      },
    });

    sendTokens(user, 201, res);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Failed to register user. Please try again later.",
    });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  // check if user has password and email;
  if (!email || !password) {
    return new Error("please Enter Email and Password", 400);
  }
  try {
    const user = await User.findOne({
      email,
    }).select("+password");

    if (!user) {
      return new Error("Invalid Email or Password", 401);
    }
    const isPassword = user.comparePassword(password);

    if (!isPassword) {
      return new Error("Invaild Email or Password", 401);
    }

    sendTokens(user, 200, res);
  } catch (err) {
    console.log(err);
    res.status(500).json("Invalid");
  }
};

// Logout user
exports.logOut = async (req, res) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });
  res.status(200).json({
    success: true,
    message: "logged out",
  });
};

// forget Password
exports.forgetPassword = async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  try {
    if (!user) {
      return next(new Error("User not found", 404));
    }
    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });
    //send mail with token to the users registered email id
    const resetPasswordUrl = `${req.protocol}://${req.get(
      "host"
    )}/api/v1/reset/${resetToken}`;
    const message = `Your password reset token is :\n\n ${resetPasswordUrl} \n\n you have not requested this email then, please ignore it`;
    try {
      await sendEmail({
        email: req.body.email,
        subject: "password Reset Link for your account on E-commerce app.",
        message,
      });
      res.status(200).json({
        success: true,
        message: `Email sent to ${user.email} successfully`,
      });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;

      await user.save({ validateBeforeSave: false });

      return next(new Error(error, message, 500));
    }
  } catch (err) {
    console.log(err);
  }
};

exports.getUserDetails = async (req, res) => {
  const user = await User.findById(req.user.id);
  res.status(200).json({
    success: true,
    user,
  });
};

exports.updateProfile = async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
};

// admin
exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.status(200).json({
    success: true,
    users,
  });
};

exports.getSingleUsers = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Error(`User not found with id ${req.params.id}`));
  }
  res.status(200).json({
    success: true,
    user,
  });
};

exports.updateUserRole = async (req, res) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    userFindAndModify: false,
  });
  res.status(200).json({
    success: true,
  });
};

// admin
exports.deleteUser = async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new Error(`User not found with id ${req.params.id}`));
  }
  await user.remove();
  res.status(200).json({
    success: true,
    message: "User delete succesfully",
  });
};
