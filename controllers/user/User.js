const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const MESSAGE = require("../../constants/message");
const response = require("../../constants/response");
const userModel = require("../../models/User");
const { hashPassword, verifyPassword } = require("../../utils/Spices");

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns Login for existing users
 */
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await userModel.findOne({ email: email });
    if (!user)
      return res.status(401).send({
        msg: "Provided credentials are incorrect!!!",
        statusCode: "401",
      });
    const isMatch = await verifyPassword(password, user.password);
    if (!isMatch)
      return res.status(401).send({
        msg: "Seems like! You have entered a wrong password.",
        statusCode: "401",
      });
    user.last_login_time = new Date();
    // Fetch user's IP address
    const response = await fetch("https://api.ipify.org?format=json");

    if (!response.ok) {
      throw new Error("Failed to fetch IP address");
    }
    const data = await response.json();
    const userIp = data.ip;

    // Store the IP address in the user object
    user.ip_address = userIp;

    const payload = {
      userId: user._id,
      email: user.email,
    };

    jwt.sign(
      payload,
      process.env.TOKEN_SECRET,
      {
        expiresIn: 3600,
      },
      async (err, token) => {
        if (err) throw err;
        user.token = token;
        await user.save();
        return res.status(200).send({
          success: true,
          message: "Logged in successfully",
          api_token: token,
        });
      }
    );
  } catch (error) {
    return response.somethingErrorResponse(res, 500, error);
  }
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns List of users
 */
const _getUsers = async (req, res) => {
  var listing = await userModel.find().sort({ createdAt: -1 });
  const userListing = JSON.parse(JSON.stringify(listing));
  delete userListing.designation;
  return res
    .status(200)
    .send({ success: true, message: "OK", data: userListing });
};

/**
 *
 * @param {*} req object
 * @param {*} res object
 * @returns User details with reference to the token
 */
const getUserByToken = async (req, res) => {
  const { api_token } = req.body;
  try {
    const userDetails = await userModel.findOne({ token: api_token });
    const userDetailsParsed = JSON.parse(JSON.stringify(userDetails));
    delete userDetailsParsed.password;
    delete userDetailsParsed.token;

    return res.status(200).send({
      success: true,
      message: "OK",
      data: userDetailsParsed,
    });
  } catch (error) {
    console.error("Error:", error);
    return response.somethingErrorResponse(res, 500, error);
  }
};

/**
 * @param {*} req object
 * @param {*} res object
 * @returns Creates a new user
 */
const createUser = async (req, res) => {
  const { first_name, last_name, email, password, role } = req.body;

  try {
    // Validate role
    // const validRoles = ["1", "2", "3", "4", "5"];
    // if (!validRoles.includes(role)) {
    //   return res.status(400).send({
    //     success: false,
    //     message: "Invalid role",
    //   });
    // }

    // Checking if email already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).send({
        success: false,
        message: "Email already exists",
      });
    }

    // Returns hashed password
    const hashedPassword = await hashPassword(password);
    const newUser = new userModel({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    return res.status(201).send({
      success: true,
      message: "User created successfully",
      data: newUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * @param {*} req object
 * @param {*} res object
 * @returns Updates a user's information
 */
const updateUser = async (req, res) => {
  const { userId } = req.query;
  const {
    first_name,
    last_name,
    email,
    password,
    hubspot_id,
    phone_no,
    owner_id,
    gender,
    status,
    city,
    state,
    country,
    zip_code,
    role,
  } = req.body;

  try {
    // Validate role.
    const validRoles = ["1", "2", "3", "4", "5"];
    if (role && !validRoles.includes(role)) {
      return res.status(400).send({
        success: false,
        message: "Invalid role",
      });
    }

    // Check if user exists.
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    //update object.
    const updateFields = {};
    if (first_name) updateFields.first_name = first_name;
    if (last_name) updateFields.last_name = last_name;
    if (email) updateFields.email = email;
    if (password) updateFields.password = await bcrypt.hash(password, 10);
    if (phone_no) updateFields.phone_no = phone_no;
    if (hubspot_id) updateFields.hubspot_id = hubspot_id;
    if (owner_id) updateFields.owner_id = owner_id;
    if (gender) updateFields.gender = gender;
    if (status) updateFields.status = status;
    if (city) updateFields.city = city;
    if (state) updateFields.state = state;
    if (country) updateFields.country = country;
    if (zip_code) updateFields.zip_code = zip_code;
    if (role) updateFields.role = role;

    const updatedUser = await userModel.updateOne(
      { _id: userId },
      { $set: updateFields }
    );

    return res.status(200).send({
      success: true,
      message: "User updated successfully",
      data: updatedUser,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * @param {*} req object
 * @param {*} res object
 * @returns Soft deletes a user by changing their status to false
 */
const deleteUser = async (req, res) => {
  const { userId } = req.query;

  try {
    // Check if user exists
    const user = await userModel.findById(userId);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }
    user.status = false;
    await user.save();

    return res.status(200).send({
      success: true,
      message: "User status updated to false",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

/**
 * @param {*} req object
 * @param {*} res object
 * @returns Fetches a user by ID
 */
const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find the user by ID
    const user = await userModel.findById(id);
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).send({
      success: true,
      message: "User retrieved successfully",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({
      success: false,
      message: "Server Error",
      error: error.message,
    });
  }
};

const _logout = async (req, res) => {
  try {
    const userId = req.query.userId;
    if (!userId)
      return res.status(400).json({
        msg: "User ID is required",
        statusCode: 400,
      });
    const user = await userModel.findById(userId);
    if (!user)
      return res.status(404).json({
        msg: "User not found",
        statusCode: 404,
      });

    // Set logout time
    user.logout_time = new Date();
    await user.save();

    res.status(200).json({
      msg: "Logged out successfully",
      statusCode: 200,
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
};

module.exports = {
  login,
  getUserByToken,
  _getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  _logout,
};
