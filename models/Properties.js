const mongoose = require("mongoose");
const propertiesSchema = new mongoose.Schema(
  {
    property_name: {
      type: String,
      required: true,
    },
    property_type: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    amenities: {
      type: Object,
      required: true,
    },
    timings: {
      checkin_time: {
        type: String,
        required: true,
      },
      checkout_time: {
        type: String,
        required: true,
      },
    },
    ratings: {
      type: String,
      required: false,
    },
    email: {
      type: String,
      required: true,
    },
    contact_no: {
      type: Object,
      required: true,
    },
    address: {
      complete_address: {
        type: String,
        required: true,
      },
      location: {
        type: String,
        required: false,
      },
      city: {
        type: String,
        required: false,
      },
      state: {
        type: String,
        required: false,
      },
      country: {
        type: String,
        required: false,
      },
      nearby_location: {
        type: String,
        required: false,
      },
      google_map: {
        type: String,
        required: false,
      },
      longitude: {
        type: String,
        required: false,
      },
      latitude: {
        type: String,
        required: false,
      },
    },
    hotel_language: {
      type: Object,
      required: false,
    },
    booking_options: {
      type: Object,
      required: false,
    },
    hotel_rules: {
      type: Object,
      required: false,
    },
    property_owner_details: {
      fullname: {
        type: String,
        required: false,
      },
      contact_no: {
        type: String,
        required: false,
      },
      email: {
        type: String,
        required: false,
      },
    },
    cover_image: {
      type: Object,
      required: true,
    },
    other_images: {
      type: Object,
      required: false,
    },
    added_date: {
      type: String,
      required: false,
    },
    admin_status: {
      type: Boolean,
      default: true,
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

module.exports = mongoose.model("Properties", propertiesSchema);
