const { v4: uuidv4 } = require("uuid");
const User = require("../models/user.model");
const { hashPassword } = require("../utils/helpers");

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

// Login user
const login = async (req, res) => {
  // Validate user input
  const { error } = validateLogin(req.body);
  if (error !== undefined) {
    res.status(400).json({
      status: false,
      message: error.details[0].message || "Bad request",
    });
    return;
  }

  try {
    const { email, password } = req.body;

    // Check if the user exists
    const user = await User.query()
      .select("user_id", "email", "password_hash", "password_salt")
      .where("email", email);

    if (user.length === 0) {
      res.status(404).json({
        status: false,
        message: "User not found",
      });
      return;
    }

    // Compare the password
    const compareHash = await bcrypt.compare(password, user.password_hash);
    if (!compareHash) throw new Error("Invalid email or password");

    const token = await jwt.sign(
      { email: user.email, _id: uuidv4() },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );

    res.status(200).json({
      status: true,
      message: "User logged in successfully",
      token: token,
    });
  } catch (error) {
    res.status(400).json({
      status: false,
      message: error.message || "Internal server error",
    });
  }
};

module.exports = {
  createUser,
  login,
};
