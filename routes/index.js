/******Middleware to combile all the routes**********/

var express = require("express");
var rootRouter = express.Router();

// Import all routes
const authRoutes = require("./User");
const rolesRoutes = require("./Roles");
const categoriesRoutes = require("./Categories");
const amenitiesRoutes = require("./Amenities");
const propertyTypeRoutes = require("./PropertyType");
const propertiesRoutes = require("./Properties");
const uploadFilesRoutes = require("./UploadFiles");

// Combine routes
rootRouter.use("/users", authRoutes);
rootRouter.use("/users", rolesRoutes);
rootRouter.use("/hotel", categoriesRoutes);
rootRouter.use("/hotel", amenitiesRoutes);
rootRouter.use("/hotel", propertyTypeRoutes);
rootRouter.use("/hotel", propertiesRoutes);
rootRouter.use("/", uploadFilesRoutes);

module.exports = rootRouter;
