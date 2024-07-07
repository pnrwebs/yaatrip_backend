const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const rolesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
    },
    permissions: {
      type: Object,
      required: false,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: { createdAt: "created_at", updatedAt: "updated_at" },
  }
);

module.exports = mongoose.model("Roles", rolesSchema);
