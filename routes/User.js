const express = require("express");
const router = express.Router();
const { AuthController } = require("../controllers");
const authenticateJWT = require("../controllers/Middleware");
/**
 * User route
 */
router.post("/login", AuthController.login);
router.post("/logout", AuthController._logout);
// router.post("/register", AuthController.register);
router.post("/verify-token", AuthController.getUserByToken);
router.get("/get-users", authenticateJWT, AuthController._getUsers);
router.put("/create-user", authenticateJWT, AuthController.createUser);
router.get("/get-user-by-id/:id", authenticateJWT, AuthController.getUserById);
// router.put("/edit-users", authenticateJWT,AuthController.updateUser);
// router.delete("/delete-users", authenticateJWT,AuthController.deleteUser);

// router.post("/forgotPassword", authenticateJWT,AuthController.forgotPassword);
// router.post("/resetPassword", authenticateJWT,AuthController.resetPassword);
// router.post("/contact-us", authenticateJWT,AuthController.contactus);
// router.get("/user-details", authenticateJWT, AuthController.getUserDetails);

module.exports = router;
