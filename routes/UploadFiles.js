const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const authenticateJWT = require("../controllers/Middleware");
const { FileUploadController } = require("../controllers");
// Configure multer for file uploads
// Define storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({ storage: storage });
/**
 * Hotel Amenities
 */
router.post(
  "/upload_single_file",
  upload.single("file"),
  authenticateJWT,
  FileUploadController.uploadSingleFile
);

router.post(
  "/upload_multiple_file",
  upload.single("files"),
  authenticateJWT,
  FileUploadController.uploadMultipleFiles
);

module.exports = router;
