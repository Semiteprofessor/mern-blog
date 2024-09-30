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
    return res
      .status(200)
      .json({ message: "Category created successfully", data: category });
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

// Get Category by ID
const getCategory = async (req, res, next) => {
  const { id } = req.params;
  try {
    const category = await Category.query().findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }
    return res.status(200).json(category);
  } catch (error) {
    console.error("Error fetching category by ID:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Update by ID
const editCategory = async (req, res, next) => {
  const { id } = req.params;
  const categoryData = req.body;

  try {
    const category = await Category.query().findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await Category.query().patchAndFetchById(id, categoryData);
    return res.status(200).json({ message: "Category updated successfully" });
  } catch (error) {
    console.error("Error updating category by ID:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Delete by ID
const deleteCategory = async (req, res, next) => {
  const { id } = req.params;

  try {
    const category = await Category.query().findById(id);
    if (!category) {
      return res.status(404).json({ error: "Category not found" });
    }

    await Category.query().deleteById(id);
    return res.status(200).json({ message: "Category deleted successfully" });
  } catch (error) {
    console.error("Error deleting category:", error.message);
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  editCategory,
  deleteCategory,
};
