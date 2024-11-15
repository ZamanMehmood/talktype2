const express = require("express");
const router = express.Router();

const {
  createBlog,
  getAllBlogs,
  updateBlog,
  deletedBlog,
} = require("../../controllers/blogController");

const upload = require("../../middleware/upload");
const authenticateToken = require("../../middleware/authentication");

// create blog
router.post("/createBlog", createBlog);
// get blogs
router.get("/allblogs", getAllBlogs);

// Update Blog by ID
router.put("/blogs/:id", upload.single("image"), updateBlog);

// Delete Blog by ID
router.delete("/blogs/:id", deletedBlog);

module.exports = router;
