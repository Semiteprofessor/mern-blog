const router = require("express").Router();
const { getAllCategories, createCategory } = require("../controllers/category.ctrl");

router.get("/create", createCategory);
router.get("/", getAllCategories);
router.get("/:id", getCa);
router.patch("/:edit-user", editUser);
router.delete("/delete-user", deleteUser);

module.exports = router;
