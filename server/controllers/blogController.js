const Blog = require("../models/Blog");
const multer = require("multer");

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({ storage });

exports.createBlog = async (req, res) => {
  const { title, content, imageUrl } = req.body;

  try {
    const newBlog = new Blog({
      title,
      content,
      imageUrl,
    });

    await newBlog.save();
    res.status(201).json(newBlog);
  } catch (error) {
    res.status(500).json({ message: "Failed to create blog", error });
  }
};

exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find();
    res.json(blogs);
  } catch (err) {
    res.send("blogs Error " + err);
  }
};
// Update Blog
// exports.updateBlog = async (req, res) => {
//   const { id } = req.params;
//   const { title, content, imageUrl } = req.body;
//   //   console.log("titel,content,imageURL", title, content, imageUrl);

//   try {
//     const updatedBlog = await Blog.findByIdAndUpdate(
//       id,
//       { title, content, imageUrl },
//       { new: true } // Returns the updated document
//     );

//     if (!updatedBlog) {
//       return res.status(404).json({ message: "Blog not found" });
//     }

//     res.status(200).json(updatedBlog);
//   } catch (error) {
//     res.status(500).json({ message: "Failed to update blog", error });
//   }
// };
// Update Blog with Image Upload
exports.updateBlog = async (req, res) => {
  const { id } = req.params;
  const { title, content } = req.body;
  let imageUrl = req.body.imageUrl;

  // If a new file is uploaded, use the uploaded file's URL
  if (req.file) {
    imageUrl = `${req.protocol}://${req.get("host")}/uploads/${
      req.file.filename
    }`;
  }

  try {
    const updatedBlog = await Blog.findByIdAndUpdate(
      id,
      { title, content, imageUrl },
      { new: true } // Returns the updated document
    );

    if (!updatedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: "Failed to update blog", error });
  }
};

// Delete Blog
exports.deletedBlog = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBlog = await Blog.findByIdAndDelete(id);

    if (!deletedBlog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({ message: "Blog deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete blog", error });
  }
};
