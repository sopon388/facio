const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    },

    profilePic: {
      type: String,
      default: "https://i.ibb.co/4pDNDk1/avatar.png",
    },

    // NEW FEATURE
    coverPic: {
      type: String,
      default:
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=1200",
    },

    bio: {
      type: String,
      default: "",
    },

    friends: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: true,
  }
);

// ==============================
// HASH PASSWORD BEFORE SAVE
// ==============================
userSchema.pre("save", async function () {
  if (!this.isModified("password")) {
    return;
  }

  this.password = await bcrypt.hash(
    this.password,
    10
  );
});

// ==============================
// MATCH PASSWORD
// ==============================
userSchema.methods.matchPassword =
  async function (enteredPassword) {
    return await bcrypt.compare(
      enteredPassword,
      this.password
    );
  };

module.exports = mongoose.model(
  "User",
  userSchema
);