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
  } catch (error) {}
};
