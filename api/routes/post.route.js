const router = require("express").Router();
const {
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById,
  createPost,
} = require("../controllers/post.ctrl");

router.get("/create", createPost);
router.get("/", getAllPosts);
router.get("/:id", getPostById);
router.patch("/:edit-post", updatePostById);
router.delete("/delete-post", deletePostById);

module.exports = router;
