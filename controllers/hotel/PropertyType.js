// controllers/amenityController.js
const PropertyTypes = require("../../models/PropertyTypes");

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Create a new Property Type
 */
const createPropertyType = async (req, res) => {
  try {
    const propertytype = new PropertyTypes(req.body);
    await propertytype.save();
    res.status(201).json(propertytype);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Get all Property Types
 */
const getAllPropertyTypes = async (req, res) => {
  try {
    // console.log("hello");
    const propertytypes = await PropertyTypes.find();
    // console.log(propertytypes);
    res.status(200).json(propertytypes);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Get a single Property by ID
 */
const getPropertyTypeById = async (req, res) => {
  try {
    const propertytype = await PropertyTypes.findById(req.params.id);
    if (!propertytype) {
      return res.status(404).json({ message: "Property Type not found" });
    }
    res.status(200).json(propertytype);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Update a Property Type by ID
 */
const updatePropertyTypeById = async (req, res) => {
  try {
    const propertytype = await PropertyTypes.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!propertytype) {
      return res.status(404).json({ message: "Property type not found" });
    }
    res.status(200).json(propertytype);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Delete a Property by ID
 */
const deletePropertyTypeById = async (req, res) => {
  try {
    const propertytype = await PropertyTypes.findByIdAndDelete(req.params.id);
    if (!propertytype) {
      return res.status(404).json({ message: "Property type not found" });
    }
    res.status(200).json({ message: "Property type deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createPropertyType,
  getAllPropertyTypes,
  getPropertyTypeById,
  updatePropertyTypeById,
  deletePropertyTypeById,
};
