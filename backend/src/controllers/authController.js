const User = require("../models/User");

const generateToken = require("../utils/generateToken");


// ==============================
// REGISTER USER
// ==============================
exports.register = async (req, res) => {

  try {

    console.log("STEP 1");

    const {
      name,
      email,
      password
    } = req.body;

    console.log("STEP 2");


    // Check User Exists
    const userExists = await User.findOne({
      email
    });

    console.log("STEP 3");

    if (userExists) {

      return res.status(400).json({
        success: false,
        message: "User already exists"
      });
    }

    console.log("STEP 4");


    // Create User
    const user = await User.create({
      name,
      email,
      password
    });

    console.log("STEP 5");


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

    console.log("STEP 6");

  } catch (error) {

    console.log("REGISTER ERROR:");
    console.log(error);

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

    console.log("LOGIN ERROR:");
    console.log(error);

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

    console.log(
      "GET PROFILE USER:",
      req.user
    );

    if (!req.user) {

      return res.status(401).json({
        success: false,
        message: "User not found in token"
      });
    }

    const user = await User.findById(
      req.user._id
    ).select("-password");

    console.log(
      "FOUND USER:",
      user
    );

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {

    console.log("PROFILE ERROR:");
    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
// ==============================
// UPDATE PROFILE & COVER PHOTO
// ==============================
exports.updateProfile = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user._id
      );

    if (!user) {

      return res.status(404).json({
        success: false,
        message: "User not found"
      });
    }

    // PROFILE PIC
    if (
      req.files &&
      req.files.profilePic
    ) {

      user.profilePic =
        req.files.profilePic[0].path;
    }

    // COVER PIC
    if (
      req.files &&
      req.files.coverPic
    ) {

      user.coverPic =
        req.files.coverPic[0].path;
    }

    // BIO
    if (req.body.bio) {

      user.bio =
        req.body.bio;
    }

    await user.save();

    res.status(200).json({
      success: true,
      user
    });

  } catch (error) {

    console.log(
      "UPDATE PROFILE ERROR:"
    );

    console.log(error);

    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};