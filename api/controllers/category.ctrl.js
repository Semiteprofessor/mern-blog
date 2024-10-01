const Category = require("../models/category.model");

const createCategory = async (req, res, next) => {
  const { name, description } = req.body;
  try {
    // Validate request body
    if (!name || !description) {
      return res
        .status(400)
        .json({ error: "Missing required fields: name, description" });
    }

    // Create new category
    const category = await Category.query().insert({
      name,
      description,
    });
    return res.status(200).json({ message: "Category created successfully" });
  } catch (error) {
    console.error("Error deleting user:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

const getAllCategories = async (req, res, next) => {
  try {
    const categories = await Category.query();
    return res.status(200).json(categories);
  } catch (error) {
    console.error("Error fetching categories:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
};
