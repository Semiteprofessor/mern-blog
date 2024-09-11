const User = require("../models/user.model");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.query();
    return res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.query().findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user by ID:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

const editUser = async (req, res) => {
  const { id } = req.params;
  const userData = req.body;
  try {
    if (!userData) {
      return res.status(400).json({ error: "No data provided for update" });
    }
    const user = await User.query().patchAndFetchById(id, userData);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    console.error("Error editing user:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.query().findById(id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    await User.query().deleteById(id);
    return res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  editUser,
  deleteUser,
};
