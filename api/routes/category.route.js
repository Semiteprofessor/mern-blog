const router = require("express").Router();
const {
  getAllCategories,
  createCategory,
  editCategory,
  deleteCategory,
  getCategory,
} = require("../controllers/category.ctrl");

router.get("/create", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCategory);
router.patch("/:id", editCategory);
router.delete("/delete/:id", deleteCategory);

module.exports = router;
