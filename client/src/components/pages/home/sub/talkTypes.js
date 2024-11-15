import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

import { toast } from "react-toastify";

const TalkTypes = () => {
  const { type } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null); // For storing the selected file

  const [editedBlog, setEditedBlog] = useState({
    title: "",
    content: "",
    imageUrl: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      // const decoded = jwt_decode(token);
      var decoded = JSON.parse(token);
      console.log("decoed in frontend", decoded);
      setIsAdmin(decoded?.role === "admin");
    }
  }, []);
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Fetch all blogs
  const fetchBlogs = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/blog/allblogs"
      );
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };
  // Start editing a blog
  const handleEdit = (blog) => {
    setEditingId(blog._id);
    setEditedBlog({
      title: blog.title,
      content: blog.content,
      imageUrl: blog.imageUrl,
    });
  };

  // Handle file input change
  const handleFileChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  // Update the blog with new values
  const handleUpdate = async (id) => {
    try {
      let imageUrl = editedBlog.imageUrl;

      // Check if a new image is selected
      if (selectedImage) {
        const formData = new FormData();
        formData.append("image", selectedImage);

        // Upload the image to your server or image hosting service
        const imageResponse = await axios.post(
          "http://localhost:5000/api/upload", // Adjust to your image upload endpoint
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );
        imageUrl = imageResponse.data.imageUrl; // Update with the returned image URL
      }

      await axios.put(`http://localhost:5000/api/blog/blogs/${id}`, {
        ...editedBlog,
        imageUrl,
      });

      toast("Blog updated successfully!");
      setEditingId(null);
      setSelectedImage(null); // Clear selected image after update
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };
  // Update the blog with new values
  // const handleUpdate = async (id) => {
  //   try {
  //     await axios.put(`http://localhost:5000/api/blog/blogs/${id}`, editedBlog);
  //     toast("Blog updated successfully!");
  //     setEditingId(null);
  //     fetchBlogs();
  //   } catch (error) {
  //     console.error("Error updating blog:", error);
  //   }
  // };

  // Delete a blog
  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/blog/blogs/${id}`);
      toast(" Blog deleted successfully!");
      // alert("Blog deleted successfully!");
      fetchBlogs(); // Refresh the blog list
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-4">Talk Type: {type}</h2>
      <p className="text-center text-lg text-gray-600 mb-8">
        Explore more about the selected talk type: {type}
      </p>
      <div className="flex flex-col md:flex-row gap-8">
        {blogs &&
          blogs.map((blog) => (
            <div
              key={blog._id}
              className="flex flex-col items-center bg-gray-100 p-6 rounded-lg shadow-lg w-full md:w-1/2"
            >
              {editingId === blog._id ? (
                <>
                  {/* Editable fields */}
                  <input
                    type="text"
                    value={editedBlog.title}
                    onChange={(e) =>
                      setEditedBlog({ ...editedBlog, title: e.target.value })
                    }
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Edit Title"
                  />
                  <textarea
                    value={editedBlog.content}
                    onChange={(e) =>
                      setEditedBlog({ ...editedBlog, content: e.target.value })
                    }
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Edit Content"
                  />
                  <input
                    type="text"
                    value={editedBlog.imageUrl}
                    onChange={(e) =>
                      setEditedBlog({ ...editedBlog, imageUrl: e.target.value })
                    }
                    className="w-full mb-2 p-2 border rounded"
                    placeholder="Edit Image URL"
                  />
                  <input
                    type="file"
                    onChange={handleFileChange}
                    className="w-full mb-2 p-2 border rounded"
                  />
                  <img
                    src={editedBlog.imageUrl}
                    alt="Edited Blog"
                    className="w-full h-auto max-w-md rounded-lg mb-4"
                  />

                  <div className="flex">
                    <button
                      onClick={() => handleUpdate(blog._id)}
                      className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 mr-2"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
                    >
                      Cancel
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <img
                    src={blog.imageUrl}
                    alt={blog.title}
                    className="w-full h-auto max-w-md rounded-lg mb-4"
                  />
                  <div className="text-center">
                    <h3 className="text-xl font-semibold mb-2">{blog.title}</h3>
                    <p className="text-gray-700">{blog.content}</p>
                    {isAdmin && (
                      <div className="flex gap-2 mt-4">
                        <button
                          onClick={() => handleEdit(blog)}
                          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                        >
                          Update
                        </button>
                        <button
                          onClick={() => handleDelete(blog._id)}
                          className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                        >
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          ))}
      </div>
    </div>
  );
};

export default TalkTypes;
