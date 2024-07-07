const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authenticateJWT = require("../controllers/Middleware");
const { PropertyController } = require("../controllers");
// Configure multer for file uploads
// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/properties");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
/**
 * Hotel Amenities
 */
router.post("/properties", upload.single("cover_image"), authenticateJWT, PropertyController.createProperty);
router.get("/properties", authenticateJWT, PropertyController.getAllProperty);
router.get("/properties/:id", authenticateJWT, PropertyController.getPropertyById);
router.put("/properties/:id", authenticateJWT, PropertyController.updatePropertyById);
router.delete("/properties/:id", authenticateJWT, PropertyController.deletePropertyById);

module.exports = router;
