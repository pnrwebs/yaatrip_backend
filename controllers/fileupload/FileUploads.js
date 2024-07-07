// controllers/amenityController.js
const Properties = require("../../models/Properties");

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Update uploaded file
 */
const uploadSingleFile = async (req, res) => {
  try {
    // console.log(req);
    res.status(201).json(req.file.filename);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Update uploaded file
 */
const uploadMultipleFiles = async (req, res) => {
  try {
    console.log(req.body);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  uploadSingleFile,
  uploadMultipleFiles,
};
