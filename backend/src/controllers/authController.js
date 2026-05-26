const User = require("../models/User");

const generateToken = require("../utils/generateToken");


// ==============================
// REGISTER USER
// ==============================
exports.register = async (req, res) => {

  try {

    const {
      name,
      email,
      password
    } = req.body;


    // Check User Exists
    const userExists = await User.findOne({
      email
    });

    if (userExists) {

      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }


    // Create User
    const user = await User.create({
      name,
      email,
      password
    });


    // Response
    res.status(201).json({
      success: true,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email
      },

      token: generateToken(user._id)
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ==============================
// LOGIN USER
// ==============================
exports.login = async (req, res) => {

  try {

    const {
      email,
      password
    } = req.body;


    // Find User
    const user = await User.findOne({
      email
    });

    if (
      !user ||
      !(await user.matchPassword(password))
    ) {

      return res.status(401).json({
        success: false,
        message: "Invalid email or password"
      });
    }


    // Response
    res.status(200).json({
      success: true,

      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePic: user.profilePic
      },

      token: generateToken(user._id)
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};



// ==============================
// GET PROFILE
// ==============================
exports.getProfile = async (req, res) => {

  try {

    const user = await User.findById(
      req.user._id
    ).select("-password");

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};