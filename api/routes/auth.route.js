const router = require("express").Router();
const createUser = require("../controllers/auth.ctrl");
const {
} = require("../controllers/auth.ctrl");

router.post("/", createUser);
router.get("/:id", login);
router.patch("/:edit-user", editUser);
router.delete("/delete-user", deleteUser);

module.exports = router;
