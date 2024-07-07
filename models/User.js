const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      match: /.+\@.+\..+/,
      lowercase: true,
      unique: [true, "Email already exists!"],
    },
    password: {
      type: String,
      required: true,
    },
    position: {
      type: String,
      default: "",
    },
    role: {
      type: String,
      ref: "Role",
    },
    status: {
      type: Boolean,
      default: true,
    },
    token: {
      type: String,
      default: "",
    },
    last_login_time: {
      type: Date,
      default: "",
    },
    last_logout_time: {
      type: Date,
      default: "",
    },
    ip_address: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("User", userSchema);
