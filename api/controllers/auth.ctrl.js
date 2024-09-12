const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const { hashPassword } = require("../utils/password");
const { validateCreateAccount } = require("../validation"); 

const createUser = async (req, res) => {
  // Validate user input
  const { error } = validateCreateAccount(req.body);
  if (error !== undefined) {
    res.status(400).json({
      status: false,
      message: error.details[0].message || "Bad request",
    });
    return;
  }

  try {
    const { name, email, password } = req.body;

    // Check if the user already exists
    const existingUsers = await User.query()
      .select("email", "phone")
      .where((builder) => {
        builder.where("email", email).orWhere("phone", phone);
      });

    if (existingUsers.length > 0) {
      res.status(400).json({
        status: false,
        message: "User already exists",
      });
      return;
    }

    // Hash the password
    const { hash, salt } = await hashPassword(password);

    // Create the user
    const userID = uuidv4();
    await User.query().insert({
      user_id: userID,
      name: name,
      email: email,
      password_hash: hash,
      password_salt: salt,
    });

    res.status(201).json({
      status: true,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = createUser;
