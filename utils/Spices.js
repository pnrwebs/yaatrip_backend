const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const ADDSPICE = process.env.SANDYSALT;
const saltRounds = 10;

const hashPassword = async (plainPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(
      plainPassword + ADDSPICE,
      saltRounds
    );
    return hashedPassword;
  } catch (error) {
    console.error("Error hashing password:", error);
  }
};

const verifyPassword = async (plainPassword, hashedPassword) => {
  try {
    const match = await bcrypt.compare(
      plainPassword + ADDSPICE,
      hashedPassword
    );
    return match;
  } catch (error) {
    console.error("Error verifying password:", error);
  }
};

const generateJWTSecret = (length) => {
  return crypto.randomBytes(length).toString("hex");
};

module.exports = {
  hashPassword,
  verifyPassword,
  generateJWTSecret,
};
