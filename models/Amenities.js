const mongoose = require("mongoose");

const amenitiesSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    icon_image: {
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

module.exports = mongoose.model("Amenities", amenitiesSchema);
