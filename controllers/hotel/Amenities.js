// controllers/amenityController.js
const Amenities = require("../../models/Amenities");

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Create a new Amenity
 */
const createAmenity = async (req, res) => {
  try {
    req.body.icon_image = req.file.filename;
    const amenity = new Amenities(req.body);
    await amenity.save();
    res.status(201).json(amenity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Get all Amenities
 */
const getAllAmenities = async (req, res) => {
  try {
    const amenities = await Amenities.find();
    res.status(200).json(amenities);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Get a single Amenity by ID
 */
const getAmenityById = async (req, res) => {
  try {
    const amenity = await Amenities.findById(req.params.id);
    if (!amenity) {
      return res.status(404).json({ message: "Amenity not found" });
    }
    res.status(200).json(amenity);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Update a amenity by ID
 */
const updateAmenityById = async (req, res) => {
  try {
    const amenity = await Amenities.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!amenity) {
      return res.status(404).json({ message: "Amenity not found" });
    }
    res.status(200).json(amenity);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Delete a amenity by ID
 */
const deleteAmenityById = async (req, res) => {
  try {
    const amenity = await Amenities.findByIdAndDelete(req.params.id);
    if (!amenity) {
      return res.status(404).json({ message: "Amenity not found" });
    }
    res.status(200).json({ message: "Amenity deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createAmenity,
  getAllAmenities,
  getAmenityById,
  updateAmenityById,
  deleteAmenityById,
};
