const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MESSAGE = require("../../constants/message");
const response = require("../../constants/response");
const rolesModel = require("../../models/Roles");

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns List of users
 */
const _getRoles = async (req, res) => {
  var listing = await rolesModel.find().sort({ createdAt: -1 });

  return res.status(200).send({ success: true, message: "OK", data: listing });
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Create a new Role
 */
const _createRoles = async (req, res) => {
  try {
    console.log(req.body);
    const role = new rolesModel(req.body);
    await role.save();
    res.status(201).json(role);
  } catch (error) {
    console.log(error);
    res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Get a single Role by ID
 */
const getRoleById = async (req, res) => {
  try {
    const role = await rolesModel.findById(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Update a Role by ID
 */
const updateRoleById = async (req, res) => {
  try {
    const role = await rolesModel.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json(role);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Delete a Role by ID
 */
const deleteRoleById = async (req, res) => {
  try {
    const role = await rolesModel.findByIdAndDelete(req.params.id);
    if (!role) {
      return res.status(404).json({ message: "Role not found" });
    }
    res.status(200).json({ message: "Role deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  _getRoles,
  _createRoles,
  getRoleById,
  updateRoleById,
  deleteRoleById,
};
