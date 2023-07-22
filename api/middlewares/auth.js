// middlewares/auth.js

const jwt = require("jsonwebtoken");
const User = require("../models/User");

exports.isAuthenticatedUser = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "You need to be logged in to access this route.",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid token. Please log in again.",
    });
  }
};

exports.authorizedRoles = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(new Error(`${req.user.role} not allowed`, 403));
    }
    next();
  };
};
