const express = require("express");
const router = express.Router();
const authenticateJWT = require("../controllers/Middleware");
const { PropertyTypeController } = require("../controllers");

/**
 * Hotel Amenities
 */
router.post(
  "/property-type",
  authenticateJWT,
  PropertyTypeController.createPropertyType
);
router.get(
  "/property-type",
  authenticateJWT,
  PropertyTypeController.getAllPropertyTypes
);
router.get(
  "/property-type/:id",
  authenticateJWT,
  PropertyTypeController.getPropertyTypeById
);
router.put(
  "/property-type/:id",
  authenticateJWT,
  PropertyTypeController.updatePropertyTypeById
);
router.delete(
  "/property-type/:id",
  authenticateJWT,
  PropertyTypeController.deletePropertyTypeById
);

module.exports = router;
