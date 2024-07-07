// controllers/amenityController.js
const Properties = require("../../models/Properties");

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Create a new Property
 */
const createProperty = async (req, res) => {
  try {
    console.log(req.body);
    const properties = new Properties(req.body);
    await properties.save();
    res.status(201).json(properties);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Get all Property
 */
const getAllProperty = async (req, res) => {
  try {
    const properties = await Properties.find();

    res.status(200).json(properties);
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
const getPropertyById = async (req, res) => {
  try {
    const properties = await Properties.findById(req.params.id);
    if (!properties) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(properties);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Update a Property by ID
 */
const updatePropertyById = async (req, res) => {
  try {
    const properties = await Properties.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
        runValidators: true,
      }
    );
    if (!properties) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json(properties);
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
const deletePropertyById = async (req, res) => {
  try {
    const properties = await Properties.findByIdAndDelete(req.params.id);
    if (!properties) {
      return res.status(404).json({ message: "Property not found" });
    }
    res.status(200).json({ message: "Property deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createProperty,
  getAllProperty,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
};
