const Post = require("../models/post.model");

// Create a new post
const createPost = await (req, res) => {
  const { title, desc, username } = req.body;

  try {
    if (!title || !desc || !username) {
      return res
        .status(400)
        .json({ message: "Missing required fields: title, desc, username" });
    }

    await Post.query().insert(
        { title, desc, username }
      );
    return res.status(201).json({ message: "Post created successfully" });
  } catch (error) {
    console.error("Error creating post:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Get all posts
const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.query();
    return res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    return res.status(500).json({ error: error.message });
  }
};

// Get by ID
const getPostById = async (req, res) => {
  const postId = req.params.id;
  try {
    const post = await Post.query().findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }
    return res.status(200).json(post);
  } catch (error) {
    console.error("Error fetching post by ID:", error.message);
    return res.status(500).json({ error: error.message });
  }
};


// Update by ID
const updatePostById = async (req, res) => {
  const postId = req.params.id;
  const updatedPostData = req.body;

  try {
    if (!updatedPostData.title && !updatedPostData.desc && !updatedPostData.username) {
      return res
        .status(400)
        .json({ message: "No data provided to update" });
    }

    const post = await Post.query().findById(postId);
    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    await Post.query().patchAndFetchById(postId, updatedPostData);
    return res.status(200).json({ message: "Post updated successfully" });
  } catch (error) {
    console.error("Error updating post by ID:", error.message);
    return res.status(500).json({ message: "Post updated successfully" });
  }
}