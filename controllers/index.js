const AuthController = require("./user/User");
const RolesController = require("./user/Roles");
const CategoryController = require("./hotel/Categories");
const AmenitiesController = require("./hotel/Amenities");
const PropertyTypeController = require("./hotel/PropertyType");
const PropertyController = require("./hotel/Property");
const FileUploadController = require("./fileupload/FileUploads");
module.exports = {
  AuthController,
  RolesController,
  CategoryController,
  AmenitiesController,
  PropertyTypeController,
  PropertyController,
  FileUploadController,
};
