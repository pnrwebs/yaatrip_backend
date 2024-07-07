const express = require("express");
const router = express.Router();
const { RolesController } = require("../controllers");
const authenticateJWT = require("../controllers/Middleware");
/**
 * User route
 */
router.get("/roles", authenticateJWT, RolesController._getRoles);
router.post("/roles", authenticateJWT, RolesController._createRoles);
router.get("/roles/:id", authenticateJWT, RolesController.getRoleById);
router.put("/roles/:id", authenticateJWT, RolesController.updateRoleById);
router.delete("/roles/:id", authenticateJWT, RolesController.deleteRoleById);
module.exports = router;
