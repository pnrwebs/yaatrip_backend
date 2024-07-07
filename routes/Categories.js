const express = require("express");
const router = express.Router();
const { CategoryController } = require("../controllers");
const authenticateJWT = require("../controllers/Middleware");
/**
 * User Categories
 */
router.post("/categories", authenticateJWT, CategoryController.createCategory);
router.get("/categories", authenticateJWT, CategoryController.getAllCategories);
router.get(
  "/categories/:id",
  authenticateJWT,
  CategoryController.getCategoryById
);
router.put(
  "/categories/:id",
  authenticateJWT,
  CategoryController.updateCategoryById
);
router.delete(
  "/categories/:id",
  authenticateJWT,
  CategoryController.deleteCategoryById
);

module.exports = router;
