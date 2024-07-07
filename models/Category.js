const mongoose = require("mongoose");

const categoriesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    descriptions: {
      type: String,
      required: true,
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

module.exports = mongoose.model("Category", categoriesSchema);
