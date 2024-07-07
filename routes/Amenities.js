const express = require("express");
const router = express.Router();
const authenticateJWT = require("../controllers/Middleware");
const { AmenitiesController } = require("../controllers");
const multer = require("multer");

// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/amenities");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
/**
 * Hotel Amenities
 */
router.post("/amenities", upload.single("icon_image"), authenticateJWT, AmenitiesController.createAmenity);
router.get("/amenities", authenticateJWT, AmenitiesController.getAllAmenities);
router.get("/amenities/:id", authenticateJWT, AmenitiesController.getAmenityById);
router.put("/amenities/:id", authenticateJWT, AmenitiesController.updateAmenityById);
router.delete("/amenities/:id", authenticateJWT, AmenitiesController.deleteAmenityById);

module.exports = router;
